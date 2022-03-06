import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from 'firebase/firestore';
import { from } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { CommentsType } from 'src/app/models/others/comments.type';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getRef() {
    return this.firestore.collection('comments');
  }

  addComment(comment: CommentModel) {
    return from(this.getRef().add(comment))
  }

  getCommentsToDelete(articleId: string) {
    return from(this.getRef().ref.where('articleId', '==', articleId).get())
  }

  getComments(parentId: string, pollsOrArticles: CommentsType, order: OrderEnum = OrderEnum.Latest) {
    const ref = this.getRef().ref
      .where('isAnswer', '==', false)
      .orderBy(order === OrderEnum.Latest ? 'date' : 'likes', 'desc');

    if (pollsOrArticles === 'articles')
      return from(ref.where('articleId', '==', parentId).get());
    else
      return from(ref.where('pollId', '==', parentId).get());
  }

  getAnswers(commentId: string) {
    return from(this.getRef().ref.where('commentId', '==', commentId).get())
  }

  updateDislikes(commentId: string, incrementValue: number) {
    return from(this.getRef().doc(commentId).update({ dislikes: increment(incrementValue) }))
  }

  updateLikes(commentId: string, incrementValue: number) {
    return from(this.getRef().doc(commentId).update({ likes: increment(incrementValue) }))
  }

  getAdminAllComments() {
    return from(this.getRef().get())
  }

  getAdminNumberOfNewComments()  {
    return from(this.getRef().ref.where('isNew', '==', true).get())
  }

  deteleComment(articleId: string) {
    return from(this.getRef().doc(articleId).delete())
  }
}
