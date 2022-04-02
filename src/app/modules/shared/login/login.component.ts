import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { ProvidersEnum } from 'src/app/models/others/enums/providers.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { UserService } from 'src/app/services/global/user/user.service';

interface LoadingModel {
  isLoading: boolean
  authProvider: AuthProvider
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  providers = new BehaviorSubject<LoadingModel[]>(this.createProviders())

  readonly ProvidersEnum = ProvidersEnum

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  parseInt(int: string) {
    return parseInt(int, 10);
  }

  loginProvider(authProvider: AuthProvider, provider: ProvidersEnum) {
    this.changeIsLoading(provider, true);

    this.userService.loginProvider(authProvider).subscribe({
      next: () => this.dialog.closeAll(),
      complete: () => this.changeIsLoading(provider, false),
    })
  }

  private changeIsLoading(provider: ProvidersEnum, isLoading: boolean) {
    this.providers.next({
      ...this.providers.value,
      [provider]: {
        ...this.providers.value[provider],
        isLoading
      }
    });
  }

  private createProviders() {
    const providers: LoadingModel[] = [];

    ConvertEnum(ProvidersEnum, 'number').forEach((provider: ProvidersEnum) => {
      providers[provider] = {
        isLoading: false,
        authProvider: this.getAuthProvider(provider)
      }
    });

    return providers;
  }

  private getAuthProvider(provider: ProvidersEnum) {
    switch(provider) {
      case ProvidersEnum.Google:
        return new GoogleAuthProvider();
      case ProvidersEnum.Facebook:
        return new FacebookAuthProvider();
      case ProvidersEnum.Twitter:
        return new TwitterAuthProvider();
    }
  }
}
