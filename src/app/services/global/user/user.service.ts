import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)

  constructor(
    private fireAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
  ) {
    this.fireAuth.user.subscribe(user => {
      this.isAdmin.next(!!user)
    })
  }

  logout() {
    this.fireAuth.signOut()
  }

  loginAsAdmin(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this._snackBar.open('Brawo Bartek zalogowałeś się', 'close');
    })
    .catch(() => {
      this._snackBar.open('Napewno jesteś mną?', 'close');
    })
  }
}
