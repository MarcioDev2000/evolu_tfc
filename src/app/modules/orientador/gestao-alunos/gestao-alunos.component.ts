import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-gestao-alunos',
  templateUrl: './gestao-alunos.component.html',
  styleUrls: ['./gestao-alunos.component.scss']
})
export class GestaoAlunosComponent implements OnInit {
  alunos: any[] = []; // Lista completa de alunos
  alunosFiltrados: any[] = []; // Lista de alunos filtrados
  filtro: string = ''; // Variável para armazenar o valor do filtro

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const orientadorId = userData.id;
      this.carregarAlunos(orientadorId);
    }
  }

  openSnackBar(title: string, message: string, panelClass: string): void {
    this.snackBar.open(message, title, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }

  carregarAlunos(orientadorId: string): void {
    this.userService.getAlunosPorOrientador(orientadorId).pipe(
      catchError((error) => {
        console.error('Erro ao buscar alunos do orientador:', error);
        this.openSnackBar('Erro', 'Erro ao carregar alunos.', 'error-snackbar');
        throw error;
      })
    ).subscribe((alunos) => {
      this.alunos = alunos; // Armazena a lista completa de alunos
      this.alunosFiltrados = alunos; // Inicialmente, a lista filtrada é igual à lista completa
    });
  }

  // Método para aplicar o filtro
  applyFilter(): void {
    if (!this.filtro) {
      this.alunosFiltrados = this.alunos; // Se o filtro estiver vazio, mostra todos os alunos
      return;
    }

    // Filtra os alunos com base no valor do filtro
    this.alunosFiltrados = this.alunos.filter((aluno) => {
      return (
        aluno.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        aluno.sobrenome.toLowerCase().includes(this.filtro.toLowerCase()) ||
        aluno.email.toLowerCase().includes(this.filtro.toLowerCase()) ||
        aluno.matricula.toLowerCase().includes(this.filtro.toLowerCase())
      );
    });
  }
}
