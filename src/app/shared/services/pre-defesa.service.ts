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

  listarPreDefesasPorUsuario(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/pre-defesas/usuario/${usuarioId}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar pré-defesas do usuário:', error);
        this.showMessage('Erro ao carregar pré-defesas do usuário.');
        return throwError(error);
      })
    );
  }

  listarMonografiasEmPreDefesaStatus(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/pre-defesas/monografias-em-pre-defesa/${usuarioId}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar monografias em pré-defesa:', error);
        this.showMessage('Erro ao carregar monografias em pré-defesa.');
        return throwError(error);
      })
    );
  }

  listarTodasPreDefesas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/pre-defesas/admin`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar todas as pré-defesas:', error);
        this.showMessage('Erro ao carregar todas as pré-defesas.');
        return throwError(error);
      })
    );
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

  listarPreDefesasPorStatus(status?: string): Observable<any[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<any[]>(`${environment.API_URL}/pre-defesas`, { params }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar pré-defesas:', error);
        this.showMessage('Erro ao carregar pré-defesas.');
        return throwError(error);
      })
    );
  }

  // No arquivo PreDefesaService (Angular)
getOrientadorPorId(orientadorId: string): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}/orientadores/${orientadorId}`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar orientador:', error);
      this.showMessage('Erro ao carregar orientador.');
      return throwError(error);
    })
  );
}

  buscarPreDefesaPorId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/pre-defesas/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar pré-defesa por ID:', error);
        this.showMessage('Erro ao carregar os detalhes da pré-defesa.');
        return throwError(error);
      })
    );
  }

  atualizarStatusPreDefesa(
    preDefesaId: string,
    status: string,
    usuarioId: string,
    descricao?: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('status', status)
      .set('usuarioId', usuarioId)
      .set('descricao', descricao || ''); // Descrição é opcional

    return this.http.put<any>(`${environment.API_URL}/pre-defesas/${preDefesaId}/status`, null, { params }).pipe(
      tap(() => {
        this.showMessage('Status da pré-defesa atualizado com sucesso!');
      }),
      catchError(error => {
        console.error('Erro ao atualizar status da pré-defesa:', error);
        this.showMessage('Erro ao atualizar status da pré-defesa. Tente novamente.');
        return throwError(error);
      })
    );
  }
  listarPreDefesasComStatusPreMonografia(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/pre-defesas/preDefesaStatusmonografia/${usuarioId}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar pré-defesas com status da monografia EM_PRE_DEFESA:', error);
        this.showMessage('Erro ao carregar pré-defesas com status da monografia EM_PRE_DEFESA.');
        return throwError(error);
      })
    );
  }

  detalharPreDefesaPorIdEUsuario(preDefesaId: string, usuarioId: string): Observable<any> {
    const params = new HttpParams().set('usuarioId', usuarioId);

    return this.http.get<any>(`${environment.API_URL}/pre-defesas/${preDefesaId}/detalhes`, { params }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar detalhes da pré-defesa:', error);
        this.showMessage('Erro ao carregar detalhes da pré-defesa.');
        return throwError(error);
      })
    );
  }

  visualizarDocumento(id: string, tipoDocumento: string): Observable<Blob> {
    return this.http.get(`${environment.API_URL}/monografias/${id}/documentos/${tipoDocumento}/visualizar`, {
      responseType: 'blob' // Para receber o arquivo como um Blob
    }).pipe(
      catchError((error) => {
        console.error('Erro ao visualizar documento:', error);
        return throwError(error);
      })
    );
  }


}
