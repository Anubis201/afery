import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  addArticle(data: ArticleModel) {
    return from(this.firestore.collection('articles').add(data))
  }

  getArticles(type: ArticlesTypesEnum, limit: number) {
    const ref = this.firestore.collection('articles').ref

    return from(ref.where('type', '==', type).limit(limit).get())
  }
}
