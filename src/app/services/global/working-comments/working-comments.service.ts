import { Injectable } from '@angular/core';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from '../../collections/comments/comments.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class WorkingCommentsService {

  constructor(
    private commentsService: CommentsService,
    private userService: UserService
  ) { }

  addComment(comment: CommentModel) {

    // return this.commentsService.addComment(comment).pipe(

    // )
  }
}
