import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="input-form">
      <span class="form-field__label">{{ label }}</span>
      <ng-content></ng-content>
    </label>
  `,
  styleUrls: ['./input.component.css'],
})
export class InputFormComponent {
  @Input() label = '';
}
