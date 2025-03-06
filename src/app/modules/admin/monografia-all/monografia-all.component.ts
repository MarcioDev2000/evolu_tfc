import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-monografia-all',
  templateUrl: './monografia-all.component.html',
  styleUrls: ['./monografia-all.component.scss']
})
export class MonografiaAllComponent implements OnInit {
  monografias: any[] = [];
  monografiasFiltradas: any[] = [];
  filtro: string = ''; 

  
  monografiaSelecionada: any;
  novoStatus: string = ''; 
  descricao: string = ''; 

  constructor(
    private monografiaService: MonografiaService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.carregarMonografiasAprovadasPorAdmin();
  }

  // Método atualizado para carregar monografias aprovadas pelo admin
  carregarMonografiasAprovadasPorAdmin(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const adminId = userData.id;

      this.monografiaService.getMonografiasAprovadasPorAdmin(adminId).subscribe({
        next: (data) => {
          this.monografias = data; // Atribui as monografias ao array
          this.monografiasFiltradas = data; // Inicializa as monografias filtradas com os dados originais
        },
        error: (error) => {
          console.error('Erro ao buscar monografias aprovadas pelo admin:', error);
          Swal.fire('Erro', 'Não foi possível carregar as monografias aprovadas.', 'error');
        }
      });
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

  applyFilter(): void {
    if (!this.monografias) return;

    const termo = this.filtro.toLowerCase();
    this.monografiasFiltradas = this.monografias.filter((monografia: any) =>
      monografia.tema.toLowerCase().includes(termo) ||
      monografia.status.toLowerCase().includes(termo)
    );
  }

  visualizarDocumento(url: string, tipoDocumento: string): void {
    const monografiaId = url.split('/')[4];
    this.monografiaService.visualizarDocumento(monografiaId, tipoDocumento).subscribe(
      (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank'); // Abre o documento em uma nova aba
      },
      (error) => {
        console.error('Erro ao visualizar documento:', error);
        Swal.fire('Erro', 'Não foi possível visualizar o documento.', 'error');
      }
    );
  }

  // Abre o modal de atualização
  abrirModalAtualizacao(monografia: any, modal: TemplateRef<any>): void {
    this.monografiaSelecionada = monografia;
    this.novoStatus = monografia.status; // Define o status atual como padrão
    this.descricao = ''; // Limpa a descrição
    this.modalService.open(modal, { size: 'lg' }); // Abre o modal
  }

  salvarAtualizacao(modal: any): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const adminId = userData.id;

      this.monografiaService
        .adminReviewMonografia(
          this.monografiaSelecionada.id,
          this.novoStatus,
          this.descricao,
          adminId
        )
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Monografia atualizada com sucesso!', 'success');
            modal.close(); // Fecha o modal
            this.carregarMonografiasAprovadasPorAdmin(); // Recarrega a lista de monografias
          },
          error: (error) => {
            console.error('Erro ao atualizar monografia:', error);
            Swal.fire('Erro', 'Não foi possível atualizar a monografia.', 'error');
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

  DetalheMonografia(id: string): void {
    this.router.navigate(['/admin/detalhe-monografia', id]);
  }
}