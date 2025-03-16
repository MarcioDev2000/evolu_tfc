import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalhe-monografia-pre-defesa',
  templateUrl: './detalhe-monografia-pre-defesa.component.html',
  styleUrls: ['./detalhe-monografia-pre-defesa.component.scss']
})
export class DetalheMonografiaPreDefesaComponent implements OnInit {

  predefesa: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private defesaService: PreDefesaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarPreDefesa(id);
    } else {
      this.router.navigate(['/pre-defesas']);
    }
  }

  carregarPreDefesa(id: string): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.id;

      // Passa o usuarioId e o preDefesaId (id da rota) para o método
      this.defesaService.detalharPreDefesaPorIdEUsuario(id, usuarioId).subscribe({
        next: (data) => {
          this.predefesa = data;
        },
        error: (error) => {
          console.error('Erro ao buscar pré-defesa:', error);
          Swal.fire('Erro', 'Não foi possível carregar a pré-defesa.', 'error');
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
    this.defesaService.visualizarDocumento(monografiaId, tipoDocumento).subscribe(
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
