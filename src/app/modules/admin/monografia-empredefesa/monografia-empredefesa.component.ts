import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-monografia-empredefesa',
  templateUrl: './monografia-empredefesa.component.html',
  styleUrls: ['./monografia-empredefesa.component.scss']
})
export class MonografiaEMPREDEFESAComponent implements OnInit {
  preDefesas: any[] = []; // Array para armazenar as pré-defesas
  preDefesasFiltradas: any[] = []; // Array para armazenar as pré-defesas filtradas
  isLoading: boolean = true; // Estado de carregamento
  filtro: string = ''; // Filtro de busca

  constructor(
    private predefesaService: PreDefesaService
  ) {}

  ngOnInit(): void {
    this.loadMonografiasEmPreDefesa();
  }

  // Carrega as monografias em pré-defesa para o usuário
  loadMonografiasEmPreDefesa(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.id; // Obtém o ID do usuário do localStorage

      // Busca as monografias em pré-defesa
      this.predefesaService.listarMonografiasEmPreDefesaStatus(usuarioId).subscribe(
        (data) => {
          this.preDefesas = data; // Atribui os dados ao array preDefesas
          this.preDefesasFiltradas = data; // Inicializa o array filtrado com todos os dados
          this.isLoading = false; // Desativa o estado de carregamento
        },
        (error) => {
          console.error('Erro ao carregar monografias em pré-defesa:', error);
          Swal.fire('Erro', 'Não foi possível carregar as monografias em pré-defesa.', 'error');
          this.isLoading = false; // Desativa o estado de carregamento
        }
      );
    } else {
      Swal.fire('Erro', 'Usuário não encontrado.', 'error');
      this.isLoading = false; // Desativa o estado de carregamento
    }
  }

  // Aplica o filtro de busca
  applyFilter(): void {
    if (!this.preDefesas) return;

    const termo = this.filtro.toLowerCase();
    this.preDefesasFiltradas = this.preDefesas.filter((preDefesa: any) =>
      preDefesa.temaMonografia.toLowerCase().includes(termo) ||
      preDefesa.statusMonografia.toLowerCase().includes(termo)
    );
  }
}
