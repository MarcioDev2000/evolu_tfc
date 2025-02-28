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
        labels: ['Revisões', 'Tempo Médio', 'Dias no Status', 'Chance de Aprovação'],
        datasets: [{
          label: 'Estatísticas da Monografia',
          data: [
            this.estatisticas.numeroRevisoes,
            this.estatisticas.tempoMedioRevisao,
            this.estatisticas.diasNoStatus,
            parseFloat(this.estatisticas.chanceAprovacao)
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
