import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartiesPoints } from 'src/app/models/polls/parties-points.model';
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
  @Input() isAllQuestionChoosed: boolean
  @Input() isCheckResult: boolean
  @Input() resultDetailsLvl: PartiesPoints[]

  @Output() handlePageLvl = new EventEmitter<number>()
  @Output() end = new EventEmitter<void>()
  @Output() onChangeAnswer = new EventEmitter<{ answerIndex: boolean, isChoosed: boolean }>()

  readonly letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  readonly PartiesEnum = PartiesEnum
}
