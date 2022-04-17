import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';
import { environment } from 'src/environments/environment';

import { DiscussionComponent } from './discussion.component';

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DiscussionComponent,
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
    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 'testId',
      name: 'testName',
      text: 'testText',
      date: new Date(),
      likes: 0,
      dislikes: 0,
      isAnswer: false,
      authorId: 'testAuthorId',
      countAnswers: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
