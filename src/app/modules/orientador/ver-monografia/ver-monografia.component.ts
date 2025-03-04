import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-monografia',
  templateUrl: './ver-monografia.component.html',
  styleUrls: ['./ver-monografia.component.scss']
})
export class VerMonografiaComponent implements OnInit {

  monografias: any[] = []; // Lista de monografias carregadas
  monografiasFiltradas: any[] = []; // Lista de monografias filtradas
  filtro: string = ''; // Propriedade para armazenar o valor do filtro

  // Variáveis para o modal de atualização
  monografiaSelecionada: any; // Monografia selecionada para atualização
  novoStatus: string = ''; // Novo status selecionado
  descricao: string = ''; // Descrição da atualização

  constructor(
    private monografiaService: MonografiaService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.carregarMonografiasPorOrientador();
  }

  carregarMonografiasPorOrientador(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const orientadorId = userData.id;

      this.monografiaService.getMonografiasPorOrientador(orientadorId).subscribe({
        next: (data) => {
          this.monografias = data; // Atribui as monografias ao array
          this.monografiasFiltradas = data; // Inicializa as monografias filtradas com os dados originais
        },
        error: (error) => {
          console.error('Erro ao buscar monografias do orientador:', error);
          Swal.fire('Erro', 'Não foi possível carregar as monografias.', 'error');
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
      const orientadorId = userData.id;

      this.monografiaService
        .reviewMonografia(
          this.monografiaSelecionada.id,
          this.novoStatus,
          this.descricao,
          orientadorId
        )
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Monografia atualizada com sucesso!', 'success');
            modal.close(); // Fecha o modal
            this.carregarMonografiasPorOrientador(); // Recarrega a lista de monografias
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
    this.router.navigate(['/orientador/detalhe-monografia', id]);
  }

}
