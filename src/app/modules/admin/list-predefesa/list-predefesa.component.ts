import { Component, OnInit } from '@angular/core';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-predefesa',
  templateUrl: './list-predefesa.component.html',
  styleUrls: ['./list-predefesa.component.scss']
})
export class ListPredefesaComponent implements OnInit {

  preDefesas: any[] = []; // Array para armazenar as pré-defesas
  preDefesasFiltradas: any[] = []; // Array para armazenar as pré-defesas filtradas
  isLoading: boolean = true; // Estado de carregamento
  filtro: string = ''; // Filtro de busca

  constructor(
    private predefesaService: PreDefesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPreDefesas();
  }

  // Carrega todas as pré-defesas
  loadPreDefesas(): void {
    this.predefesaService.listarTodasPreDefesas().subscribe(
      (data) => {
        this.preDefesas = data; // Atribui os dados ao array preDefesas
        this.preDefesasFiltradas = data; // Inicializa o array filtrado com todos os dados
        this.isLoading = false; // Desativa o estado de carregamento
      },
      (error) => {
        console.error('Erro ao carregar pré-defesas:', error);
        Swal.fire('Erro', 'Não foi possível carregar as pré-defesas.', 'error');
        this.isLoading = false; // Desativa o estado de carregamento
      }
    );
  }

  // Aplica o filtro de busca
  applyFilter(): void {
    if (!this.preDefesas) return;

    const termo = this.filtro.toLowerCase();
    this.preDefesasFiltradas = this.preDefesas.filter((preDefesa: any) =>
      preDefesa.temaMonografia.toLowerCase().includes(termo) ||
      preDefesa.status.toLowerCase().includes(termo)
    );
  }

  // Redireciona para a página de edição da pré-defesa
  editarPreDefesa(preDefesaId: string): void {
    this.router.navigate(['/pre-defesas/editar', preDefesaId]);
  }

  // Redireciona para a página de detalhes da pré-defesa
  detalharPreDefesa(preDefesaId: string): void {
    this.router.navigate(['/pre-defesas/detalhes', preDefesaId]);
  }
}
