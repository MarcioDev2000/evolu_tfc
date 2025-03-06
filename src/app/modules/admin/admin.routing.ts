import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { AlunosAllComponent } from "./alunos-all/alunos-all.component";
import { OrientadoresAllComponent } from "./orientadores-all/orientadores-all.component";
import { MonografiaAllComponent } from "./monografia-all/monografia-all.component";

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

    ]
  }
];
