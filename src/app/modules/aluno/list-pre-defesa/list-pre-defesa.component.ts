import { Component, OnInit } from '@angular/core';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pre-defesa',
  templateUrl: './list-pre-defesa.component.html',
  styleUrls: ['./list-pre-defesa.component.scss']
})
export class ListPreDefesaComponent implements OnInit {
  preDefesas: any[] = []; // Array to store pre-defenses
  isLoading: boolean = true; // Loading state

  constructor(
    private predefesaService: PreDefesaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPreDefesas();
  }

  loadPreDefesas(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.id; // Get the user ID from local storage

      // Fetch pre-defenses for the user
      this.predefesaService.listarPreDefesasPorUsuario(usuarioId).subscribe(
        (data) => {
          this.preDefesas = data; // Assign the fetched data to the preDefesas array
          this.isLoading = false; // Disable loading state
        },
        (error) => {
          console.error('Erro ao carregar pré-defesas:', error);
          Swal.fire('Erro', 'Não foi possível carregar as pré-defesas.', 'error');
          this.isLoading = false; // Disable loading state
        }
      );
    } else {
      Swal.fire('Erro', 'Usuário não encontrado.', 'error');
      this.isLoading = false; // Disable loading state
    }
  }
}
