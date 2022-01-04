import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Input() comments: CommentModel[] = []
}
