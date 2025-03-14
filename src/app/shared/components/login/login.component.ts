import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.redirectToUserPage(userData);
    }
  }

  // Método para exibir a Snackbar
  openSnackBar(title: string, message: string, panelClass: string): void {
    this.snackBar.open(message, title, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }

  login(): void {
    if (!this.user.email || !this.user.password) {
        Swal.fire('Erro', 'Email e senha são campos obrigatórios.', 'error');
        return;
    }

    this.userService.login(this.user).pipe(
        catchError((error) => {
            if (error.status === 401 && error.error.message === "Credenciais inválidas") {
                this.openSnackBar('Erro', 'Senha incorreta. Verifique e tente novamente.', 'error');
            } else if (error.status === 403 && error.error.message === "Sua conta ainda não foi ativada. Entre em contato com o administrador.") {
                this.openSnackBar('Erro', 'Sua conta ainda não foi ativada. Entre em contato com o administrador.', 'error');
            } else {
                this.openSnackBar('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.', 'error');
            }
            return throwError(error); 
        })
    ).subscribe(response => {
        // Armazenar dados no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('tipo_de_entidade_id', response.tipo_de_entidade_id);
        this.redirectToUserPage(response);
    });
}

  private redirectToUserPage(userData: any): void {
    this.router.navigate([userData.rota]);
  }
}
