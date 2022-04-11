import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  @Input() textControl: FormControl
  @Input() articleWriteSubject: ArticleWriteEnum
  @Input() liveItemsArrayControl: FormArray // LiveItemModel[]

  @Output() addLiveItem = new EventEmitter<void>()
  @Output() deleteLiveItem = new EventEmitter<number>()

  readonly ArticleWriteEnum = ArticleWriteEnum
}
