import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPartyComponent } from './poll-party.component';

describe('PollPcComponent', () => {
  let component: PollPartyComponent;
  let fixture: ComponentFixture<PollPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
