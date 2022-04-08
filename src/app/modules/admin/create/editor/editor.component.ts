import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  @Input() textControl: FormControl
  @Input() articleWriteControl: FormControl //ArticleWriteEnum

  readonly ArticleWriteEnum = ArticleWriteEnum
}
