import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map } from 'rxjs';
import { ProvidersEnum } from 'src/app/models/others/enums/providers.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)
  isLogin = new BehaviorSubject<boolean>(false)
  userName = new BehaviorSubject<string>(null)
  isCheckingLogin = new BehaviorSubject<boolean>(true)

  constructor(
    private fireAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.fireAuth.user.subscribe(user => {
      this.isLogin.next(!!user);

      this.userName.next(user?.displayName || user?.email);

      // NA CHWILE :D
      this.isAdmin.next(user?.email && user.email === user?.photoURL && this.isLogin.value);
      this.isCheckingLogin.next(false);
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

  loginProvider(provider: any) {
    let authProvider: AuthProvider

    switch(provider) {
      case ProvidersEnum.Google:
        authProvider = new GoogleAuthProvider();
        break
      case ProvidersEnum.Facebook:
        authProvider = new FacebookAuthProvider();
        break
      case ProvidersEnum.Twitter:
        authProvider = new TwitterAuthProvider();
        break
    }

    return from(this.fireAuth.signInWithPopup(authProvider))
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

  loginAnonymously() {
    return from(this.fireAuth.signInAnonymously())
  }
}
