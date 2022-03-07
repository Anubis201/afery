import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserOpinionType } from 'src/app/models/others/user-details.model';
import { UserDetailsService } from 'src/app/services/collections/user-details/user-details.service';
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
    private userDetailsService: UserDetailsService,
  ) { }

  get isLogin() {
    return this.userService.isLogin
  }

  get idUser() {
    return this.userService.idUser
  }

  get userDetails() {
    return this.userService.userDetails
  }

  get loadingUserDetails() {
    return this.userService.loadingUserDetails
  }

  ngOnInit() {
    this.userService.subUser.subscribe(() => {
      this.checkActiveButton();
    })
  }

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'like' || forceMinus) {
      if (this.commentMode.value === 'like' && !this.isLogin.value) {
        localStorage.removeItem(this.id);
      }

      if (this.commentMode.value === 'like' && this.isLogin.value) {
        this.removeFromArray('like');
      }

      this.commentMode.next(null);
      value = -1;
    } else {
      if (this.commentMode.value === 'dislike') {
        this.dislike(true);
      }

      if (!this.isLogin.value) {
        localStorage.setItem(this.id, 'like');
      } else {
        this.addToArray('like');
      }

      this.commentMode.next('like');
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
      if (this.commentMode.value === 'dislike' && !this.isLogin.value) {
        localStorage.removeItem(this.id);
      }

      if (this.commentMode.value === 'dislike' && this.isLogin.value) {
        this.removeFromArray('dislike');
      }

      this.commentMode.next(null);
      value = -1;
    } else {
      if (this.commentMode.value === 'like') {
        this.approve(true);
      }

      if (!this.isLogin.value) {
        localStorage.setItem(this.id, 'dislike');
      } else {
        this.addToArray('dislike');
      }

      this.commentMode.next('dislike');
      value = 1;
    }

    this.firestore.collection(this.collection).doc(this.id).update({ dislikes: increment(value) })
      .then(() => {
        this.incrementDislikes.emit(value)
      })
  }

  private addToArray(opinion: UserOpinionType) {
    this.userDetailsService
      .updateDetails(this.idUser.value, { revievs: arrayUnion({ id: this.id, opinion }) } as any)
      .subscribe()
  }

  private removeFromArray(opinion: UserOpinionType) {
    this.userDetailsService
      .updateDetails(this.idUser.value, { revievs: arrayRemove({ id: this.id, opinion }) } as any)
      .subscribe()
  }

  private checkActiveButton() {
    if (!this.isLogin.value){
      if (localStorage.getItem(this.id) === 'like') {
        this.commentMode.next('like');
      } else if (localStorage.getItem(this.id) === 'dislike') {
        this.commentMode.next('dislike');
      }
    } else {
      const sub = this.loadingUserDetails.subscribe(value => {
        if (!value) {
          this.commentMode.next(this.userDetails.value?.revievs.find(review => review.id === this.id)?.opinion);
          setTimeout(() => {
            sub.unsubscribe()
          });
        }
      })
    }
  }
}
