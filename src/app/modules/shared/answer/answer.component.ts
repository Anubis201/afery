import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() data: CommentModel
  @Input() isAdmin: boolean

  @Output() deleteAnswer = new EventEmitter<string>()
}
