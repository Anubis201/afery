import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { LoginComponent } from 'src/app/modules/shared/login/login.component';

@Component({
  selector: 'app-write-chat',
  templateUrl: './write-chat.component.html',
  styleUrls: ['./write-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteChatComponent {
  @Input() isSaving: boolean
  @Input() isLogin: boolean
  @Input() isCheckingLogin: boolean

  @Output() handleAddText = new EventEmitter<Partial<ChatTextModel>>()

  constructor(
    private dialog: MatDialog
  ) {}

  readonly commentLength = 5000

  form = new FormGroup({
    text: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })

  addText() {
    this.handleAddText.emit({ text: this.form.get('text').value, date: new Date() });
    this.form.get('text').patchValue('');
  }

  openSingIn() {
    this.dialog.open(LoginComponent);
  }
}
