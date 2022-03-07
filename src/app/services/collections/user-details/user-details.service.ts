import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
import { UserDetailsModel } from 'src/app/models/others/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private firestore: AngularFirestore) { }

  private getRef() {
    return this.firestore.collection<UserDetailsModel>('users');
  }

  addUserDetails(details: UserDetailsModel, userId: string) {
    return from(this.getRef().doc(userId).set(details))
  }

  updateDetails(userId: string, details: Partial<UserDetailsModel>) {
    return from(this.getRef().doc(userId).update(details))
  }

  getDetails(userId: string) {
    return this.getRef().doc(userId).get()
  }
}
