import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  })

  isBanned = new BehaviorSubject<boolean>(false)

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe((value: { email: string, password: string }) => {
      if (this.isBanned.value) return

      if (value.email === 'mikolaj@swieta.fin' && value.password === 'prezenty') {
        this.gift()
      }
    })
}

  login() {
    this.userService.loginAsAdmin(this.form.get('email')?.value, this.form.get('password')?.value)
  }

  // Prezent dla włamywacza
  private gift() {
    this.isBanned.next(true)
  }
}
