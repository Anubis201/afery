import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  addArticle(data: ArticleModel) {
    return this.firestore.collection('banned').doc().set(data)
  }
}
