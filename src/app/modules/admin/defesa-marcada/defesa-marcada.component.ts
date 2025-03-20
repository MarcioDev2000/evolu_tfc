import { Component, OnInit } from '@angular/core';
import { DefesaService } from 'src/app/shared/services/defesa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MonografiaService } from 'src/app/shared/services/monografia.service';

@Component({
  selector: 'app-defesa-marcada',
  templateUrl: './defesa-marcada.component.html',
  styleUrls: ['./defesa-marcada.component.scss']
})
export class DefesaMarcadaComponent implements OnInit {

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

}
