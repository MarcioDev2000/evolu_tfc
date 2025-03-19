import { Routes } from "@angular/router";
import { EstatisticaComponent } from "./estatistica/estatistica.component";
import { DashboardComponent } from "src/app/shared/components/dashboard/dashboard.component";
import { VerMonografiaComponent } from "./ver-monografia/ver-monografia.component";
import { GestaoAlunosComponent } from "./gestao-alunos/gestao-alunos.component";
import { DetalhesAlunosComponent } from "./detalhes-alunos/detalhes-alunos.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ListPreDefesaComponent } from "./list-pre-defesa/list-pre-defesa.component";
import { MonografiaEMPREDEFESAComponent } from "./monografia-em-pre-defesa/monografia-em-pre-defesa.component";
import { DetalheMonografiaPreDefesaComponent } from "./detalhe-monografia-pre-defesa/detalhe-monografia-pre-defesa.component";
import { DetalheMarcacaoDefesaComponent } from "./detalhe-marcacao-defesa/detalhe-marcacao-defesa.component";


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
      {
        path: 'alunos',
        component: GestaoAlunosComponent
      },
      {
        path: 'detalhe-monografia/:id',
        component: DetalhesAlunosComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'calendario',
        component: ListPreDefesaComponent
      },
      {
        path: 'pre-defesa',
        component: MonografiaEMPREDEFESAComponent
      },
      {
        path: 'pre-defesaDetalhe/:id',
        component: DetalheMonografiaPreDefesaComponent
      },
      {
        path: 'defesa',
        component: DetalheMarcacaoDefesaComponent
      },
    ]
  }
];
