import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserService } from '../../global/user/user.service'

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.isLogin.pipe(
        map(isLogin => {
          console.log(isLogin)
          if (!isLogin) {
            return this.router.parseUrl('/');
          }
          return true;
        })
      )
  }
}
