import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ModalService } from 'src/app/services/global/modal/modal.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteCommentComponent {
  @Input() countComment: number | undefined = 0
  @Input() isSavingComment: boolean
  @Input() answerMode = false
  @Input() disableLabel = false

  @Output() addComment = new EventEmitter<CommentModel>()
  @Output() changeOrder = new EventEmitter<OrderEnum>()

  readonly commentLength = 1000
  readonly OrderEnum = OrderEnum

  form = new FormGroup({
    text: new FormControl('', [Validators.maxLength(this.commentLength), Validators.required]),
  })
  orderControl = new FormControl(OrderEnum.Latest)

  constructor(
    private userService: UserService,
    private modal: ModalService
  ) {}

  get isLogin() {
    return this.userService.isLogin
  }

  get isCheckingLogin() {
    return this.userService.isCheckingLogin
  }

  get userName() {
    return this.userService.userName
  }

  capitalizeFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  add() {
    this.addComment.emit({ ...this.form.value, date: new Date() });
    this.form.get('text').patchValue('');
  }

  openSingIn() {
    this.modal.openSignIn();
  }
}
