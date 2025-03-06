import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Chart from 'chart.js';
import { MonografiaService } from "src/app/shared/services/monografia.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.component.html',
  styleUrls: ['./estatistica.component.scss']
})
export class EstatisticaComponent implements OnInit {
  estatisticasAdmin: any = {
    totalOrientadores: 0,
    totalMonografiasAprovadas: 0,
    totalAlunos: 0,
    totalMonografiasEmRevisao: 0
  };

  public canvas: any;
  public ctx: CanvasRenderingContext2D;
  public datasets: any;
  public data: any;
  public myChartData: Chart | undefined;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  constructor(private monografiaService: MonografiaService, private router: Router) {
    this.ctx = null!;
    this.myChartData = undefined;
  }

  ngOnInit(): void {
    this.carregarEstatisticasAdmin();
  }
  carregarEstatisticasAdmin(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const adminId = userData.id; // Obtém o ID do admin do localStorage

      // Carrega as estatísticas do admin
      this.monografiaService.GetEstatisticasAdmin(adminId).subscribe(
        (data: any) => {
          this.estatisticasAdmin = data;
          this.renderizarGrafico(); // Renderiza o gráfico após carregar os dados
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas do admin:', error);
          Swal.fire('Erro', 'Não foi possível carregar as estatísticas do admin.', 'error');
        }
      );
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

  renderizarGrafico(): void {
    const ctx = document.getElementById('estatisticaChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total de Orientadores', 'Monografias Aprovadas', 'Total de Alunos', 'Monografias em Revisão'],
        datasets: [{
          label: 'Estatísticas do Admin',
          data: [
            this.estatisticasAdmin.totalOrientadores,
            this.estatisticasAdmin.totalMonografiasAprovadas,
            this.estatisticasAdmin.totalAlunos,
            this.estatisticasAdmin.totalMonografiasEmRevisao
          ],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
      },
      options: {
        scales: {
          yAxes: [{ // Configuração para o eixo Y
            ticks: {
              beginAtZero: true // Começa o eixo Y a partir de zero
            }
          }]
        }
      }
    });
  }
}
