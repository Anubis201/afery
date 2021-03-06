import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ChatService } from 'src/app/services/collections/chat/chat.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-single-discussion',
  templateUrl: './single-discussion.component.html',
  styleUrls: ['./single-discussion.component.scss'],
  host: {
    class: 'col-12 col-md-10 col-lg-8 col-xl-6'
  },
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleDiscussionComponent implements OnInit {
  data = new BehaviorSubject<ChatTextModel>(null)
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
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

  get idUser() {
    return this.userService.idUser
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ discussionId }: { discussionId: string }) => {
      this.getData(discussionId);
    })
  }

  handleDelete(id: string) {
    this.chatService.removeAnswers(id).pipe(
      switchMap(() => this.chatService.deteleMe(id))
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/bulwar/dyskusje');
        this._snackBar.open('Komentarz został usunięty', 'anuluj');
      },
      error: () => {
        this._snackBar.open('Nie udało się usunąć komentarza', 'anuluj');
      }
    })
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
