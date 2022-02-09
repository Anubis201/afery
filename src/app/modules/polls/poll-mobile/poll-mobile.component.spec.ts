import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollMobileComponent } from './poll-mobile.component';

describe('PollMobileComponent', () => {
  let component: PollMobileComponent;
  let fixture: ComponentFixture<PollMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
