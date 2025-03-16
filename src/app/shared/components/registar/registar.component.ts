import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { TipoDeEntidade } from '../../model/user/TipoDeEntidade.enum';

interface TipoUsuario {
  id: string;
  nome: string;
  rota: string;
}

interface Especialidade {
  id: string;
  nome: string;
}

interface CursoDTO {
  id: string;
  nome: string;
}

interface EspecialidadeDTO {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.scss']
})
export class RegistarComponent implements OnInit {

  TipoDeEntidade = TipoDeEntidade; // Adicione esta linha para usar o enum no template
  selectedUserRole: string = '';
  tipoUsuarios: TipoUsuario[] = []; // Lista de tipos de usuário
  tipoUsuarioSelecionado: boolean = false;
  cursos: CursoDTO[] = []; // Lista de cursos
  especialidades: EspecialidadeDTO[] = []; // Lista de especialidades
  cursoSelecionado: string | null = null; // Curso selecionado

  user: User = {
    nome: '',
    sobrenome: '',
    endereco: '',
    telefone: '',
    email: '',
    password: '',
    nif: '',
    tipoUsuario: '',
    matricula:'',
    especialidade: '',
    status: false
  };

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarTiposUsuario();
    this.carregarCursos();
  }

  carregarTiposUsuario(): void {
    this.userService.getTipoUsuarios().subscribe(
      (tiposUsuario: TipoUsuario[]) => {
        this.tipoUsuarios = tiposUsuario.filter(tipo =>
          tipo.nome === TipoDeEntidade.aluno || tipo.nome === TipoDeEntidade.orientador
        );
      },
      error => {
        console.error('Erro ao carregar tipos de usuário:', error);
      }
    );
  }

  carregarCursos(): void {
    this.userService.listarTodosCursos().subscribe(
        (cursos: CursoDTO[]) => {
            this.cursos = cursos;
        },
        error => {
            console.error('Erro ao carregar cursos:', error);
        }
    );
}

onCursoChange(cursoId: string): void {
    this.cursoSelecionado = cursoId;
    if (this.selectedUserRole === TipoDeEntidade.orientador) {
        this.carregarEspecialidadesPorCurso(cursoId);
    }
}

carregarEspecialidadesPorCurso(cursoId: string): void {
    this.userService.listarEspecialidadesPorCurso(cursoId).subscribe(
        (especialidades: EspecialidadeDTO[]) => {
            this.especialidades = especialidades;
        },
        error => {
            console.error('Erro ao carregar especialidades:', error);
        }
    );
}

  openSnackBar(title: string, message: string, panelClass: string): void {
    this.snackBar.open(message, title, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }

  criarUser(UserForm: NgForm): void {
    if (!this.cursoSelecionado) {
        this.openSnackBar('Erro', 'Selecione um curso.', 'error');
        return;
    }

    const userData = { ...this.user, cursoId: this.cursoSelecionado };

    if (this.selectedUserRole === TipoDeEntidade.aluno) {
        delete userData.especialidade;
    }
    if (this.selectedUserRole === TipoDeEntidade.orientador) {
        delete userData.matricula;
    }

    this.userService.create(userData).subscribe(
        response => {
            Swal.fire('Sucesso', 'Usuário registrado com sucesso!', 'success').then(() => {
                this.router.navigate(['/login']);
            });
        },
        error => {
            // Verifique se o erro é um erro de "Email já cadastrado"
            if (error.status === 400) {
                // Acessa a mensagem de erro no campo "email"
                if (error.error?.email  === 'Email já cadastrado.') {
                    this.openSnackBar('Erro', 'Email já cadastrado.', 'error');
                } else if (error.error?.email === 'Email inválido') {
                    this.openSnackBar('Erro', 'Email do usuário inválido.', 'error');
                } else if (error.error?.email === 'O NIF já está cadastrado no sistema.') {
                  this.openSnackBar('Erro', 'O NIF já está cadastrado no sistema.', 'error');
              }

                else {
                    // Mensagem de erro genérica, caso algum outro erro aconteça
                    this.openSnackBar('Erro', 'Ocorreu um erro ao criar o usuário.', 'error');
                }
            } else {
                // Caso seja outro tipo de erro (não 400)
                Swal.fire('Erro', 'Ocorreu um erro ao criar o usuário.', 'error');
            }
        }
    );
}

onRoleChange(idTipoUsuario: string, nome: string): void {
    if (idTipoUsuario) {
        this.user.tipoUsuario = idTipoUsuario;
        this.selectedUserRole = nome;
        this.tipoUsuarioSelecionado = true;
    } else {
        console.error('ID do tipo de usuário é inválido.');
    }
}

camposPreenchidos(): boolean {
    const camposBasicos = !!this.user.email && !!this.user.password && !!this.user.nome && !!this.user.sobrenome && !!this.user.nif && !!this.user.telefone && this.tipoUsuarioSelecionado && !!this.cursoSelecionado;

    if (this.selectedUserRole === TipoDeEntidade.aluno) {
        return camposBasicos && !!this.user.matricula;
    } else if (this.selectedUserRole === TipoDeEntidade.orientador) {
        return camposBasicos && !!this.user.especialidade;
    }

    return camposBasicos;
}
}

