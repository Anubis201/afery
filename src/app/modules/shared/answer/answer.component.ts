import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() data: CommentModel
  @Input() isAdmin: boolean
  @Input() isChat: boolean
  @Input() isChangingTextAnswer: boolean

  @Output() deleteAnswer = new EventEmitter<string>()
  @Output() changeTextAnswer = new EventEmitter<{ id: string, text: string }>()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
  ) {}

  get isYourComment() {
    return this.userService.idUser.value === this.data.authorId && this.userService.isLogin
  }

  answers = new BehaviorSubject<CommentModel[]>([])
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  isEditMode = new BehaviorSubject<boolean>(false)
  editTextControl = new FormControl(null, Validators.required)

  editText() {
    if (this.isEditMode.value) {
      this.isEditMode.next(false);
      return
    }

    this.editTextControl.patchValue(this.data.text);
    this.isEditMode.next(true);
  }

  handleLike(value: number) {
    this.data.likes = this.data.likes + value;
    this.data.likes = isNaN(this.data.likes) ? 1 : this.data.likes;
    this.changeDetectorRef.detectChanges();
  }

  handleDislike(value: number) {
    this.data.dislikes = this.data.dislikes + value;
    this.data.dislikes = isNaN(this.data.dislikes) ? 1 : this.data.dislikes;
    this.changeDetectorRef.detectChanges();
  }
}
