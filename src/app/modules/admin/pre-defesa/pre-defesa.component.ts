import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Especialidade {
  id: string;
  nome: string;
}

interface Orientador {
  id: string;
  nomeCompleto: string;
}

@Component({
  selector: 'app-pre-defesa',
  templateUrl: './pre-defesa.component.html',
  styleUrls: ['./pre-defesa.component.scss']
})
export class PreDefesaComponent implements OnInit {

  especialidades: Especialidade[] = []; // Lista de especialidades
  orientadores: Orientador[] = []; // Lista completa de orientadores
  orientadoresDisponiveis: Orientador[] = []; // Lista de orientadores disponíveis para vogal
  preDefesaForm!: FormGroup; // Formulário reativo
  monografia: any = null;

  constructor(
    private preDefesaService: PreDefesaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private monografiaService: MonografiaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario(); // Inicializa o formulário

    // Captura o ID da monografia da rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarMonografia(id);
    } else {
      Swal.fire('Erro', 'ID da monografia não encontrado.', 'error');
      this.router.navigate(['/admin/calendario']);
    }

    // Listener para mudanças no campo presidenteId
    this.preDefesaForm.get('presidenteId')?.valueChanges.subscribe((presidenteId) => {
      this.atualizarOrientadoresDisponiveisParaVogal(presidenteId);
    });
  }

  atualizarOrientadoresDisponiveisParaVogal(presidenteId: string): void {
    // Filtra os orientadores disponíveis para o vogal, excluindo o presidente selecionado
    this.orientadoresDisponiveis = this.orientadores.filter((orientador: Orientador) => orientador.id !== presidenteId);
  }

  inicializarFormulario(): void {
    this.preDefesaForm = this.formBuilder.group({
      monografiaId: ['', Validators.required], // ID da monografia (será preenchido automaticamente)
      temaMonografia: [{ value: '', disabled: true }], // Tema da monografia (somente leitura)
      presidenteId: ['', Validators.required], // ID do presidente
      vogalId: ['', Validators.required], // ID do vogal
      dataInicio: ['', [Validators.required, this.dataFuturaValidator]], // Data de início com validação personalizada
      dataFim: ['', Validators.required], // Data de fim
    }, { validators: this.dataFimPosteriorValidator }); // Validação personalizada para comparar datas
  }

  // Validação personalizada para garantir que a data de início seja futura
  dataFuturaValidator(control: any): { [key: string]: boolean } | null {
    const dataInicio = new Date(control.value);
    const dataAtual = new Date();

    if (dataInicio <= dataAtual) {
      return { dataInvalida: true }; // Retorna um erro se a data não for futura
    }
    return null; // Retorna null se a data for válida
  }

  // Validação personalizada para garantir que a data de término seja posterior à data de início
  dataFimPosteriorValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const dataInicio = new Date(formGroup.get('dataInicio')?.value);
    const dataFim = new Date(formGroup.get('dataFim')?.value);

    if (dataFim <= dataInicio) {
      return { dataFimInvalida: true }; // Retorna um erro se a data de término não for posterior
    }
    return null; // Retorna null se a data for válida
  }

  carregarMonografia(id: string): void {
    this.monografiaService.getMonografiaById(id).subscribe(
      (monografia) => {
        this.monografia = monografia;
        console.log('Monografia carregada:', monografia);
        console.log('Especialidade da monografia:', monografia.especialidade);

        this.preDefesaForm.patchValue({
          monografiaId: monografia.id,
          temaMonografia: monografia.tema,
          especialidadeId: monografia.especialidade.id
        });

        if (monografia.especialidade && monografia.especialidade.id) {
          console.log('Carregando orientadores para a especialidade:', monografia.especialidade.id);
          this.carregarOrientadoresPorEspecialidade(monografia.especialidade.id, monografia.orientador.id);
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
        this.orientadoresDisponiveis = this.orientadores; // Inicializa a lista de orientadores disponíveis
      },
      (error) => {
        console.error('Erro ao carregar orientadores:', error);
        Swal.fire('Erro', 'Não foi possível carregar os orientadores.', 'error');
      }
    );
  }

  onSubmit(): void {
    if (this.preDefesaForm.invalid) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios corretamente.', 'warning');
      return;
    }

    const formValue = this.preDefesaForm.value;

    // Verifica se o presidente ou o vogal é o orientador da monografia
    if (formValue.presidenteId === this.monografia.orientador.id) {
      Swal.fire('Erro', 'O orientador da monografia não pode ser o presidente da pré-defesa.', 'error');
      return;
    }
    if (formValue.vogalId === this.monografia.orientador.id) {
      Swal.fire('Erro', 'O orientador da monografia não pode ser o vogal da pré-defesa.', 'error');
      return;
    }

    this.preDefesaService.criarPreDefesa(
      formValue.monografiaId,
      formValue.presidenteId,
      formValue.vogalId,
      formValue.dataInicio,
      formValue.dataFim,
    ).subscribe(
      (response) => {
        Swal.fire('Sucesso', 'Pré-defesa criada com sucesso!', 'success').then(() => {
          this.resetFormulario();
          this.router.navigate(['/admin/monografias']);
        });
      },
      (error) => {
        console.error('Erro ao criar pré-defesa:', error);
        Swal.fire('Erro', 'Não foi possível criar a pré-defesa.', 'error').then(() => {
          this.resetFormulario();
        });
      }
    );
  }

  resetFormulario(): void {
    this.preDefesaForm.reset();
    this.preDefesaForm.patchValue({
      monografiaId: this.monografia.id,
      temaMonografia: this.monografia.tema,
    });
  }
}
