import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { AddMonografiaComponent } from "./add-monografia/add-monografia.component";
import { VerMonografiaComponent } from "./ver-monografia/ver-monografia.component";

export const ALUNO_ROUTES: Routes = [
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
        path: 'inscricao-monografia',
        component: VerMonografiaComponent
      },
      {
        path: 'add-monografia',
        component: AddMonografiaComponent
      },

    ]
  }
];
