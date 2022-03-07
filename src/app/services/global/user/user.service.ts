import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map, of, tap, zip } from 'rxjs';
import { ProvidersEnum } from 'src/app/models/others/enums/providers.enum';
import { UserDetailsModel } from 'src/app/models/others/user-details.model';
import { UserDetailsService } from '../../collections/user-details/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)
  isLogin = new BehaviorSubject<boolean>(false)
  userName = new BehaviorSubject<string>(null)
  isCheckingLogin = new BehaviorSubject<boolean>(true)
  idUser = new BehaviorSubject<string>(null)

  constructor(
    private fireAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private userDetailsService: UserDetailsService,
  ) {
    this.fireAuth.user.subscribe(user => {
      this.isLogin.next(!!user);

      this.userName.next(user?.displayName || user?.email);
      this.idUser.next(user?.uid);

      // NA CHWILE :D
      this.isAdmin.next(user?.email && user.email === user?.photoURL && this.isLogin.value);
      this.isCheckingLogin.next(false);
    })
  }

  logout() {
    this.fireAuth.signOut()
  }

  loginProvider(provider: any) {
    let authProvider: AuthProvider

    switch(provider as ProvidersEnum) {
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
        map(auth => {
          this._snackBar.open('Zalogowałeś się', 'close');

          this.userDetailsService.getDetails(auth.user.uid).pipe(
            map(doc => {
              const details: UserDetailsModel = {
                revievs: [],
              }
              if (!doc.exists) {
                return this.userDetailsService.addUserDetails(details, auth.user.uid);
              } else {
                return of(auth)
              }
            })
          ).subscribe()
        }),
        catchError(() => {
          this._snackBar.open('Nie udało się zalogować', 'close');
          return []
        })
      )
  }
}
