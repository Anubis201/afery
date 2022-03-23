import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollBarComponent } from './poll-bar.component';

describe('PollBarComponent', () => {
  let component: PollBarComponent;
  let fixture: ComponentFixture<PollBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollBarComponent ]
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
