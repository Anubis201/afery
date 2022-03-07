import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserOpinionType } from 'src/app/models/others/user-details.model';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMinusComponent implements OnInit {
  @Input() likes: string
  @Input() dislikes: string
  @Input() id: string
  @Input() collection: string
  @Input() numberAnswers: number
  @Input() isArticle = false

  @Output() incrementLikes = new EventEmitter<number>()
  @Output() incrementDislikes = new EventEmitter<number>()

  commentMode = new BehaviorSubject<UserOpinionType>(null)

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
  ) { }

  get isLogin() {
    return this.userService.isLogin
  }

  ngOnInit() {
    this.checkActiveButton();
  }

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'like' || forceMinus) {
      if (this.commentMode.value === 'like') localStorage.removeItem(this.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'dislike') this.dislike(true);
      this.commentMode.next('like');
      localStorage.setItem(this.id, 'like');
      value = 1;
    }

    this.firestore.collection(this.collection).doc(this.id).update({ likes: increment(value) })
      .then(() => {
        this.incrementLikes.emit(value);
      })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'dislike' || forceMinus) {
      if (this.commentMode.value === 'dislike') localStorage.removeItem(this.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'like') this.approve(true);
      this.commentMode.next('dislike');
      localStorage.setItem(this.id, 'dislike');
      value = 1;
    }

    this.firestore.collection(this.collection).doc(this.id).update({ dislikes: increment(value) })
      .then(() => {
        this.incrementDislikes.emit(value)
      })
  }

  private checkActiveButton() {
    if (localStorage.getItem(this.id) === 'like')
      this.commentMode.next('like');
    else if (localStorage.getItem(this.id) === 'dislike')
      this.commentMode.next('dislike');
  }
}
