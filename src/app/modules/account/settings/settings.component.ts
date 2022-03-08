import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { UserDetailsService } from 'src/app/services/collections/user-details/user-details.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  constructor(
    private userDetailsService: UserDetailsService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) { }

  deleteAccount() {
    this.userDetailsService.deleteDetails(this.userService.idUser.value).pipe(
      switchMap(() =>this.userService.deleteAccount())
    ).subscribe(() => {
      this.route.navigateByUrl('/');
      this._snackBar.open('Konto zostało usunięty', 'close');
    })
  }
}
