import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BanService } from 'src/app/services/collections/ban/ban.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  isLoading = new BehaviorSubject<boolean>(true)

  private ip: string
  private formSub: Subscription

  constructor(
    private banService: BanService,
  ) { }

  ngOnInit() {
    this.getIdAndCheckBan()
    this.formSub = this.form.valueChanges.subscribe((value: { email: string, password: string }) => {
      if (this.isBanned || this.isLoading) return

      if (value.email === 'mikolaj@swieta.fin' && value.password === 'prezenty') {
        this.gift()
      }
    })
  }

  // Prezent dla włamywacza
  private gift() {
    this.banService.addElement(this.ip, true)
    this.formSub.unsubscribe()
    this.isBanned.next(true)
  }

  private checkBan() {
    this.banService.getElement(this.ip).subscribe(doc => {
      if (!doc.exists) {
        this.isBanned.next(false)
      } else {
        this.isBanned.next((doc.data() as { ban: boolean }).ban)
      }

      this.isLoading.next(false)
    })
  }

  private getIdAndCheckBan() {
    this.banService.getIp().subscribe({
      next: value => {
        this.ip = value.ipAddress
        this.checkBan()
      },
      error: () => {
        this.isLoading.next(false)
      }
    })
  }
}
