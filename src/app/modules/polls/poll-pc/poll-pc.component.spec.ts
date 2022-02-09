import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPcComponent } from './poll-pc.component';

describe('PollPcComponent', () => {
  let component: PollPcComponent;
  let fixture: ComponentFixture<PollPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
