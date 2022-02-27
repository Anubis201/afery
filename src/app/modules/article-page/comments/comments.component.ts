import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Input() comments: CommentModel[] = []
  @Input() isAdmin: boolean
  @Input() userName: string

  @Output() deleteComment = new EventEmitter<string>()
}
