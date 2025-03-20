import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticaComponent } from './estatistica/estatistica.component';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { ALUNO_ROUTES } from './aluno.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddMonografiaComponent } from './add-monografia/add-monografia.component';
import { VerMonografiaComponent } from './ver-monografia/ver-monografia.component';
import { AtualizarMonografiaComponent } from './atualizar-monografia/atualizar-monografia.component';
import { DetalheMonografiaComponent } from './detalhe-monografia/detalhe-monografia.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListPreDefesaComponent } from './list-pre-defesa/list-pre-defesa.component';
import { MonografiaEmPreDefesaComponent } from './monografia-em-pre-defesa/monografia-em-pre-defesa.component';
import { DefesaMarcadaComponent } from './defesa-marcada/defesa-marcada.component';
import { DetalheDefesaComponent } from './detalhe-defesa/detalhe-defesa.component';

@NgModule({
  declarations: [
    EstatisticaComponent,
    AddMonografiaComponent,
    VerMonografiaComponent,
    AtualizarMonografiaComponent,
    DetalheMonografiaComponent,
    PerfilComponent,
    ListPreDefesaComponent,
    MonografiaEmPreDefesaComponent,
    DefesaMarcadaComponent,
    DetalheDefesaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ALUNO_ROUTES),
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
export class AlunoModule { }
