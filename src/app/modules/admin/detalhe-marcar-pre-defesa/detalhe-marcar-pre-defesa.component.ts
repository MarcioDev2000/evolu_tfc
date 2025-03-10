import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';

@Component({
  selector: 'app-detalhe-marcar-pre-defesa',
  templateUrl: './detalhe-marcar-pre-defesa.component.html',
  styleUrls: ['./detalhe-marcar-pre-defesa.component.scss']
})
export class DetalheMarcarPreDefesaComponent implements OnInit {

  marcarPreDefesa: any = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly preDefesaService: PreDefesaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarMarcarPreDefesa(id);
      } else {
        this.redirecionarParaMonografias();
      }
    });
  }

  private carregarMarcarPreDefesa(id: string): void {
    this.preDefesaService.buscarPreDefesaPorId(id).subscribe({
      next: (data) => {
        this.marcarPreDefesa = data;
      },
      error: (error) => {
        console.error('Erro ao buscar pré-defesa:', error);
        Swal.fire('Erro', 'Não foi possível carregar a pré-defesa.', 'error');
        this.redirecionarParaMonografias();
      }
    });
  }

  private redirecionarParaMonografias(): void {
    this.router.navigate(['/admin/calendario']);
  }
}
