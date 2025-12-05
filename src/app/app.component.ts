import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IgameField, IGameStatus, ISettings, TypeState } from '../models/game.model';
import { SETTINGS, INITIAL_GAME_STATUS } from '../constants/constant';
import { BoardComponent } from '../components/board/board.component';
import { ModalComponent } from '../components/modal/modal.component';
import { ButtonComponent } from '../shared/button/button.component';
import { InputFormComponent } from '../shared/input/input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BoardComponent, ModalComponent, ButtonComponent, InputFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {
  settings: ISettings = { ...SETTINGS };
  status: IGameStatus = INITIAL_GAME_STATUS();

  private timerId: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initField();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get totalFields(): number {
    return this.settings.size * this.settings.size;
  }

initField(): void {
  const gameField: IgameField[] = [];
    for (let i = 0; i < this.totalFields; i++) {
      gameField.push({
        index: i,
        state: 'default' as TypeState,
      });
    }
    this.status = {
      ...this.status,
      gameField,
    };
    this.cdr.markForCheck();
  }

  private resetGameState(): void {
    this.status = INITIAL_GAME_STATUS();
    this.initField();
    this.cdr.markForCheck();
  }

  start(): void {
    if (this.status.running) return;
    this.resetGameState();
    this.status = {
      ...this.status,
      running: true,
    };
    this.cdr.markForCheck();
    this.stepRound();
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  stopGame(): void {
  if (!this.status.running) return;

  this.clearTimer();

let newStatus = { ...this.status };

  newStatus.winner =
      newStatus.humanScore > newStatus.computerScore
        ? 'human'
        : newStatus.computerScore > newStatus.humanScore
        ? 'computer'
        : null;

      newStatus.activeFieldIndex = null;
      newStatus.running = false;

    this.status = newStatus;

  this.cdr.markForCheck();
}


private stepRound(): void {
  if (!this.status.running) return;

  let newStatus = { ...this.status };
  let { gameField, activeFieldIndex } = newStatus;

  if (activeFieldIndex !== null) {
    const field = gameField[activeFieldIndex];

    if (field?.state === 'active') {
      gameField = [...gameField];

      gameField[activeFieldIndex] = { ...field, state: 'miss' };

      newStatus.computerScore++;
    }

    newStatus.activeFieldIndex = null;
  }

  newStatus.gameField = gameField;

  const totalPlayed = newStatus.humanScore + newStatus.computerScore;
  if (totalPlayed >= this.settings.gameRounds) {
    newStatus.running = false;

    newStatus.winner =
      newStatus.humanScore > newStatus.computerScore
        ? 'human'
        : newStatus.computerScore > newStatus.humanScore
        ? 'computer'
        : null;

    this.status = newStatus;
    this.clearTimer();
    this.cdr.markForCheck();
    return;
  }

  const availableField = newStatus.gameField.filter(f => f.state === 'default');
  const rand = availableField[Math.floor(Math.random() * availableField.length)];

  newStatus.activeFieldIndex = rand.index;

  newStatus.gameField = newStatus.gameField.map(field =>
    field.index === rand.index ? { ...field, state: 'active' } : field
  );

  this.status = newStatus;
  this.cdr.markForCheck();

  this.clearTimer();
  this.timerId = setTimeout(() => this.stepRound(), this.settings.speed);
}


  handleFieldClick(index: number): void {

    if (!this.status.running) return;

    if (index !== this.status.activeFieldIndex) return;

    this.clearTimer();

    const gameField = this.status.gameField.map((field) =>
      field.index === index ? { ...field, state: 'hit' as TypeState } : field);

    const humanScore = this.status.humanScore + 1;

    this.status = {
      ...this.status,
      gameField,
      humanScore,
      activeFieldIndex: null,
    };
    this.cdr.markForCheck();

    this.stepRound();
  }

  onModalClose(): void {
    this.resetGameState();
  }
}
