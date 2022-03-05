import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { ChatService } from 'src/app/services/collections/chat/chat.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-single-discussion',
  templateUrl: './single-discussion.component.html',
  styleUrls: ['./single-discussion.component.scss'],
  host: {
    class: 'col-12 col-md-10 col-lg-8 col-xl-6'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleDiscussionComponent implements OnInit {
  data = new BehaviorSubject<ChatTextModel>(null)
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
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
    this.activatedRoute.params.subscribe(({ discussionId }: { discussionId: string }) => {
      this.getData(discussionId);
    })
  }

  handleDelete(id: string) {
    this.chatService.deteleMe(id).subscribe()
  }

  getData(id: string) {
    this.isLoading.next(true)
    this.chatService.getDiscussion(id).subscribe({
      next: data => {
        this.data.next({
          ...data.data() as ChatTextModel,
          date: (data.data() as any).date.toDate(),
          id: data.id
        });
        this.isLoading.next(false)
      },
      error: () => {
        this.isLoading.next(false)
      }
    })
  }
}
