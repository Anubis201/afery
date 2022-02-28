import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';

@Component({
  selector: 'app-write-chat',
  templateUrl: './write-chat.component.html',
  styleUrls: ['./write-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteChatComponent {
  @Output() handleAddText = new EventEmitter<Partial<ChatTextModel>>()

  readonly commentLength = 5000

  form = new FormGroup({
    text: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })

  addText() {
    this.handleAddText.emit({ text: this.form.get('text').value, date: new Date() });
    this.form.get('text').patchValue('');
  }
}
