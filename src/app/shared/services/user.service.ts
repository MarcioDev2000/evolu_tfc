import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user/user.model';
import { TipoUsuario } from '../model/user/TipoUsuario.enum';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject = new BehaviorSubject<any>(null);
  user$ = this._userSubject.asObservable();

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      this._userSubject.next(userData);
    }
  }


  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  private handleLoginResponse(response: any): void {
    this._userSubject.next(response);
    this.storeUserData(response);
  }

  private handleError(error: any, errorMessage: string): Observable<never> {
    Swal.fire('Erro', errorMessage, 'error');
    this.logout();
    return throwError(error);
  }

  private storeUserData(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
    localStorage.setItem('tipo_de_entidade_id', response.tipo_de_entidade_id);
  }

  create(user: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/usuarios/`, user).pipe(
      catchError(error => {
        let errorMessage = 'Erro ao criar usuário.';
        if (error.error && error.error.email) {
          errorMessage = error.error.email[0];
        }
        return this.handleError(error, errorMessage);
      })
    );
  }


  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.API_URL}/auth/login/`, user, { headers }).pipe(
      tap(response => this.handleLoginResponse(response)),
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    this._userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getMenu(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/menus/?id_do_usuario=` + id);
  }


  getTipoUsuarios(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(`${environment.API_URL}/tipos-usuario/`);
  }

  forgotPassword(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.API_URL}/auth/email-redefinir-palavra-passe/`, user, { headers })
    .pipe(
      catchError(error => {
        if (error.error.email && error.error.email[0] === "Este email não está registrado no banco de dados.") {
          Swal.fire('Erro', 'Este email não está registrado.', 'error');
        } else {
          Swal.fire('Erro', 'Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.', 'error');
        }
        return throwError(error);
      })
    );
  }


  resetPassword(uidb64: string, token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      uidb64: uidb64,
      token: token,
      password1: newPassword,
      password2: confirmPassword
    };

    return this.http.post(`${environment.API_URL}/auth/reset-password/`, payload, { headers }) // Corrigido para /auth/reset-password/
      .pipe(
        catchError(error => {
          Swal.fire('Erro', 'Ocorreu um erro ao redefinir a senha.', 'error');
          return throwError(error);
        })
      );
  }



  getUserType(): string | null {
    const user = this._userSubject.value;
    if (user && user.tipo_de_entidade) {
      return user.tipo_de_entidade;
    }
    return null;
  }

  Usuario(usuarioId: number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/usuarios/${usuarioId}/`).pipe(
      catchError(error => {
        // Tratar o erro conforme necessário, por exemplo:
        console.error('Ocorreu um erro ao obter os dados do usuário:', error);
        return throwError(error);
      })
    );
  }

  updateUser(id: number, user: any){
    return this.http.put(`${environment.API_URL}/usuario/${id}/`, user);
  }


  getEspecialidades(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/especialidades/`).pipe(
      catchError(error => {
        console.error('Erro ao buscar especialidades:', error);
        return throwError(error);
      })
    );
  }

  getUsuarioPorId(usuarioId: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/usuarios/${usuarioId}/`).pipe(
      catchError(error => {
        console.error('Erro ao obter usuário:', error);
        return throwError(error);
      })
    );
  }

  getAlunosPorOrientador(orientadorId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/orientadores/${orientadorId}/alunos`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar alunos do orientador:', error);
        this.showMessage('Erro ao carregar alunos.');
        return throwError(error);
      })
    );
  }

  listarTodosAlunos(adminId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/usuarios/alunos?adminId=${adminId}`).pipe(
      catchError((error) => {
        console.error('Erro ao listar todos os alunos:', error);
        this.showMessage('Erro ao carregar alunos.');
        return throwError(error);
      })
    );
  }

  listarTodosOrientadores(adminId: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/usuarios/orientadores?adminId=${adminId}`).pipe(
      catchError((error) => {
        console.error('Erro ao listar todos os orientadores:', error);
        this.showMessage('Erro ao carregar orientadores.');
        return throwError(error);
      })
    );
  }


}
