import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { QuestionModel } from 'src/app/models/polls/question.model';
import { ResultElectionType } from 'src/app/models/polls/result-election.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { QuestionsData } from 'src/app/services/global/data/questions';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-election-test',
  templateUrl: './election-test.component.html',
  styleUrls: ['./election-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showAnimation],
})
export class ElectionTestComponent implements OnInit {
  isStart = new BehaviorSubject<boolean>(true)
  lvl = new BehaviorSubject<number>(1)
  questions = new BehaviorSubject<QuestionModel[]>(QuestionsData)
  isEnd = new BehaviorSubject<boolean>(false)
  isAllQuestionChoosed = new BehaviorSubject<boolean>(false)
  result = new BehaviorSubject<any[]>(this.createResultObject() as any[])

  constructor(
    private titleService: Title,
    private meta: Meta,
    private userService: UserService,
  ) { this.metaTags() }

  get isLogin() {
    return this.userService.isLogin
  }

  get isCheckingLogin() {
    return this.userService.isCheckingLogin
  }

  ngOnInit() {
    this.verifyIsAllQuestionChoosed(this.questions.value);
  }

  handlePageLvl(index: number) {
    this.lvl.next(index);
  }

  handleEnd() {
    const result = this.result.value

    this.questions.value.forEach(question => {
      question.answers.every(answer => {
        if (answer.isChoosed) {
          answer.partiesPoints.forEach(all => {
            result[PartiesEnum[all.party]] = result[PartiesEnum[all.party]] + all.points;
          })
          return false
        }
        return true
      })
    })
    console.log(result)

    const sortableResult = Object.entries(result).sort(([, a], [, b]) => (a - b))

    this.result.next(sortableResult.map(ele => ({ party: ele[0], points: ele[1] })).reverse() as any)
    this.isEnd.next(true);
  }

  handleStart() {
    this.isStart.next(true);
  }

  onChangeAnswer({ answerIndex, isChoosed }: { answerIndex: number, isChoosed: boolean }) {
    const questions = this.questions.value;

    questions[this.lvl.value - 1]
      .answers = questions[this.lvl.value - 1].answers
      .map(answer => ({ ...answer, isChoosed: false }));

    questions[this.lvl.value - 1].answers[answerIndex].isChoosed = isChoosed;

    this.verifyIsAllQuestionChoosed(questions);
    this.questions.next(questions);
  }

  private verifyIsAllQuestionChoosed(questions: QuestionModel[]) {
    let isAllChoosed = this.isAllQuestionChoosed.value;

    isAllChoosed = questions.every(question => {
      let isSomeAnswerChecked = false;

      question.answers.every(answer => {
        if (answer.isChoosed) {
          isSomeAnswerChecked = true;
          return false
        }

        return true
      })

      return isSomeAnswerChecked
    })

    this.isAllQuestionChoosed.next(isAllChoosed);
  }

  private createResultObject() {
    const object = {};

    ConvertEnum(PartiesEnum, 'string').forEach((value: PartiesEnum) => {
      object[value] = 0
    })

    return object;
  }

  private metaTags() {
    this.titleService.setTitle('Test wyborczy - Afery');
    this.meta.updateTag({ name:'description', content: 'Rozwiąż prosty test wyborczy i dowiedz się która partia jest ci najbliższa.' }, "name='description'");
  }
}
