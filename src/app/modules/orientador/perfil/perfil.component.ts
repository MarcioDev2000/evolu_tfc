import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {


    usuario: User = {
      nome: '',
      sobrenome: '',
      endereco: '',
      telefone: '',
      email: '',
      password: '',
      nif: '',
      tipoUsuario: '',
      matricula: null,
      especialidade: null,
      curso:''
    };

    constructor(
      private userService: UserService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.setAlunoId();
    }

    setAlunoId(): void {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const usuarioId = userData.id;
        this.getUsuarioPorId(usuarioId);
      } else {
        Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
        this.router.navigate(['/login']);
      }
    }

    getUsuarioPorId(usuarioId: string): void {
      this.userService.getUsuarioPorId(usuarioId).subscribe(
        (user: User) => {
          this.usuario = user;
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      );
    }
  }


