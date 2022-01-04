import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteCommentComponent {
  @Input() countComment: number = 0

  @Output() addComment = new EventEmitter<{ name: string, comment: string }>()

  readonly nameLength = 50
  readonly commentLength = 1000

  form = new FormGroup({
    name: new FormControl('', [Validators.maxLength(this.nameLength), Validators.required]),
    comment: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })

  add() {
    this.addComment.emit(this.form.value);
    this.form.get('comment')?.patchValue('');
  }
}
