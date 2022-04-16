import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';
import { environment } from 'src/environments/environment';

import { AnswerComponent } from './answer.component';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnswerComponent,
        TimePipe,
      ],
      providers: [
        MatSnackBar,
        Overlay,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    component.data = {
      articleId: 'testId',
      name: 'testName',
      text: 'testText',
      date: new Date(),
      isNew: false,
      isAnswer: false,
      likes: 0,
      authorId: 'testAuthorId',
      dislikes: 0,
      countAnswers: 0,
      commentId: 'testCommentId',
      id: 'testId'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
