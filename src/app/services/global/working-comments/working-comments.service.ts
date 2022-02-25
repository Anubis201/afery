import { Injectable } from '@angular/core';
import { first, mergeMap, switchMap, tap } from 'rxjs';
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

  extendedAddComment(comment: CommentModel) {
    return this.userService.isLogin.pipe(
      first(),
      mergeMap(isLogin => {
        if (isLogin) {
          return this.commentsService.addComment({ ...comment, name: this.userService.userName.value });
        } else {
            return this.userService.loginAnonymously().pipe(
              switchMap(() => {
                return this.commentsService.addComment({ ...comment, name: this.userService.userName.value })
              }),
              tap(() => this.userService.logout())
            )
        }
      })
    )
  }
}
