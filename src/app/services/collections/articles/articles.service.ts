import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { increment } from 'firebase/firestore';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getRef() {
    return this.firestore.collection('articles');
  }

  addArticle(data: ArticleModel, ref: DocumentReference<unknown>) {
    return from(ref.set(data))
  }

  editArticle(data: Partial<ArticleModel>, id: string) {
    return from(this.getRef().doc(id).update(data))
  }

  getArticles(type: ArticlesTypesEnum, limit: number, order: OrderEnum, lastItem: null | any) {
    const ref = this.firestore.collection('articles').ref
      .where('type', '==', type)
      .orderBy(order === OrderEnum.Latest ? 'createDate' : 'viewership', 'desc')
      .limit(limit)

    if (lastItem === null) return from(ref.get())

    else return from(ref.startAt(lastItem).get())
  }

  getFirstTOPArticle() {
    return from(this.firestore.collection('articles').ref.where('isFirstArticle', '==', true).get())
  }

  getArticle(docId: string) {
    return this.firestore.collection('articles').doc(docId).get()
  }

  getNextArticle(date: Date) {
    return from(this.firestore.collection('articles').ref.orderBy('createDate').startAfter(date).limit(1).get())
  }

  updateViewershipArticle(docId: string) {
    return from(this.firestore.collection('articles').doc(docId).update({ viewership: increment(1) }))
  }

  deleteArticle(docId: string) {
    return from(this.firestore.collection('articles').doc(docId).delete())
  }

  updateDislikes(articleId: string, incrementValue: number) {
    return from(this.getRef().doc(articleId).update({ dislikes: increment(incrementValue) }))
  }

  updateLikes(articleId: string, incrementValue: number) {
    return from(this.getRef().doc(articleId).update({ likes: increment(incrementValue) }))
  }

  likeQuery(searched: string) {
    return from(this.getRef().ref.orderBy('title').startAt(searched).endAt(searched + '\uf8ff').get())
  }

  getArticlesByTagName(tag: string) {
    return from(this.getRef().ref.where('tags', 'array-contains-any', [tag]).orderBy('createDate', 'desc').get());
  }
}
