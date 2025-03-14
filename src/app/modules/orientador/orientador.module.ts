import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaComponent } from './estatistica/estatistica.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerMonografiaComponent } from './ver-monografia/ver-monografia.component';
import { ORIENTADOR_ROUTES } from './orientador.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { GestaoAlunosComponent } from './gestao-alunos/gestao-alunos.component';
import { DetalhesAlunosComponent } from './detalhes-alunos/detalhes-alunos.component';
import { ListPreDefesaComponent } from './list-pre-defesa/list-pre-defesa.component';

@NgModule({
  declarations: [
    EstatisticaComponent,
    PerfilComponent,
    VerMonografiaComponent,
    GestaoAlunosComponent,
    DetalhesAlunosComponent,
    ListPreDefesaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ORIENTADOR_ROUTES),
    SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModalModule,
        MatProgressBarModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatButtonModule
  ]
})
export class OrientadorModule { }
