import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProvidersEnum } from 'src/app/models/others/enums/providers.enum';
import { ModalService } from 'src/app/services/global/modal/modal.service';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { UserService } from 'src/app/services/global/user/user.service';

interface LoadingModel {
  isLoading: boolean,
  text: string,
  provider: ProvidersEnum
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  providers = new BehaviorSubject<LoadingModel[]>(this.createProviders())

  constructor(
    private userService: UserService,
    private modal: ModalService
  ) { }

  loginProvider(provider: ProvidersEnum) {
    this.changeIsLoading(provider, true);

    this.userService.loginProvider(ProvidersEnum[provider]).subscribe({
      next: () => this.modal.closeAllDialog(),
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
    })
  }

  private createProviders() {
    const object = []

    ConvertEnum(ProvidersEnum, 'string').forEach((provider: ProvidersEnum) => {
      object[provider] = {
        isLoading: false,
        text: provider,
        provider: ProvidersEnum[provider]
      }
    })

    return object;
  }
}
