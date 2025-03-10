import { Component, OnInit } from '@angular/core';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-marcar-pre-defesa',
  templateUrl: './all-marcar-pre-defesa.component.html',
  styleUrls: ['./all-marcar-pre-defesa.component.scss']
})
export class AllMarcarPreDefesaComponent implements OnInit {

  marcarPreDefesa: any[] = []; // Lista de pré-defesas
  marcarPreDefesaFiltradas: any[] = []; // Lista filtrada de pré-defesas
  filtro: string = ''; // Termo de filtro

  constructor(
    private marcarPreDefesaService: PreDefesaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarMarcarPreDefesaPorAdmin();
  }

  carregarMarcarPreDefesaPorAdmin(): void {
    this.marcarPreDefesaService.listarPreDefesasPorStatus().subscribe({
      next: (data) => {
        this.marcarPreDefesa = data;
        this.marcarPreDefesaFiltradas = data;
      },
      error: (error) => {
        console.error('Erro ao buscar pré-defesas:', error);
        Swal.fire('Erro', 'Não foi possível carregar as pré-defesas.', 'error');
      }
    });
  }


  applyFilter(): void {
    if (!this.marcarPreDefesa) return;

    const termo = this.filtro.toLowerCase();
    this.marcarPreDefesaFiltradas = this.marcarPreDefesa.filter((preDefesa: any) =>
      preDefesa.temaMonografia.toLowerCase().includes(termo) ||
      preDefesa.status.toLowerCase().includes(termo)
    );
  }

  DetalheMonografia(id: string): void {
    this.router.navigate(['/admin/detalhe-marcarPreDefesa', id]);
  }

}
