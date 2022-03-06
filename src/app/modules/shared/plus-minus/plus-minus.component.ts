import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMinusComponent implements OnInit {
  @Input() likes: string
  @Input() dislikes: string
  @Input() parentId: string
  @Input() collection: string

  @Output() incrementLikes = new EventEmitter<void>()
  @Output() incrementDislikes = new EventEmitter<void>()

  commentMode = new BehaviorSubject<'like' | 'dislike' | null>(null)

  constructor(
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.checkActiveButton();
  }

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'like' || forceMinus) {
      if (this.commentMode.value === 'like') localStorage.removeItem(this.parentId);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'dislike') this.dislike(true);
      this.commentMode.next('like');
      localStorage.setItem(this.parentId, 'like');
      value = 1;
    }

    this.firestore.collection(this.collection).doc(this.parentId).update({ likes: increment(value) })
      .then(() => {
        this.incrementLikes.emit();
      })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'dislike' || forceMinus) {
      if (this.commentMode.value === 'dislike') localStorage.removeItem(this.parentId);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'like') this.approve(true);
      this.commentMode.next('dislike');
      localStorage.setItem(this.parentId, 'dislike');
      value = 1;
    }

    this.firestore.collection(this.collection).doc(this.parentId).update({ likes: increment(value) })
      .then(() => {
        this.incrementDislikes.emit()
      })
  }

  private checkActiveButton() {
    if (localStorage.getItem(this.parentId) === 'like')
      this.commentMode.next('like');
    else if (localStorage.getItem(this.parentId) === 'dislike')
      this.commentMode.next('dislike');
  }
}
