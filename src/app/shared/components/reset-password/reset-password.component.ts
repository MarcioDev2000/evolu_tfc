import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  uidb64: string = '';
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Captura uidb64 e token da URL
    this.route.queryParams.subscribe(params => {
      this.uidb64 = params['uid'];
      this.token = params['token'];
    });
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('Erro', 'As senhas não coincidem.', 'error');
      return;
    }
    // Envia uidb64, token e a nova senha para redefinir a senha
    this.userService.resetPassword(this.uidb64, this.token, this.newPassword, this.confirmPassword).subscribe(
      () => {
        Swal.fire('Sucesso', 'Senha redefinida com sucesso.', 'success');
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire('Erro', 'Ocorreu um erro ao redefinir a senha.', 'error');
      }
    );
  }
}
