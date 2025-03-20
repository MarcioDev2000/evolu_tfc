import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DefesaService } from 'src/app/shared/services/defesa.service';
import { MonografiaService } from 'src/app/shared/services/monografia.service';

interface Defesa {
  temaMonografia: string;
  status: string;
  alunoNomeCompleto: string;
  especialidadeNome: string;
  orientadorNomeCompleto: string;
  presidenteNomeCompleto: string;
  vogalNomeCompleto: string;
  linkProjeto: string;
  nota: number;
  observacoes: string;
}

@Component({
  selector: 'app-detalhe-defesa',
  templateUrl: './detalhe-defesa.component.html',
  styleUrls: ['./detalhe-defesa.component.scss']
})
export class DetalheDefesaComponent implements OnInit {

  defesas: Defesa[] = [];
  defesasFiltradas: Defesa[] = [];
  filtro: string = '';
  defesaSelecionada: Defesa | null = null;
  nota: number | null = null;
  observacoes: string = '';

  usuarioId: string | null = null;

  constructor(
    private defesaService: DefesaService,
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
    this.defesaService.listarDefesasMarcadasStatusAprovado(usuario.id).subscribe({
      next: (data) => {
        this.defesas = data.map((defesa: Defesa) => ({
          ...defesa,
          nota: defesa.nota || 0, // Garante que a nota seja um número
          observacoes: defesa.observacoes || 'Sem observações' // Garante que as observações sejam uma string
        }));
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
    this.defesasFiltradas = this.defesas.filter((defesa: Defesa) =>
      defesa.temaMonografia.toLowerCase().includes(termo) ||
      defesa.status.toLowerCase().includes(termo)
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
}
