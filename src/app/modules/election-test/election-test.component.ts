import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { QuestionModel } from 'src/app/models/polls/question.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { QuestionsData } from 'src/app/services/global/data/questions';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-election-test',
  templateUrl: './election-test.component.html',
  styleUrls: ['./election-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showAnimation],
})
export class ElectionTestComponent {
  isStart = new BehaviorSubject<boolean>(true)
  lvl = new BehaviorSubject<number>(1)
  questions = new BehaviorSubject<QuestionModel[]>(QuestionsData)
  isEnd = new BehaviorSubject<boolean>(false)

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

  handlePageLvl(index: number) {
    this.lvl.next(index);
  }

  handleEnd() {
    this.isEnd.next(true);
    console.log('dsadasd')
  }

  handleStart() {
    this.isStart.next(true);
  }

  onChangeAnswer({ answerIndex, isChoosed }: { answerIndex: number, isChoosed: boolean }) {
    const questions = this.questions.value;

    questions[this.lvl.value - 1].answers = questions[this.lvl.value - 1].answers.map(answer => ({ text: answer.text, isChoosed: false }))
    questions[this.lvl.value - 1].answers[answerIndex].isChoosed = isChoosed;
    this.questions.next(questions);
  }

  private metaTags() {
    this.titleService.setTitle('Test wyborczy - Afery');
    this.meta.updateTag({ name:'description', content: 'Rozwiąż prosty test wyborczy i dowiedz się która partia jest ci najbliższa.' }, "name='description'");
  }
}
