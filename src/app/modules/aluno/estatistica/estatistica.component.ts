import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  nenhumaMonografia: boolean = false;


  estatisticasStatus: any = {
    Aprovado: 0,
    Em_Revisao: 0,
    Pendente: 0,
    Em_Pre_Defesa: 0, // Adiciona o status Em Pré-Defesa
    Em_Defesa: 0      // Adiciona o status Em Defesa
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

      // Verifica se há monografias para o aluno
      this.monografiaService.getEstatisticasAluno(alunoId).subscribe(
        (data: any) => {
          if (!data || Object.keys(data).length === 0) {
            this.nenhumaMonografia = true; // Define que não há monografias
            Swal.fire('Aviso', 'Nenhuma monografia encontrada para este aluno.', 'info');
          } else {
            this.nenhumaMonografia = false; // Define que há monografias
            this.estatisticas = data;
          }
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas da monografia:', error);
          if (error.status === 500 && error.error?.message?.includes('Nenhuma monografia encontrada')) {
            this.nenhumaMonografia = true; // Define que não há monografias
          } else {
            Swal.fire('Erro', 'Não foi possível carregar as estatísticas.', 'error');
          }
        }
      );

      // Carrega as estatísticas de status
      this.monografiaService.getEstatisticasStatusPorAlunoId(alunoId).subscribe(
        (data: any) => {
          this.estatisticasStatus = data;
        },
        (error: any) => {
          console.error('Erro ao carregar estatísticas de status:', error);
          if (error.status === 500 && error.error?.message?.includes('Nenhuma monografia encontrada')) {
            this.nenhumaMonografia = true; // Define que não há monografias
          } else {
            Swal.fire('Erro', 'Não foi possível carregar as estatísticas de status.', 'error');
          }
        }
      );
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

}
