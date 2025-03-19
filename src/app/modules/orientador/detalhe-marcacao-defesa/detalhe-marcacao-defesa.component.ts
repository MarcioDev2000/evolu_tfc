import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefesaService } from 'src/app/shared/services/defesa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MonografiaService } from 'src/app/shared/services/monografia.service';

@Component({
  selector: 'app-detalhe-marcacao-defesa',
  templateUrl: './detalhe-marcacao-defesa.component.html',
  styleUrls: ['./detalhe-marcacao-defesa.component.scss']
})
export class DetalheMarcacaoDefesaComponent implements OnInit {
  defesas: any[] = [];
  defesasFiltradas: any[] = [];
  filtro: string = '';
  defesaSelecionada: any;
  nota: number | null = null;
  observacoes: string = '';

  usuarioId: string | null = null; // Adiciona uma variável para armazenar o usuarioId

  constructor(
    private defesaService: DefesaService,
    private router: Router,
    private modalService: NgbModal,
    private monografiaService: MonografiaService
  ) {}

  ngOnInit(): void {
    this.carregarDefesasPorUsuario();
  }

  private carregarDefesasPorUsuario(): void {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const usuario = JSON.parse(userData);
    this.usuarioId = usuario.id; // Armazena o usuarioId
    this.defesaService.listarDefesasMarcadasStatus(usuario.id).subscribe({
      next: (data) => {
        this.defesas = data;
        this.defesasFiltradas = [...this.defesas];
      },
      error: (err) => {
        console.error('Erro ao carregar defesas:', err);
        Swal.fire('Erro', 'Não foi possível carregar as defesas.', 'error');
      }
    });
  }

  applyFilter(): void {
    if (!this.defesas) return;

    const termo = this.filtro.toLowerCase();
    this.defesasFiltradas = this.defesas.filter(({ temaMonografia, status }) =>
      temaMonografia.toLowerCase().includes(termo) ||
      status.toLowerCase().includes(termo)
    );
  }

  visualizarDocumento(url: string, tipoDocumento: string): void {
    const monografiaId = url.split('/')[4];
    this.monografiaService.visualizarDocumento(monografiaId, tipoDocumento).subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        console.error('Erro ao visualizar documento:', err);
        Swal.fire('Erro', 'Não foi possível visualizar o documento.', 'error');
      }
    });
  }

  abrirModalAplicarNota(defesa: any, modal: TemplateRef<any>): void {
    this.defesaSelecionada = defesa;
    this.nota = null;
    this.observacoes = '';
    this.modalService.open(modal, { size: 'lg' });
  }

  aplicarNotaObservacao(modal: any): void {
    if (this.nota === null || this.nota < 0 || this.nota > 20) {
      Swal.fire('Erro', 'A nota deve estar entre 0 e 20.', 'error');
      return;
    }

    if (!this.usuarioId) {
      Swal.fire('Erro', 'Usuário não autenticado.', 'error');
      return;
    }

    this.defesaService.aplicarNotaObservacao(this.defesaSelecionada.id, this.nota, this.observacoes, this.usuarioId).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Nota e observação aplicadas com sucesso!', 'success');
        modal.close();
        this.carregarDefesasPorUsuario();
      },
      error: (err) => {
        console.error('Erro ao aplicar nota e observação:', err);
        Swal.fire('Erro', 'Não foi possível aplicar nota e observação.', 'error');
      }
    });
  }
}
