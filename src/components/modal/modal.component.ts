import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeWinner } from '../../models/game.model';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() winner: TypeWinner = null;
  @Input() humanScore = 0;
  @Input() computerScore = 0;
  @Output() close = new EventEmitter<void>();

  get winnerMessage(): string {
    if (this.winner === 'human') return 'You win!';
    if (this.winner === 'computer') return 'Computer wins!';
    return 'Game over';
  }
}
