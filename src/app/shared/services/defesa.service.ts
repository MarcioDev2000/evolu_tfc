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
export class DefesaService {

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

  // Marcar uma defesa
  marcarDefesa(preDefesaId: string, dataInicio: string, dataFim: string, presidenteId: string, vogalId: string): Observable<any> {
    const params = new HttpParams()
      .set('preDefesaId', preDefesaId)
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim)
      .set('presidenteId', presidenteId)
      .set('vogalId', vogalId);

    return this.http.post<any>(`${environment.API_URL}/defesas/marcar`, null, { params }).pipe(
      tap(() => this.showMessage('Defesa marcada com sucesso!')),
      catchError((error) => {
        console.error('Erro ao marcar defesa:', error);
        this.showMessage('Erro ao marcar defesa.');
        return throwError(error);
      })
    );
  }

  // Listar defesas por aluno
  listarDefesasPorAluno(alunoId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/defesas/aluno/${alunoId}`).pipe(
      tap(() => this.showMessage('Defesas do aluno carregadas com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar defesas do aluno:', error);
        this.showMessage('Erro ao carregar defesas do aluno.');
        return throwError(error);
      })
    );
  }

  // Listar defesas por orientador
  listarDefesasPorOrientador(orientadorId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/defesas/orientador/${orientadorId}`).pipe(
      tap(() => this.showMessage('Defesas do orientador carregadas com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar defesas do orientador:', error);
        this.showMessage('Erro ao carregar defesas do orientador.');
        return throwError(error);
      })
    );
  }

  // Listar defesas por presidente ou vogal
  listarDefesasPorPresidenteOuVogal(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/defesas/usuario/${usuarioId}`).pipe(
      tap(() => this.showMessage('Defesas do presidente/vogal carregadas com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar defesas do presidente/vogal:', error);
        this.showMessage('Erro ao carregar defesas do presidente/vogal.');
        return throwError(error);
      })
    );
  }

  // Aplicar nota e observação a uma defesa
  aplicarNotaObservacao(defesaId: string, nota: number, observacoes: string, usuarioId: string): Observable<any> {
    const params = new HttpParams()
      .set('nota', nota.toString())
      .set('observacoes', observacoes)
      .set('usuarioId', usuarioId); // Adiciona o usuarioId como parâmetro

    return this.http.put<any>(`${environment.API_URL}/defesas/aplicarNota/${defesaId}`, null, { params }).pipe(
      tap(() => this.showMessage('Nota e observação aplicadas com sucesso!')),
      catchError((error) => {
        console.error('Erro ao aplicar nota e observação:', error);
        this.showMessage('Erro ao aplicar nota e observação.');
        return throwError(error);
      })
    );
  }

  // Métodos existentes
  getEspecialidades(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/especialidades/`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar especialidades:', error);
        return throwError(error);
      })
    );
  }

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

  listarDefesasMarcadasStatus(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/defesas/marcadas/status/${usuarioId}`).pipe(
      tap(() => this.showMessage('Defesas marcadas carregadas com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar defesas marcadas:', error);
        this.showMessage('Erro ao carregar defesas marcadas.');
        return throwError(error);
      })
    );
  }
}
