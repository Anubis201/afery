import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuestionModel } from 'src/app/models/polls/question.model';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelComponent {
  @Input() length: number
  @Input() lvl: number
  @Input() question: QuestionModel


}
