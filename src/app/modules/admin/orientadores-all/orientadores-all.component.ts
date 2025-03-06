import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-orientadores-all',
  templateUrl: './orientadores-all.component.html',
  styleUrls: ['./orientadores-all.component.scss']
})
export class OrientadoresAllComponent implements OnInit {
  orientadores: any[] = []; // Lista completa de orientadores
  orientadoresFiltrados: any[] = []; // Lista de orientadores filtrados
  filtro: string = ''; // Variável para armazenar o valor do filtro

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarOrientadores();
  }

  // Método para carregar orientadores
  carregarOrientadores(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const adminId = userData.id;

      this.userService.listarTodosOrientadores(adminId).pipe(
        catchError((error) => {
          console.error('Erro ao buscar orientadores:', error);
          this.openSnackBar('Erro', 'Erro ao carregar orientadores.', 'error-snackbar');
          throw error;
        })
      ).subscribe((orientadores) => {
        this.orientadores = orientadores; // Armazena a lista completa de orientadores
        this.orientadoresFiltrados = orientadores; // Inicialmente, a lista filtrada é igual à lista completa
      });
    }
  }

  // Método para aplicar o filtro
  applyFilter(): void {
    if (!this.filtro) {
      this.orientadoresFiltrados = this.orientadores; // Se o filtro estiver vazio, mostra todos os orientadores
      return;
    }

    // Filtra os orientadores com base no valor do filtro
    this.orientadoresFiltrados = this.orientadores.filter((orientador) => {
      return (
        orientador.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        orientador.sobrenome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        orientador.email.toLowerCase().includes(this.filtro.toLowerCase()) ||
        orientador.especialidade.toLowerCase().includes(this.filtro.toLowerCase())
      );
    });
  }

  // Método para exibir mensagens (snackbar)
  openSnackBar(title: string, message: string, panelClass: string): void {
    this.snackBar.open(message, title, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
}
