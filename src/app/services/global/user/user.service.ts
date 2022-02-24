import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)
  isLogin = new BehaviorSubject<boolean>(false)

  constructor(
    private fireAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.fireAuth.user.subscribe(user => {
      this.isLogin.next(!!user);

      // NA CHWILE :D
      this.isAdmin.next(user?.email === user?.photoURL && this.isLogin.value);
    })
  }

  logout() {
    this.fireAuth.signOut()
  }

  loginAsAdmin(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('/admin/create');
      this._snackBar.open('Brawo Bartek zalogowałeś się', 'close');
    })
    .catch(() => {
      this._snackBar.open('Napewno jesteś mną?', 'close');
    })
  }

  loginAsGoogle() {
    return from(this.fireAuth.signInWithPopup(new GoogleAuthProvider()))
      .pipe(
        map(() => {
          this._snackBar.open('Zalogowałeś się', 'close');
        }),
        catchError(() => {
          this._snackBar.open('Nie udało się zalogować', 'close');
          return []
        })
      )
  }
}
