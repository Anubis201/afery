import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

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

  addComents() {
    return from(this.getRef())
  }
}
