import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-election-test',
  templateUrl: './election-test.component.html',
  styleUrls: ['./election-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showAnimation],
})
export class ElectionTestComponent implements OnInit {
  isStart = new BehaviorSubject<boolean>(false)
  questions = new BehaviorSubject<any[]>([1, 2, 3])

  constructor(
    private titleService: Title,
    private meta: Meta,
    private userService: UserService,
  ) { this.metaTags() }

  get isLogin() {
    return this.userService.isLogin
  }

  get isCheckingLogin() {
    return this.userService.isCheckingLogin
  }

  ngOnInit() {

  }

  private metaTags() {
    this.titleService.setTitle('Test wyborczy - Afery');
    this.meta.updateTag({ name:'description', content: 'Rozwiąż prosty test wyborczy i dowiedz się która partia jest ci najbliższa.' }, "name='description'");
  }
}
