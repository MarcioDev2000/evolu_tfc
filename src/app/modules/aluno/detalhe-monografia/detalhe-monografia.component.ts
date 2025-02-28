import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalhe-monografia',
  templateUrl: './detalhe-monografia.component.html',
  styleUrls: ['./detalhe-monografia.component.scss']
})
export class DetalheMonografiaComponent implements OnInit {
  monografia: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monografiaService: MonografiaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarMonografia(id);
    } else {
      this.router.navigate(['/aluno/inscricao-monografia']);
    }
  }

  carregarMonografia(id: string): void {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const alunoId = userData.id;

        this.monografiaService.getMonografiaByAlunoId(alunoId).subscribe({
          next: (data) => {
            this.monografia = data;
          },
          error: (error) => {
            console.error('Erro ao buscar monografia:', error);
            Swal.fire('Erro', 'Não foi possível carregar a monografia.', 'error');
          }
        });
      } else {
        Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
        this.router.navigate(['/login']);
      }
    }

  baixarDocumento(link: string): void {
    window.open(link, '_blank'); // Abre o link em uma nova aba
  }

}
