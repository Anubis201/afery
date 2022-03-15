import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { catchError, from, map, switchMap, throwError } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { CommentsType } from 'src/app/models/others/comments.type';
import { UserDetailsService } from '../user-details/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private firestore: AngularFirestore,
    private userDetailsService: UserDetailsService,
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

    let query: Promise<QuerySnapshot<unknown>>

    if (pollsOrArticles === 'articles')
      query =  ref.where('articleId', '==', parentId).get();
    else
      query = ref.where('pollId', '==', parentId).get();

    // uzupelnienia nazwy i avatara
    return from(query).pipe(
      switchMap(docs => {
        docs.forEach(doc => {
          const data =  doc.data() as CommentModel;
          this.userDetailsService.getDetails(data.authorId).pipe(

          )
        })
        return []
      })
    )
  }

  getAnswers(commentId: string) {
    return from(this.getRef().ref.where('commentId', '==', commentId).orderBy('date', 'desc').get())
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

  updateComment(id: string, data: Partial<CommentModel>) {
    return from(this.getRef().doc(id).update(data))
  }

  removeAnswers(commentId: string) {
    return this.getAnswers(commentId).pipe(
      map(comments => {
        const batch = this.firestore.firestore.batch();

        comments.forEach(doc => batch.delete(doc.ref));

        return from(batch.commit());
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  getCommentsCountArticle(parentId: string) {
    return from(this.getRef().ref.where('isAnswer', '==', false).where('articleId', '==', parentId).get())
  }
}
