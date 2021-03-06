import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { increment } from 'firebase/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ChatService } from 'src/app/services/collections/chat/chat.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent {
  @Input() isAdmin: boolean
  @Input() isLogin: boolean
  @Input() userName: string
  @Input() idUser: string
  @Input() disableIcon: boolean = false

  @Output() deleteMe = new EventEmitter<string>()

  @Input() set data(comment: ChatTextModel) {
    if (!comment) {
      return
    }

    this.discussionData.next(comment);
    this.countAnswers.next(comment?.countAnswers);
  }

  isSaving = new BehaviorSubject<boolean>(false)
  isEditMode = new BehaviorSubject<boolean>(false)
  handleOpenWrite = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  answers = new BehaviorSubject<ChatTextModel[]>([])
  discussionData = new BehaviorSubject<ChatTextModel>(null)
  editTextControl = new FormControl(null, Validators.required)
  isChangingText = new BehaviorSubject<boolean>(false)

  constructor(
    private chatService: ChatService,
    private _snackBar: MatSnackBar,
  ) { }

  get isYourComment() {
    return this.idUser === this.discussionData.value.authorId && this.isLogin
  }

  isValidHttpUrl(str: string) {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  editText() {
    if (this.isEditMode.value) {
      this.isEditMode.next(false);
      return
    }

    this.editTextControl.patchValue(this.discussionData.value.text);
    this.isEditMode.next(true);
  }

  handleChangeTextAnswer({ id, text }: { id: string, text: string }) {
    // TODO kiedys posprawdzac dzialanie edycji
    this.chatService.updateChat(id, { text }).subscribe({
      next: () => {
        this.answers.next(this.answers.value.map(answer => {
          if (answer.id !== id) {
            return answer
          }

          return { ...answer, text }
        }))
      },
      error: () => {
        this._snackBar.open('Nie uda??o si?? usun???? komentarza', 'anuluj');
      }
    })
  }

  changeText() {
    this.isChangingText.next(true);
    this.chatService.updateChat(this.discussionData.value.id, { text: this.editTextControl.value }).subscribe({
      next: () => {
        this.discussionData.next({ ...this.discussionData.value, text: this.editTextControl.value })
        this.isEditMode.next(false);
        this.isChangingText.next(false);
      },
      error: () => {
        this._snackBar.open('Nie uda??o si?? zmieni?? tekstu', 'anuluj');
        this.isChangingText.next(false);
      }
    })
  }

  hideAnswers() {
    this.answers.next([]);
    this.handleOpenWrite.next(false)
    this.handleOpenAnswers.next(false);
  }

  addAnswer(answer: ChatTextModel) {
    this.isSaving.next(true);

    const rlyChat: ChatTextModel = {
      ...answer,
      name: this.userName,
      dislikes: 0,
      likes: 0,
      parentId: this.discussionData.value.id,
      isAnswer: true,
      authorId: this.idUser
    };

    this.chatService.updateChat(this.discussionData.value.id, { countAnswers: increment(1) as any }).pipe(
      switchMap(() => this.chatService.addChat(rlyChat))
    ).subscribe({
      next: doc => {
        this.answers.next([ { ...rlyChat, id: doc.id }, ...this.answers.value]);
        this.countAnswers.next(this.countAnswers.value + 1);
        this.isSaving.next(false);
      },
      error: err => {
        this.isSaving.next(false);
      }
    })
  }

  getAnswers(openWrite = false) {
    if (openWrite) {
      this.handleOpenWrite.next(true);
    }

    this.chatService.getAnswers(this.discussionData.value.id).subscribe({
      next: docs => {
        let data: ChatTextModel[] = [];

        docs.forEach(doc => data.push({ ...doc.data() as ChatTextModel, date: (doc.data() as any).date.toDate(), id: doc.id }));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  handleDeleteAnswer(id: string) {
    this.chatService.updateChat(this.discussionData.value.id, { countAnswers: increment(-1) as any }).pipe(
      switchMap(() => this.chatService.deteleMe(id))
    ).subscribe({
      next: () => {
        this.answers.next(this.answers.value.filter(filterV => filterV.id !== id));
        this.countAnswers.next(this.countAnswers.value - 1);
        this.isSaving.next(false);
      },
      error: () => {
        this._snackBar.open('Nie uda??o si?? usun???? komentarza', 'anuluj');
      }
    })
  }

  handleLike(value: number) {
    this.discussionData.next({ ...this.discussionData.value, likes: this.discussionData.value.likes + value });
    this.discussionData.next({ ...this.discussionData.value, likes: isNaN(this.discussionData.value.likes) ? 1 : this.discussionData.value.likes });
  }

  handleDislike(value: number) {
    this.discussionData.next({ ...this.discussionData.value, dislikes: this.discussionData.value.dislikes + value });
    this.discussionData.next({ ...this.discussionData.value, dislikes: isNaN(this.discussionData.value.dislikes) ? 1 : this.discussionData.value.dislikes });
  }
}
