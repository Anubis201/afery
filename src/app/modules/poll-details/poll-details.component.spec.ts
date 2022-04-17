import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PollDetailsComponent } from './poll-details.component';

describe('PollDetailsComponent', () => {
  let component: PollDetailsComponent;
  let fixture: ComponentFixture<PollDetailsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollDetailsComponent ],
      providers: [
        DatePipe,
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
    fixture = TestBed.createComponent(PollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
