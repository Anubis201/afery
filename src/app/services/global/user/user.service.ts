import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)

  constructor(private fireAuth: AngularFireAuth) {
    this.fireAuth.user.subscribe(user => {
      this.isAdmin.next(!!user)
    })
  }

}
