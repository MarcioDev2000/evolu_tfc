import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import Swal from 'sweetalert2';

interface Especialidade {
  id: string;
  nome: string;
}

interface Curso {
  id: string;
  nome: string;
}

interface Orientador {
  id: string;
  nomeCompleto: string;
}

@Component({
  selector: 'app-atualizar-monografia',
  templateUrl: './atualizar-monografia.component.html',
  styleUrls: ['./atualizar-monografia.component.scss']
})
export class AtualizarMonografiaComponent implements OnInit {
  especialidades: Especialidade[] = [];
  orientadores: Orientador[] = [];
  cursos: Curso[] = [];
  monografiaForm!: FormGroup;
  monografiaId!: string;

  constructor(
    private monografiaService: MonografiaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.monografiaId = this.route.snapshot.params['id'];
    this.inicializarFormulario();
    this.carregarCursos();
    this.setAlunoId();
    this.carregarDadosMonografia();
  }

  inicializarFormulario(): void {
    this.monografiaForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.maxLength(200)]],
      cursoId: ['', Validators.required],
      especialidadeId: ['', Validators.required],
      orientadorId: ['', Validators.required],
      extratoBancario: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      declaracaoNotas: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      termoOrientador: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      projeto: [null, this.validateFileType(['pdf', 'doc', 'docx'])],
      documentoBi: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      termoDoAluno: [null, [Validators.required, this.validateFileType(['pdf', 'jpeg', 'png'])]],
      alunoId: [''],
    });
  }

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

  carregarDadosMonografia(): void {
    this.monografiaService.getMonografiaById(this.monografiaId).subscribe({
      next: (monografia) => {
        this.monografiaForm.patchValue({
          tema: monografia.tema,
          especialidadeId: monografia.especialidadeId,
          orientadorId: monografia.orientadorId
        });
      },
      error: (error) => {
        console.error('Erro ao carregar monografia:', error);
        Swal.fire('Erro', 'Não foi possível carregar os dados da monografia.', 'error');
      }
    });
  }

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


  // Carrega a lista de cursos
  carregarCursos(): void {
    this.monografiaService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursos = data;
      },
      (error) => {
        this.handleError('Erro ao carregar cursos:', error);
      }
    );
  }

  // Carrega as especialidades quando um curso é selecionado
  onCursoSelecionado(event: any): void {
    const cursoId = event.target.value;
    if (cursoId) {
      this.monografiaService.getEspecialidadesPorCurso(cursoId).subscribe(
        (data: Especialidade[]) => {
          this.especialidades = data;
          this.monografiaForm.get('especialidadeId')?.reset(); // Reseta o campo de especialidade
          this.monografiaForm.get('orientadorId')?.reset(); // Reseta o campo de orientador
        },
        (error) => {
          this.handleError('Erro ao carregar especialidades:', error);
        }
      );
    }
  }

  // Carrega os orientadores quando uma especialidade é selecionada
  onEspecialidadeSelecionada(event: any): void {
    const especialidadeId = event.target.value;
    if (especialidadeId) {
      this.monografiaService.getOrientadoresPorEspecialidade(especialidadeId).subscribe(
        (data: Orientador[]) => {
          this.orientadores = data;
          this.monografiaForm.get('orientadorId')?.reset(); // Reseta o campo de orientador
        },
        (error) => {
          this.handleError('Erro ao carregar orientadores:', error);
        }
      );
    }
  }

  onFileChange(event: any, campo: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.monografiaForm.get(campo)?.setValue(file);
    }
  }

  onSubmit(): void {
    if (this.monografiaForm.invalid) {
      Swal.fire('Erro', 'Preencha todos os campos corretamente.', 'error');
      return;
    }

    const formData = new FormData();
    Object.keys(this.monografiaForm.controls).forEach((key) => {
      const value = this.monografiaForm.get(key)?.value;
      if (value) {
        formData.append(key, value);
      }
    });

    this.monografiaService.updateMonografia(this.monografiaId, formData).subscribe(
      () => {
        Swal.fire('Sucesso', 'Monografia atualizada com sucesso!', 'success').then(() => {
          this.router.navigate(['/aluno/inscricao-monografia']);
        });
      },
      (error) => {
        this.handleError('Erro ao atualizar monografia:', error);
      }
    );
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    Swal.fire('Erro', 'Ocorreu um erro. Tente novamente mais tarde.', 'error');
  }
}
