import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { AddMonografiaComponent } from "./add-monografia/add-monografia.component";
import { VerMonografiaComponent } from "./ver-monografia/ver-monografia.component";
import { AtualizarMonografiaComponent } from "./atualizar-monografia/atualizar-monografia.component";
import { DetalheMonografiaComponent } from "./detalhe-monografia/detalhe-monografia.component";
import { PerfilComponent } from "./perfil/perfil.component";
export const ALUNO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'estatistica',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'estatistica',
        component: EstatisticaComponent
      },
      {
        path: 'inscricao-monografia',
        component: VerMonografiaComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'add-monografia',
        component: AddMonografiaComponent
      },
      {
        path: 'atualizar-monografia/:id',
        component: AtualizarMonografiaComponent
      },

      {
        path: 'detalhe-monografia/:id',
        component: DetalheMonografiaComponent
      },

    ]
  }
];
