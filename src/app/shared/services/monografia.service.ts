import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MonografiaService {
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

  // Obtém a lista de cursos
getCursos(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.API_URL}/monografias/cursos`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar cursos:', error);
      return throwError(error);
    })
  );
}

// Obtém a lista de especialidades por curso
getEspecialidadesPorCurso(cursoId: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.API_URL}/monografias/cursos/${cursoId}/especialidades`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar especialidades:', error);
      return throwError(error);
    })
  );
}

  // Obtém a lista de especialidades
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


  // Cria uma nova monografia
  createMonografia(formData: FormData): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/monografias/create/`, formData)
      .pipe(
        tap(() => {
          this.showMessage('Monografia criada com sucesso!');
          this.router.navigate(['/monografias']);
        }),
        catchError((error) => {
          console.error('Erro ao criar monografia:', error);
          return throwError(error);
        })
      );
  }

  // Atualiza uma monografia existente
  updateMonografia(
    id: string,
    formData: FormData
  ): Observable<any> {
    return this.http
      .put<any>(`${environment.API_URL}/monografias/${id}`, formData)
      .pipe(
        tap(() => {
          this.showMessage('Monografia atualizada com sucesso!');
          this.router.navigate(['/monografias']);
        }),
        catchError((error) => {
          console.error('Erro ao atualizar monografia:', error);
          return throwError(error);
        })
      );
  }


  reviewMonografia(
    monografiaId: string,
    novoStatus: string,
    descricao: string,
    orientadorId: string
  ): Observable<any> {
    // Cria os parâmetros de consulta
    const params = new HttpParams()
      .set('novoStatus', novoStatus)
      .set('descricao', descricao)
      .set('orientadorId', orientadorId);

    // Faz a requisição PUT com os parâmetros de consulta
    return this.http
      .put<any>(
        `${environment.API_URL}/monografias/${monografiaId}/revisao-orientador`,
        null, // O corpo da requisição é null, pois os dados estão nos parâmetros
        { params }
      )
      .pipe(
        tap(() => {
          console.log('Revisão do orientador realizada com sucesso!');
        }),
        catchError((error) => {
          console.error('Erro ao revisar monografia:', error);
          return throwError(error);
        })
      );
  }

  // Obter detalhes de uma monografia pelo ID do aluno
getMonografiaByAlunoId(alunoId: string): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}/monografias/aluno/${alunoId}`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar monografia do aluno:', error);
      return throwError(error);
    })
  );
}

  // Revisão do admin
  adminReviewMonografia(
    monografiaId: string,
    novoStatus: string,
    descricao: string,
    adminId: string
  ): Observable<any> {
    const params = new HttpParams()
    .set('novoStatus', novoStatus)
    .set('descricao', descricao)
    .set('adminId', adminId);


    return this.http
      .put<any>(
        `${environment.API_URL}/monografias/${monografiaId}/revisao-admin`,
        null, // O corpo da requisição é null, pois os dados estão nos parâmetros
        { params }
      )
      .pipe(
        tap(() => {
          this.showMessage('Revisão do admin realizada com sucesso!');
        }),
        catchError((error) => {
          console.error('Erro ao revisar monografia:', error);
          return throwError(error);
        })
      );
  }
  // Lista monografias aprovadas para revisão do admin
  getMonografiasAprovadasPorAdmin(adminId: string): Observable<any> {
    const params = new HttpParams().set('adminId', adminId);

    return this.http
      .get<any>(`${environment.API_URL}/monografias/aprovadas`, { params })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar monografias aprovadas pelo admin:', error);
          this.showMessage('Erro ao carregar monografias aprovadas.');
          return throwError(error);
        })
      );
  }


  // Baixar ou visualizar documentos da monografia
  getDocumento(
    monografiaId: string,
    tipoDocumento: string,
    acao: string = 'visualizar'
  ): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/monografias/${monografiaId}/documento`, {
        params: { tipoDocumento, acao },
        responseType: 'blob',
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar documento:', error);
          return throwError(error);
        })
      );
  }

  // Listar monografias de um orientador específico
  getMonografiasPorOrientador(orientadorId: string): Observable<any> {
    return this.http
      .get<any>(
        `${environment.API_URL}/monografias/orientador/${orientadorId}`
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar monografias do orientador:', error);
          return throwError(error);
        })
      );
  }

  // Obter detalhes de uma monografia pelo ID
  getMonografiaById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/monografias/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar monografia:', error);
        return throwError(error);
      })
    );
  }


getEstatisticasAluno(alunoId: string): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}/monografias/aluno/${alunoId}/estatisticas`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar estatísticas do aluno:', error);
      return throwError(error);
    })
  );
}

GetEstatisticasAdmin(adminId: string): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}/monografias/admin/estatisticas`, {
    params: { adminId }
  }).pipe(
    catchError((error) => {
      console.error('Erro ao buscar estatísticas do admin:', error);
      return throwError(error);
    })
  );
}



getEstatisticasStatusPorAlunoId(alunoId: string): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>(`${environment.API_URL}/monografias/aluno/${alunoId}/estatisticas-status`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar estatísticas de status do aluno:', error);
      return throwError(error);
    })
  );
}

getEstatisticasPorOrientador(orientadorId: string): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}/monografias/orientador/${orientadorId}/estatisticas`).pipe(
    catchError((error) => {
      console.error('Erro ao buscar estatísticas do orientador:', error);
      return throwError(error);
    })
  );
}


  // Visualizar documento específico de uma monografia
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

// Visualizar extrato bancário de uma monografia
visualizarExtratoBancario(id: string): Observable<Blob> {
  return this.http.get(`${environment.API_URL}/monografias/${id}/documentos/extrato_bancario/visualizar`, {
    responseType: 'blob' // Para receber o arquivo como um Blob
  }).pipe(
    catchError((error) => {
      console.error('Erro ao visualizar extrato bancário:', error);
      return throwError(error);
    })
  );
}


getMonografiaByOrientadorId(orientadorId: string, monografiaId: string): Observable<any> {
  return this.http.get<any>(
    `${environment.API_URL}/monografias/orientador/${orientadorId}/monografias/${monografiaId}`
  ).pipe(
    catchError((error) => {
      console.error('Erro ao buscar monografia:', error);
      this.showMessage('Erro ao carregar monografia.');
      return throwError(error);
    })
  );
}

// Obtém uma monografia aprovada pelo admin
getMonografiaAprovadaPorAdmin(adminId: string, monografiaId: string): Observable<any> {
  const params = new HttpParams()
    .set('adminId', adminId);

  return this.http
    .get<any>(`${environment.API_URL}/monografias/aprovadas/${adminId}/${monografiaId}`, { params })
    .pipe(
      catchError((error) => {
        console.error('Erro ao buscar monografia aprovada pelo admin:', error);
        this.showMessage('Erro ao carregar monografia aprovada.');
        return throwError(error);
      })
    );
}

}
