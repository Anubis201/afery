import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvarageComponent } from './avarage.component';

describe('AvarageComponent', () => {
  let component: AvarageComponent;
  let fixture: ComponentFixture<AvarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
