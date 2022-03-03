import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { UserService } from 'src/app/services/global/user/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteCommentComponent {
  @Input() countComment: number | undefined = 0
  @Input() isSavingComment: boolean
  @Input() answerMode = false
  @Input() disableLabel = false

  @Output() addComment = new EventEmitter<CommentModel>()

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  get isLogin() {
    return this.userService.isLogin
  }

  get isCheckingLogin() {
    return this.userService.isCheckingLogin
  }

  readonly commentLength = 1000

  form = new FormGroup({
    text: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })

  add() {
    this.addComment.emit({ ...this.form.value, date: new Date() });
    this.form.get('text').patchValue('');
  }

  openSingIn() {
    this.dialog.open(LoginComponent);
  }
}
