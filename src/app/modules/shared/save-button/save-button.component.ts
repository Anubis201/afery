import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveButtonComponent {
  @Input() isSaving: boolean
  @Input() color = 'primary'
  @Input() disabled = false

  @Output() onClick = new EventEmitter<void>()
}
