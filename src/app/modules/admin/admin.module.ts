import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaComponent } from './estatistica/estatistica.component';
import { ADMIN_ROUTES } from './admin.routing';
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
import { OrientadoresAllComponent } from './orientadores-all/orientadores-all.component';
import { AlunosAllComponent } from './alunos-all/alunos-all.component';
import { MonografiaAllComponent } from './monografia-all/monografia-all.component';
import { DetalheAlunoComponent } from './detalhe-aluno/detalhe-aluno.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreDefesaComponent } from './pre-defesa/pre-defesa.component';
import { DetalheMarcarPreDefesaComponent } from './detalhe-marcar-pre-defesa/detalhe-marcar-pre-defesa.component';
import { ListPredefesaComponent } from './list-predefesa/list-predefesa.component';


@NgModule({
  declarations: [
    EstatisticaComponent,
    OrientadoresAllComponent,
    AlunosAllComponent,
    MonografiaAllComponent,
    DetalheAlunoComponent,
    PerfilComponent,
    PreDefesaComponent,
    DetalheMarcarPreDefesaComponent,
    ListPredefesaComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild(ADMIN_ROUTES),
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
export class AdminModule { }
