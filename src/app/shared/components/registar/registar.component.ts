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

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.scss']
})
export class RegistarComponent implements OnInit {

  TipoDeEntidade = TipoDeEntidade; // Adicione esta linha para usar o enum no template
  selectedUserRole: string = '';
  tipoUsuarios: TipoUsuario[] = []; // Lista de tipos de usuário
  especialidades: Especialidade[] = []; // Lista de especialidades
  tipoUsuarioSelecionado: boolean = false;

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
    especialidade: ''
  };

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarTiposUsuario();
    this.carregarEspecialidades();
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
  carregarEspecialidades(): void {
    this.userService.getEspecialidades().subscribe(
      (especialidades: Especialidade[]) => {
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
    const userData = { ...this.user };

    // Remove o campo especialidade se o usuário for do tipo "aluno"
    if (this.selectedUserRole === TipoDeEntidade.aluno) {
      userData.especialidade = null;
    }

    // Remove o campo matricula se o usuário for do tipo "orientador"
    if (this.selectedUserRole === TipoDeEntidade.orientador) {
      userData.matricula = null;
    }

    this.userService.create(userData).subscribe(
      response => {
        Swal.fire('Sucesso', 'Usuário registrado com sucesso!', 'success');
        this.router.navigate(['/login']);
      },
      error => {
        if (error.error && error.error.email && error.error.email[0] === 'usuario with this email already exists.') {
          this.openSnackBar('Erro', 'Já existe um usuário com este e-mail.', 'error');
        } else {
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
    const camposBasicos = !!this.user.email && !!this.user.password && !!this.user.nome && !!this.user.sobrenome && !!this.user.nif && !!this.user.telefone && this.tipoUsuarioSelecionado;

    if (this.selectedUserRole === TipoDeEntidade.aluno) {
      return camposBasicos && !!this.user.matricula;
    } else if (this.selectedUserRole === TipoDeEntidade.orientador) {
      return camposBasicos && !!this.user.especialidade;
    }

    return camposBasicos;
  }
}
