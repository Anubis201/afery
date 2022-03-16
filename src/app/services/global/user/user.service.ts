import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, catchError, from, map, of } from 'rxjs';
import { ProvidersEnum } from 'src/app/models/others/enums/providers.enum';
import { UserDetailsModel } from 'src/app/models/others/user-details.model';
import { UserDetailsService } from '../../collections/user-details/user-details.service';
import { RandomImageSrc } from '../support-functions/random-image';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<boolean>(false)
  isLogin = new BehaviorSubject<boolean>(false)
  userName = new BehaviorSubject<string>(null)
  avatarSrc = new BehaviorSubject<string>(RandomImageSrc())
  isCheckingLogin = new BehaviorSubject<boolean>(true)
  idUser = new BehaviorSubject<string>(null)
  userDetails = new BehaviorSubject<UserDetailsModel>(null)
  loadingUserDetails = new BehaviorSubject<boolean>(true)

  user = new BehaviorSubject<User>(null)

  constructor(
    private fireAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private userDetailsService: UserDetailsService,
  ) {
    this.fireAuth.user.subscribe(user => {
      if (user?.uid) {
        this.getDetails(user.uid);
      }
      this.isLogin.next(!!user);
      this.userName.next(user?.displayName);
      this.idUser.next(user?.uid);
      this.avatarSrc.next(this.avatarSrc.value)
      // NA CHWILE :D
      this.isAdmin.next(user?.email && user.email === user?.photoURL && this.isLogin.value);
      this.user.next(user);
      this.isCheckingLogin.next(false);
    })
  }

  get subUser() {
    return this.fireAuth.user
  }

  logout() {
    this.fireAuth.signOut()
  }

  deleteAccount() {
    return from(this.user.value.delete())
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

  private getDetails(id: string) {
    this.loadingUserDetails.next(true);
    this.userDetailsService.getDetails(id).subscribe({
      next: data => {
        this.userDetails.next(data.data());
        this.loadingUserDetails.next(false);
      },
      error: () => {
        this.loadingUserDetails.next(false);
      }
    })
  }
}
