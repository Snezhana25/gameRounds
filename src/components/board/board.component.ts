import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgameField } from '../../models/game.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() gameField: IgameField[] = [];
  @Output() fieldClick = new EventEmitter<number>();

  onFieldClick(index: number): void {
    this.fieldClick.emit(index);
  }
}
