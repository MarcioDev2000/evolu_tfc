import { Component, OnInit } from '@angular/core';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-monografia',
  templateUrl: './ver-monografia.component.html',
  styleUrls: ['./ver-monografia.component.scss']
})
export class VerMonografiaComponent implements OnInit {

  monografia: any = null;
  filtro: string = '';
  carregando: boolean = true; // Variável para controlar o estado de carregamento
  nenhumaMonografia: boolean = false; // Variável para controlar a exibição da mensagem de "Nenhuma monografia encontrada"

  constructor(
    private monografiaService: MonografiaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarMonografia();
  }

  carregarMonografia(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const alunoId = userData.id;

      this.monografiaService.getMonografiaByAlunoId(alunoId).subscribe({
        next: (data) => {
          this.carregando = false; // Finaliza o estado de carregamento
          if (!data || Object.keys(data).length === 0) {
            this.nenhumaMonografia = true; // Define que não há monografias
          } else {
            this.nenhumaMonografia = false; // Define que há monografias
            this.monografia = data;
          }
        },
        error: (error) => {
          this.carregando = false; // Finaliza o estado de carregamento
          console.error('Erro ao buscar monografia:', error);
          if (error.status === 500 && error.error?.message?.includes('Nenhuma monografia encontrada')) {
            this.nenhumaMonografia = true; // Define que não há monografias
          } else {
            Swal.fire('Erro', 'Não foi possível carregar a monografia.', 'error');
          }
        }
      });
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.router.navigate(['/login']);
    }
  }

  applyFilter(): void {
    if (!this.monografia) return;

    const termo = this.filtro.toLowerCase();
    this.monografia = this.monografia.filter((monografia: any) =>
      monografia.tema.toLowerCase().includes(termo) ||
      monografia.status.toLowerCase().includes(termo)
    );
  }

  baixarDocumento(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'documento';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  atualizarMonografia(id: string): void {
    this.router.navigate(['/aluno/atualizar-monografia', id]);
  }

  DetalheMonografia(id: string): void {
    this.router.navigate(['/aluno/detalhe-monografia', id]);
  }
}
