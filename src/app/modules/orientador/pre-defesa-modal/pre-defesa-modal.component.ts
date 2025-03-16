import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreDefesaService } from 'src/app/shared/services/pre-defesa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-defesa-modal',
  templateUrl: './pre-defesa-modal.component.html',
  styleUrls: ['./pre-defesa-modal.component.scss']
})
export class PreDefesaModalComponent {
  @Input() preDefesa: any; // Pré-defesa selecionada
  @Output() atualizacaoConcluida = new EventEmitter<void>();

  novoStatus: string = ''; // Novo status selecionado
  descricao: string = ''; // Descrição da atualização

  constructor(
    public activeModal: NgbActiveModal,
    private preDefesaService: PreDefesaService
  ) {}

  salvarAtualizacao(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const usuarioId = userData.id;

      this.preDefesaService
        .atualizarStatusPreDefesa(
          this.preDefesa.id,
          this.novoStatus,
          usuarioId,
          this.descricao
        )
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Status da pré-defesa atualizado com sucesso!', 'success');
            this.activeModal.close(); // Fecha o modal
            this.atualizacaoConcluida.emit(); // Notifica o componente pai
          },
          error: (error) => {
            console.error('Erro ao atualizar status da pré-defesa:', error);
            Swal.fire('Erro', 'Não foi possível atualizar o status da pré-defesa.', 'error');
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não está logado. Redirecionando para login...', 'error');
      this.activeModal.close();
    }
  }
}
