import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { PlusMinusComponent } from './plus-minus.component';

describe('PlusMinusComponent', () => {
  let component: PlusMinusComponent;
  let fixture: ComponentFixture<PlusMinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusMinusComponent ],
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
    fixture = TestBed.createComponent(PlusMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
