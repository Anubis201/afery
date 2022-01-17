import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';

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

  getComments(articleId: string) {
    return from(this.getRef().ref.where('articleId', '==', articleId).get())
  }

  getAdminAllComments() {
    return from(this.getRef().get())
  }

  deteleComment(articleId: string) {
    return from(this.getRef().doc(articleId).delete())
  }
}
