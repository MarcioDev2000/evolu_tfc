import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { Router } from '@angular/router';

// Interfaces para tipagem
interface Especialidade {
  id: string;
  nome: string;
}

interface Orientador {
  id: string;
  nomeCompleto: string;
}

@Component({
  selector: 'app-add-monografia',
  templateUrl: './add-monografia.component.html',
  styleUrls: ['./add-monografia.component.scss'],
})
export class AddMonografiaComponent implements OnInit {
  especialidades: Especialidade[] = [];
  orientadores: Orientador[] = [];
  monografiaForm!: FormGroup;

  constructor(
    private monografiaService: MonografiaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarEspecialidades();
    this.setAlunoId();
  }

  // Inicializa o formulário reativo
  inicializarFormulario(): void {
    this.monografiaForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.maxLength(200)]],
      especialidadeId: ['', Validators.required],
      orientadorId: ['', Validators.required],
      extratoBancario: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      declaracaoNotas: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      termoOrientador: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      projeto: [null, [Validators.required, this.validateFileType(['pdf', 'doc', 'docx'])]],
      documentoBi: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      termoDoAluno: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      alunoId: [''],
    });
  }

  // Valida o tipo de arquivo
  validateFileType(allowedTypes: string[]) {
    return (control: any) => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(extension)) {
          return { invalidFileType: true };
        }
      }
      return null;
    };
  }

  // Define o ID do aluno logado
  setAlunoId(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.monografiaForm.get('alunoId')?.setValue(userData.id);
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

  // Carrega a lista de especialidades
  carregarEspecialidades(): void {
    this.monografiaService.getEspecialidades().subscribe(
      (data: Especialidade[]) => {
        this.especialidades = data;
      },
      (error) => {
        this.handleError('Erro ao carregar especialidades:', error);
      }
    );
  }

  carregarOrientadores(especialidadeId: string): void {
    this.monografiaService.getOrientadoresPorEspecialidade(especialidadeId).subscribe(
      (data: Orientador[]) => {
        console.log('Orientadores carregados:', data); // 👈 Verificar se os orientadores estão sendo carregados
        this.orientadores = data;
      },
      (error) => {
        this.handleError('Erro ao carregar orientadores:', error);
      }
    );
  }


  // Método chamado quando o usuário seleciona uma especialidade
  onEspecialidadeSelecionada(event: any): void {
    const especialidadeId = event.target.value;
    if (especialidadeId) {
      this.carregarOrientadores(especialidadeId);
    }
  }

  // Método chamado quando um arquivo é selecionado
  onFileChange(event: any, campo: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.monografiaForm.get(campo)?.setValue(file);
    }
  }

  // Método chamado ao submeter o formulário
  onSubmit(): void {
    if (this.monografiaForm.invalid) {
      Swal.fire('Erro', 'Preencha todos os campos corretamente.', 'error');
      return;
    }

    const orientadorId = this.monografiaForm.get('orientadorId')?.value;
    if (!orientadorId) {
      Swal.fire('Erro', 'Selecione um orientador.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('tema', this.monografiaForm.get('tema')?.value);
    formData.append('especialidadeId', this.monografiaForm.get('especialidadeId')?.value);
    formData.append('orientadorId', orientadorId);
    formData.append('extratoBancario', this.monografiaForm.get('extratoBancario')?.value);
    formData.append('declaracaoNotas', this.monografiaForm.get('declaracaoNotas')?.value);
    formData.append('termoOrientador', this.monografiaForm.get('termoOrientador')?.value);
    formData.append('projeto', this.monografiaForm.get('projeto')?.value);
    formData.append('documentoBi', this.monografiaForm.get('documentoBi')?.value);
    formData.append('termoDoAluno', this.monografiaForm.get('termoDoAluno')?.value);
    formData.append('alunoId', this.monografiaForm.get('alunoId')?.value);

    this.monografiaService.createMonografia(formData).subscribe(
      () => {
        Swal.fire('Sucesso', 'Monografia criada com sucesso!', 'success').then(() => {
          this.monografiaForm.reset();
          this.router.navigate(['/aluno/inscricao-monografia']);
        });
      },(error) => {
        if (error.status === 500 && error.error.message.includes("O aluno já possui uma monografia cadastrada")) {
          Swal.fire('Aviso', 'Você já possui uma monografia cadastrada e não pode inscrever-se novamente.', 'warning');
          this.monografiaForm.reset();
          this.router.navigate(['/aluno/inscricao-monografia']);
        } else {
          this.handleError('Erro ao criar monografia:', error);
        }
      }
    );
  }

  // Centraliza o tratamento de erros
  private handleError(message: string, error: any): void {
    console.error(message, error);
    Swal.fire('Erro', 'Ocorreu um erro. Tente novamente mais tarde.', 'error');
  }
}
