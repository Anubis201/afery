import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';

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
}
