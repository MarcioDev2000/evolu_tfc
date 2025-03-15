import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  usersAll: any[] = []; // Lista completa de usuários
  usersFiltrados: any[] = []; // Lista de usuários filtrados
  filtro: string = ''; // Variável para armazenar o valor do filtro

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUsuariosInativos();
  }

  carregarUsuariosInativos(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const adminId = userData.id;

      this.userService.listarUsuariosInativos(adminId).subscribe(
        (response) => {
          this.usersAll = response; // Atribui a lista completa de usuários
          this.usersFiltrados = response; // Inicializa a lista filtrada com todos os usuários
        },
        (error) => {
          console.error('Erro ao carregar usuários inativos:', error);
          Swal.fire('Erro', 'Não foi possível carregar a lista de usuários inativos.', 'error');
        }
      );
    } else {
      Swal.fire('Erro', 'Dados do usuário não encontrados.', 'error');
    }
  }

  aplicarFiltro(): void {
    if (this.filtro) {
      this.usersFiltrados = this.usersAll.filter(user =>
        user.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      this.usersFiltrados = this.usersAll; // Se não houver filtro, mostra todos os usuários
    }
  }

  limparFiltro(): void {
    this.filtro = '';
    this.aplicarFiltro(); // Reaplica o filtro (que agora está vazio)
  }

  atualizarStatus(id: string, novoStatus: string): void {
    const statusBoolean = novoStatus === 'Ativo'; // Converte string para boolean

    Swal.fire({
      title: `Tem certeza que deseja ${statusBoolean ? 'ativar' : 'desativar'} este usuário?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.atualizarStatusUsuario(id, statusBoolean).subscribe(
          () => {
            Swal.fire('Sucesso!', `Usuário ${statusBoolean ? 'ativado' : 'desativado'} com sucesso.`, 'success');
            this.carregarUsuariosInativos(); // Atualiza a lista após a alteração
          },
          (error) => {
            console.error('Erro ao atualizar status do usuário:', error);
            Swal.fire('Erro!', 'Não foi possível atualizar o status do usuário.', 'error');
          }
        );
      }
    });
  }

}
