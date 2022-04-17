import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { SingleDiscussionComponent } from './single-discussion.component';

describe('SingleDiscussionComponent', () => {
  let component: SingleDiscussionComponent;
  let fixture: ComponentFixture<SingleDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDiscussionComponent ],
      providers: [
        Overlay,
        MatSnackBar,
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
