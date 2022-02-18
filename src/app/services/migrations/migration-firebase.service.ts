import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MigrationFirebaseService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  changeFieldName(base: string, orginalFieldName: string, newFieldName: string) {
    this.firestore.collection(base).get().subscribe({
      next: docs => {
        docs.forEach(doc => {
          if (!doc.data()[orginalFieldName]) {
            return
          }

          doc.ref.update({ [newFieldName]: doc.data()[orginalFieldName] });
        })
      }
    })
  }
}
