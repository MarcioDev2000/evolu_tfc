import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-senha',
  templateUrl: './forget-senha.component.html',
  styleUrls: ['./forget-senha.component.scss']
})
export class ForgetSenhaComponent implements OnInit {
  recuperarSenhaForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.recuperarSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recuperarSenha(): void {
    if (this.recuperarSenhaForm.invalid) {
      // Formulário inválido, mostrar um alerta de erro.
      Swal.fire('Erro', 'Por favor, preencha o campo de e-mail corretamente.', 'error');
      return;
    }

    const email = this.recuperarSenhaForm.get('email')!.value;
    this.userService.forgotPassword({ email }).subscribe(
      response => {
        Swal.fire('Sucesso', response.message, 'success').then(() => {
          this.router.navigate(['/login']);
        });
      },
      error => {
        // Exibir mensagem de erro para o usuário
        if (error.error && error.error.email && error.error.email[0] === "Este email não está registrado no banco de dados.") {
          Swal.fire('Erro', 'Este email não está registrado.', 'error');
        } else {
          Swal.fire('Erro', 'Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.', 'error');
        }
        console.error(error);
      }
    );
  }
}
