import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { UserDetailsService } from 'src/app/services/collections/user-details/user-details.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteAccountComponent {
  isDeleteingAccount = new BehaviorSubject<boolean>(false)
  isErrorDeleting = new BehaviorSubject<boolean>(false)

  readonly errorText = 'UWAGA! Przed usunięciem konta musisz zalogować się ponownie.'

  constructor(
    private userDetailsService: UserDetailsService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) { }

  deleteAccount() {
    this.isDeleteingAccount.next(true);
    this.userDetailsService.deleteDetails(this.userService.idUser.value).pipe(
      switchMap(() =>this.userService.deleteAccount())
    ).subscribe({
      next: () => {
        this.route.navigateByUrl('/');
        this._snackBar.open('Konto zostało usunięty', 'close');
        this.isDeleteingAccount.next(false);
      },
      error: () => {
        this._snackBar.open(this.errorText, 'close');
        this.isDeleteingAccount.next(false);
        this.isErrorDeleting.next(true);
      }
    })
  }
}
