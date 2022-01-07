import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { increment } from 'firebase/firestore';

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

  getArticles(type: ArticlesTypesEnum, limit: number) {
    const ref = this.firestore.collection('articles').ref

    return from(ref.where('type', '==', type).orderBy('createDate', 'desc').limit(limit).get())
  }

  getArticle(docId: string) {
    return this.firestore.collection('articles').doc(docId).get()
  }

  updateViewershipArticle(docId: string) {
    return from(this.firestore.collection('articles').doc(docId).update({ viewership: increment(1) }))
  }
}
