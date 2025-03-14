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
      }

    ]
  }
];
