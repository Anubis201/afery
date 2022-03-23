import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable, Subscriber } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserService } from '../../global/user/user.service'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      this.userService.isCheckingLogin.subscribe(val => {
        if (!val) {
          this.verify(obs);
        }
      })
    })
  }

  private verify(obs: Subscriber<boolean>) {
    if (!this.userService.isAdmin.value) {
      obs.next(false);
      obs.complete();
      this.router.navigateByUrl('/');
    }
    obs.next(true);
    obs.complete();
  }
}
