import { Component, OnInit } from "@angular/core";
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
  estatisticas: any = {
    numeroRevisoes: 0,
    statusAtual: '',
    documentosPendentes: [],
    tempoMedioRevisao: 0,
    diasNoStatus: 0,
    chanceAprovacao: ''
  };

  estatisticasStatus: any = {
    Aprovado: 0,
    Em_Revisao: 0,
    Pendente: 0
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
    this.carregarEstatisticasMonografia();
  }

  carregarEstatisticasMonografia(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const alunoId = userData.id;

      // Carrega as estatísticas gerais
      this.monografiaService.getEstatisticasAluno(alunoId).subscribe(
        (data: any) => {
          this.estatisticas = data;
          this.renderizarGrafico(); // Renderiza o gráfico após carregar os dados
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas da monografia:', error);
          Swal.fire('Erro', 'Não foi possível carregar as estatísticas.', 'error');
        }
      );

      // Carrega as estatísticas de status
      this.monografiaService.getEstatisticasStatusPorAlunoId(alunoId).subscribe(
        (data: any) => {
          this.estatisticasStatus = data;
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas de status:', error);
          Swal.fire('Erro', 'Não foi possível carregar as estatísticas de status.', 'error');
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
        labels: ['Revisões', 'Tempo Médio (dias)', 'Dias no Status', 'Chance de Aprovação (%)'],
        datasets: [{
          label: 'Estatísticas da Monografia',
          data: [
            this.estatisticas.numeroRevisoes,
            this.estatisticas.tempoMedioRevisao,
            this.estatisticas.diasNoStatus,
            parseFloat(this.estatisticas.chanceAprovacao)
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)', // Azul
            'rgba(75, 192, 192, 0.6)', // Verde
            'rgba(255, 206, 86, 0.6)', // Amarelo
            'rgba(255, 99, 132, 0.6)'  // Vermelho
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Valores'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Categorias'
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFontSize: 16,
          bodyFontSize: 14,
          footerFontSize: 12
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
}
