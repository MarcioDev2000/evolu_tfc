import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { AlunosAllComponent } from "./alunos-all/alunos-all.component";
import { OrientadoresAllComponent } from "./orientadores-all/orientadores-all.component";
import { MonografiaAllComponent } from "./monografia-all/monografia-all.component";
import { DetalheAlunoComponent } from "./detalhe-aluno/detalhe-aluno.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { PreDefesaComponent } from "./pre-defesa/pre-defesa.component";
import { DetalheMarcarPreDefesaComponent } from "./detalhe-marcar-pre-defesa/detalhe-marcar-pre-defesa.component";
import { ListPredefesaComponent } from "./list-predefesa/list-predefesa.component";
import { ListUsersComponent } from "./list-users/list-users.component";
import { MonografiaEMPREDEFESAComponent } from "./monografia-empredefesa/monografia-empredefesa.component";
import { MarcarDefesaComponent } from "./marcar-defesa/marcar-defesa.component";
import { DetalheDefesaComponent } from "./detalhe-defesa/detalhe-defesa.component";
import { DefesaMarcadaComponent } from "./defesa-marcada/defesa-marcada.component";
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: EstatisticaComponent
      },
      {
        path: 'alunos',
        component: AlunosAllComponent
      },
      {
        path: 'orientadores',
        component: OrientadoresAllComponent
      },
      {
        path: 'monografias',
        component: MonografiaAllComponent
      },

      {
        path: 'calendario',
        component: ListPredefesaComponent
      },
      {
        path: 'detalhe-monografia/:id',
        component: DetalheAlunoComponent
      },
      {
        path: 'detalhe-marcarPreDefesa/:id',
        component: DetalheMarcarPreDefesaComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'pre-defesa/:id',
        component: PreDefesaComponent
      },
      {
        path: 'marcar-defesa/:id',
        component: MarcarDefesaComponent
      },

      {
        path: 'user-inativos',
        component: ListUsersComponent
      },
       {
         path: 'pre-defesa',
        component: MonografiaEMPREDEFESAComponent
       },

      {
        path: 'defesa',
       component: DefesaMarcadaComponent
      },
       {
        path: 'detalhe-defesa',
        component: DetalheDefesaComponent
       }

    ]
  }
];
