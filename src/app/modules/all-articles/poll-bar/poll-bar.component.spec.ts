import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { PollBarComponent } from './poll-bar.component';

describe('PollBarComponent', () => {
  let component: PollBarComponent;
  let fixture: ComponentFixture<PollBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollBarComponent ],
      providers: [
        Overlay,
        MatSnackBar,
        DatePipe,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
