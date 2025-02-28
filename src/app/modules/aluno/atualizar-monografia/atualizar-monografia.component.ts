import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import Swal from 'sweetalert2';

interface Especialidade {
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
    this.carregarEspecialidades();
    this.setAlunoId();
    this.carregarDadosMonografia();
  }

  inicializarFormulario(): void {
    this.monografiaForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.maxLength(200)]],
      especialidadeId: ['', Validators.required],
      orientadorId: ['', Validators.required],
      extratoBancario: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      declaracaoNotas: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      termoOrientador: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
      projeto: [null, this.validateFileType(['pdf', 'doc', 'docx'])],
      documentoBi: [null, this.validateFileType(['pdf', 'jpeg', 'png'])],
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
        console.log('Orientadores carregados:', data); // Verifique se os dados estão corretos
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
