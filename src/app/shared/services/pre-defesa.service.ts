import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PreDefesaService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  // Exibe uma mensagem usando o MatSnackBar
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getEspecialidades(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/especialidades/`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar especialidades:', error);
        return throwError(error);
      })
    );
  }

  // Obtém a lista de orientadores por especialidade
  getOrientadoresPorEspecialidade(especialidadeId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/orientadores/especialidade/${especialidadeId}`).pipe(
      tap(() => this.showMessage('Orientadores carregados com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar orientadores:', error);
        this.showMessage('Erro ao carregar orientadores.');
        return throwError(error);
      })
    );
  }

  criarPreDefesa(
    monografiaId: string,
    presidenteId: string,
    vogalId: string,
    dataInicio: string,
    dataFim: string,
    descricao?: string
  ): Observable<any> { // Usando `any` em vez de `PreDefesaDTO`
    const params = new HttpParams()
      .set('monografiaId', monografiaId)
      .set('presidenteId', presidenteId)
      .set('vogalId', vogalId)
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim)
      .set('descricao', descricao || ''); // Descrição é opcional

    return this.http.post<any>(`${environment.API_URL}/pre-defesas`, null, { params }).pipe(
      tap(() => {
        this.showMessage('Pré-defesa criada com sucesso!');
        this.router.navigate(['/pre-defesas']); // Redireciona para a lista de pré-defesas
      }),
      catchError(error => {
        console.error('Erro ao criar pré-defesa:', error);
        this.showMessage('Erro ao criar pré-defesa. Tente novamente.');
        return throwError(error);
      })
    );
  }
}