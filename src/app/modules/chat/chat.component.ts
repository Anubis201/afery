import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  get userName() {
    return this.userService.userName
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get isLogin() {
    return this.userService.isLogin
  }

  ngOnInit() {
    this.metaTags();

    this.activatedRoute.parent.params.subscribe(param => {
      console.log(param)
    })
  }

  test(event) {
    console.log(event)
  }

  private metaTags() {
    this.titleService.setTitle('Afery - Bulwar to rozmowy i dyskusje');
    this.meta.updateTag({ name:'description', content:'Na naszym bulwarze możesz pisać o wszystkim bez żadnej cenzury.' }, "name='description'");
  }
}
