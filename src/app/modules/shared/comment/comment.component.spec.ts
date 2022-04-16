import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';
import { environment } from 'src/environments/environment';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent, TimePipe ],
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
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      articleId: 'dsdasdas312',
      name: 'testName',
      text: 'testText',
      date: new Date(),
      isNew: false,
      isAnswer: false,
      likes: 1232,
      authorId: 'dsadsa',
      dislikes: 3123,
      avatar: '21312dsda',
      countAnswers: 0,
      id: '23213dsads',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
