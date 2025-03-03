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

  estatisticasOrientador: any = {
    monografiasAprovadas: 0,
    monografiasEmRevisao: 0,
    monografiasPendentes: 0,
    numeroAlunosOrientados: 0
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
    this.carregarEstatisticasOrientador();
  }

  carregarEstatisticasOrientador(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const orientadorId = userData.id;

      // Carrega as estatísticas do orientador
      this.monografiaService.getEstatisticasPorOrientador(orientadorId).subscribe(
        (data: any) => {
          this.estatisticasOrientador = data;
          this.renderizarGrafico(); // Renderiza o gráfico após carregar os dados
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas do orientador:', error);
          Swal.fire('Erro', 'Não foi possível carregar as estatísticas do orientador.', 'error');
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
        labels: ['Monografias Aprovadas', 'Monografias em Revisão', 'Monografias Pendentes', 'Alunos Orientados'],
        datasets: [{
          label: 'Estatísticas do Orientador',
          data: [
            this.estatisticasOrientador.monografiasAprovadas,
            this.estatisticasOrientador.monografiasEmRevisao,
            this.estatisticasOrientador.monografiasPendentes,
            this.estatisticasOrientador.numeroAlunosOrientados
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
