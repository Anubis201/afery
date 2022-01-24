import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteCommentComponent {
  @Input() countComment: number | undefined = 0
  @Input() isSavingComment: boolean
  @Input() answerMode: boolean = false

  @Output() addComment = new EventEmitter<CommentModel>()

  readonly nameLength = 50
  readonly commentLength = 1000

  form = new FormGroup({
    name: new FormControl('', [Validators.maxLength(this.nameLength), Validators.required]),
    text: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })

  add() {
    this.addComment.emit({ ...this.form.value, date: new Date() });
    this.form.get('text')?.patchValue('');
  }
}
