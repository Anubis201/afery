import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPresidentComponent } from './poll-president.component';

describe('PollPresidentComponent', () => {
  let component: PollPresidentComponent;
  let fixture: ComponentFixture<PollPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPresidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
