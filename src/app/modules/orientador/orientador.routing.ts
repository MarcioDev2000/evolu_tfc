import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { VerMonografiaComponent } from "./ver-monografia/ver-monografia.component";


export const ORIENTADOR_ROUTES: Routes = [
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
        path: 'monografias',
        component: VerMonografiaComponent
      },

    ]
  }
];
