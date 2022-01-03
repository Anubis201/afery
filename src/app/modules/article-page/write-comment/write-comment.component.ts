import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteCommentComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.email, Validators.required]),
    comment: new FormControl('', Validators.required),
  })

  constructor() { }

}
