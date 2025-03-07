import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonografiaService } from 'src/app/shared/services/monografia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.scss']
})
export class DetalheAlunoComponent implements OnInit {
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
      this.router.navigate(['/admin/monografias']);
    }
  }

  carregarMonografia(id: string): void {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const adminId = userData.id;
  
        // Passa o orientadorId e o monografiaId (id da rota) para o método
        this.monografiaService.getMonografiaAprovadaPorAdmin(adminId, id).subscribe({
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
  
      visualizarDocumento(url: string, tipoDocumento: string): void {
         const monografiaId = url.split('/')[4];
         this.monografiaService.visualizarDocumento(monografiaId, tipoDocumento).subscribe(
           (blob: Blob) => {
             const fileURL = URL.createObjectURL(blob);
             window.open(fileURL, '_blank'); // Abre o documento em uma nova aba
           },
           (error) => {
             console.error('Erro ao visualizar documento:', error);
             Swal.fire('Erro', 'Não foi possível visualizar o documento.', 'error');
           }
         );
       }

}
