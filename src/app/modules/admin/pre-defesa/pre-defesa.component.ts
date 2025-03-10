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
  orientadores: Orientador[] = []; // Lista de orientadores
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
      this.router.navigate(['/admin/monografias']);
    }
  }

  inicializarFormulario(): void {
    this.preDefesaForm = this.formBuilder.group({
      monografiaId: ['', Validators.required], // ID da monografia (será preenchido automaticamente)
      temaMonografia: [{ value: '', disabled: true }], // Tema da monografia (somente leitura)
      presidenteId: ['', Validators.required], // ID do presidente
      vogalId: ['', Validators.required], // ID do vogal
      dataInicio: ['', Validators.required], // Data de início
      dataFim: ['', Validators.required], // Data de fim
      descricao: [''], // Descrição (opcional)
    });
  }

  carregarMonografia(id: string): void {
    this.monografiaService.getMonografiaById(id).subscribe(
      (monografia) => {
        this.monografia = monografia;
        console.log('Monografia carregada:', monografia); // Verifica a monografia carregada
        console.log('Especialidade da monografia:', monografia.especialidade); // Verifica o objeto especialidade
  
        this.preDefesaForm.patchValue({
          monografiaId: monografia.id, // Preenche o ID da monografia
          temaMonografia: monografia.tema, // Preenche o tema da monografia
          especialidadeId: monografia.especialidade.id // Preenche o ID da especialidade
        });
  
        // Se a especialidade foi preenchida, carrega os orientadores
        if (monografia.especialidade && monografia.especialidade.id) {
          console.log('Carregando orientadores para a especialidade:', monografia.especialidade.id); // Verifica o ID da especialidade antes de carregar os orientadores
          this.carregarOrientadoresPorEspecialidade(monografia.especialidade.id);
        }
      },
      (error) => {
        console.error('Erro ao carregar monografia:', error);
        Swal.fire('Erro', 'Não foi possível carregar a monografia.', 'error');
        this.router.navigate(['/admin/monografias']);
      }
    );
  }
  
  carregarOrientadoresPorEspecialidade(especialidadeId: string): void {
    this.preDefesaService.getOrientadoresPorEspecialidade(especialidadeId).subscribe(
      (orientadores) => {
        this.orientadores = orientadores; // Atualiza a lista de orientadores
      },
      (error) => {
        console.error('Erro ao carregar orientadores:', error);
        Swal.fire('Erro', 'Não foi possível carregar os orientadores.', 'error');
      }
    );
  }

  onSubmit(): void {
    if (this.preDefesaForm.invalid) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios.', 'warning');
      return;
    }
  
    const formValue = this.preDefesaForm.value;
  
    this.preDefesaService.criarPreDefesa(
      formValue.monografiaId,
      formValue.presidenteId,
      formValue.vogalId,
      formValue.dataInicio,
      formValue.dataFim,
      formValue.descricao
    ).subscribe(
      (response) => {
        Swal.fire('Sucesso', 'Pré-defesa criada com sucesso!', 'success').then(() => {
          this.resetFormulario(); 
          this.router.navigate(['/monografias']); 
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