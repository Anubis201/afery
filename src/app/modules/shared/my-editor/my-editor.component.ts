import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-editor',
  templateUrl: './my-editor.component.html',
  styleUrls: ['./my-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyEditorComponent {
  @Input() control: FormControl

}
