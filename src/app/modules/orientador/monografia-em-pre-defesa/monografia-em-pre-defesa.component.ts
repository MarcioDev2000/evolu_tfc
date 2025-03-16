import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PreDefesaModalComponent } from '../pre-defesa-modal/pre-defesa-modal.component';

@Component({
  selector: 'app-monografia-em-pre-defesa',
  templateUrl: './monografia-em-pre-defesa.component.html',
  styleUrls: ['./monografia-em-pre-defesa.component.scss']
})
export class MonografiaEMPREDEFESAComponent implements OnInit {
  preDefesas: any[] = []; // Array para armazenar as pré-defesas
  preDefesasFiltradas: any[] = []; // Array para armazenar as pré-defesas filtradas
  isLoading: boolean = true; // Estado de carregamento
  filtro: string = ''; // Filtro de busca

  constructor(
    private predefesaService: PreDefesaService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadPreDefesasComStatusPreMonografia();
  }

  // Carrega as pré-defesas com status da monografia EM_PRE_DEFESA
  loadPreDefesasComStatusPreMonografia(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.id; // Obtém o ID do usuário do localStorage

      // Busca as pré-defesas com status da monografia EM_PRE_DEFESA
      this.predefesaService.listarPreDefesasComStatusPreMonografia(usuarioId).subscribe(
        (data) => {
          this.preDefesas = data; // Atribui os dados ao array preDefesas
          this.preDefesasFiltradas = data; // Inicializa o array filtrado com todos os dados
          this.isLoading = false; // Desativa o estado de carregamento
        },
        (error) => {
          console.error('Erro ao carregar pré-defesas:', error);
          Swal.fire('Erro', 'Não foi possível carregar as pré-defesas.', 'error');
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

  detalharPreDefesa(id: string): void {
    this.router.navigate(['/orientador/pre-defesaDetalhe', id]);
  }

  // Abre o modal de atualização de pré-defesa
  abrirModalAtualizacao(preDefesa: any): void {
    const modalRef = this.modalService.open(PreDefesaModalComponent, { size: 'lg' });
    modalRef.componentInstance.preDefesa = preDefesa;
    modalRef.componentInstance.atualizacaoConcluida.subscribe(() => {
      this.loadPreDefesasComStatusPreMonografia(); // Recarrega as pré-defesas após a atualização
    });
  }
}
