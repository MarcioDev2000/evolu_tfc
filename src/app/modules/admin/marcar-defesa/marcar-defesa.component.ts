import { Component, OnInit } from '@angular/core';
import { DefesaService } from 'src/app/shared/services/defesa.service';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Especialidade {
  id: string;
  nome: string;
}

interface Orientador {
  id: string;
  nomeCompleto: string;
}

@Component({
  selector: 'app-marcar-defesa',
  templateUrl: './marcar-defesa.component.html',
  styleUrls: ['./marcar-defesa.component.scss']
})
export class MarcarDefesaComponent implements OnInit {

  especialidades: Especialidade[] = [];
  orientadores: Orientador[] = [];
  orientadoresDisponiveis: Orientador[] = [];
  defesaForm!: FormGroup;
  monografia: any = null;
  preDefesaId: string | null = null; // Adicionando variável para armazenar o ID da pré-defesa

  constructor(
    private preDefesaService: PreDefesaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private monografiaService: MonografiaService,
    private route: ActivatedRoute,
    private defesaService: DefesaService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    // Captura o ID da pré-defesa da rota
    const preDefesaId = this.route.snapshot.paramMap.get('id');
    if (preDefesaId) {
      this.preDefesaId = preDefesaId; // Armazena o ID da pré-defesa
      this.carregarPreDefesa(preDefesaId); // Carrega os dados da pré-defesa
    }
  }

  carregarPreDefesa(preDefesaId: string): void {
    this.preDefesaService.buscarPreDefesaPorId(preDefesaId).subscribe(
      (preDefesa) => {
        // Preenche os valores do formulário com os dados da pré-defesa
        this.defesaForm.patchValue({
          preDefesaId: preDefesa.id,
          monografiaId: preDefesa.monografiaId,
          temaMonografia: preDefesa.temaMonografia,
          presidenteId: preDefesa.presidenteId, // Preenche o ID do presidente
          vogalId: preDefesa.vogalId, // Preenche o ID do vogal
        });

        // Busca os nomes dos orientadores (presidente e vogal)
        this.carregarNomesOrientadores(preDefesa.presidenteId, preDefesa.vogalId);
      },
      (error) => {
        console.error('Erro ao carregar pré-defesa:', error);
        Swal.fire('Erro', 'Não foi possível carregar a pré-defesa.', 'error');
        this.router.navigate(['/admin/pre-defesa']);
      }
    );
  }

  inicializarFormulario(): void {
    this.defesaForm = this.formBuilder.group({
      monografiaId: ['', Validators.required],
      preDefesaId: ['', Validators.required],
      temaMonografia: [{ value: '', disabled: true }],
      presidenteId: ['', Validators.required], // Campo oculto para armazenar o ID do presidente
      presidenteNome: [{ value: '', disabled: true }], // Campo para exibir o nome do presidente
      vogalId: ['', Validators.required], // Campo oculto para armazenar o ID do vogal
      vogalNome: [{ value: '', disabled: true }], // Campo para exibir o nome do vogal
      dataInicio: ['', [Validators.required, this.dataFuturaValidator]],
      dataFim: ['', Validators.required],
    }, { validators: this.dataFimPosteriorValidator });
  }

  dataFuturaValidator(control: any): { [key: string]: boolean } | null {
    const dataInicio = new Date(control.value);
    const dataAtual = new Date();

    if (dataInicio <= dataAtual) {
      return { dataInvalida: true };
    }
    return null;
  }

  dataFimPosteriorValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const dataInicio = new Date(formGroup.get('dataInicio')?.value);
    const dataFim = new Date(formGroup.get('dataFim')?.value);

    if (dataFim <= dataInicio) {
      return { dataFimInvalida: true };
    }
    return null;
  }

  carregarNomesOrientadores(presidenteId: string, vogalId: string): void {
    // Busca o nome do presidente
    this.preDefesaService.getOrientadorPorId(presidenteId).subscribe(
      (presidente: Orientador) => {
        this.defesaForm.patchValue({
          presidenteNome: presidente.nomeCompleto,
        });
      },
      (error) => {
        console.error('Erro ao carregar nome do presidente:', error);
        Swal.fire('Erro', 'Não foi possível carregar o nome do presidente.', 'error');
      }
    );

    // Busca o nome do vogal
    this.preDefesaService.getOrientadorPorId(vogalId).subscribe(
      (vogal: Orientador) => {
        this.defesaForm.patchValue({
          vogalNome: vogal.nomeCompleto,
        });
      },
      (error) => {
        console.error('Erro ao carregar nome do vogal:', error);
        Swal.fire('Erro', 'Não foi possível carregar o nome do vogal.', 'error');
      }
    );
  }

  carregarMonografia(id: string): void {
    this.monografiaService.getMonografiaById(id).subscribe(
        (monografia) => {
            this.monografia = monografia;
            console.log('Monografia carregada:', monografia);

            this.defesaForm.patchValue({
                monografiaId: monografia.id,
                temaMonografia: monografia.tema,
            });

            if (monografia.especialidade && monografia.especialidade.id) {
                console.log('Carregando orientadores para a especialidade:', monografia.especialidade.id);
                this.carregarOrientadoresPorEspecialidade(monografia.especialidade.id, monografia.orientador.id);
            } else {
                Swal.fire('Erro', 'Especialidade não encontrada para a monografia.', 'error');
            }
        },
        (error) => {
            console.error('Erro ao carregar monografia:', error);
            Swal.fire('Erro', 'Não foi possível carregar a monografia.', 'error');
            this.router.navigate(['/admin/monografias']);
        }
    );
}


carregarOrientadoresPorEspecialidade(especialidadeId: string, orientadorId: string): void {
  this.preDefesaService.getOrientadoresPorEspecialidade(especialidadeId).subscribe(
    (orientadores: Orientador[]) => {
      // Filtra os orientadores para excluir o orientador da monografia
      this.orientadores = orientadores.filter((orientador: Orientador) => orientador.id !== orientadorId);

      // Atualiza a lista de orientadores disponíveis para o vogal, excluindo o presidente selecionado
      const presidenteId = this.defesaForm.get('presidenteId')?.value;
      this.orientadoresDisponiveis = this.orientadores.filter((orientador: Orientador) => orientador.id !== presidenteId);
    },
    (error) => {
      console.error('Erro ao carregar orientadores:', error);
      Swal.fire('Erro', 'Não foi possível carregar os orientadores.', 'error');
    }
  );
}
onSubmit(): void {
  if (this.defesaForm.invalid) {
    Swal.fire('Atenção', 'Preencha todos os campos obrigatórios corretamente.', 'warning');
    return;
  }

  const formValue = this.defesaForm.value;

  this.defesaService.marcarDefesa(
    formValue.preDefesaId,
    formValue.dataInicio,
    formValue.dataFim,
    formValue.presidenteId,
    formValue.vogalId
  ).subscribe(
    (response) => {
      Swal.fire('Sucesso', 'Defesa marcada com sucesso!', 'success').then(() => {
        this.resetFormulario();
        this.router.navigate(['/admin/defesa']);
      });
    },
    (error) => {
      console.error('Erro ao marcar defesa:', error);
      // Verifica se a mensagem de erro corresponde à condição específica
      if (error.error && error.error.message === "A monografia precisa estar no status APROVADO para marcar a defesa.") {
        Swal.fire('Atenção', 'A monografia precisa estar APROVADO para marcar a defesa.', 'warning').then(() => {
          this.router.navigate(['/admin/pre-defesa']); // Redireciona para a rota desejada
        });
      } else {
        Swal.fire('Erro', 'Não foi possível marcar a defesa.', 'error');
      }
      this.resetFormulario();
    }
  );
}


resetFormulario(): void {
  this.defesaForm.reset();
  this.defesaForm.patchValue({
    monografiaId: this.monografia.id,
    temaMonografia: this.monografia.tema,
    presidenteNome: '', // Limpa o nome do presidente
    vogalNome: '', // Limpa o nome do vogal
  });
}
}
