import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistarComponent } from './shared/components/registar/registar.component';
import { ForgetSenhaComponent } from './shared/components/forget-senha/forget-senha.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path : 'registar',
    component: RegistarComponent
  },
  {
    path : 'esqueceu-senha',
    component: ForgetSenhaComponent
  },
  {
    path : 'repor-password',
    component: ResetPasswordComponent
  },
  {
    path : 'dashboard',
    component: DashboardComponent
  },
  {
    path : 'aluno',
    loadChildren:() =>import('./modules/aluno/aluno.module').then((m)=> m.AlunoModule)
  },
  {
    path : 'orientador',
    loadChildren:() =>import('./modules/orientador/orientador.module').then((m)=> m.OrientadorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
