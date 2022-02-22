import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPollPartyComponent } from './main-poll-party.component';

describe('MainPollComponent', () => {
  let component: MainPollPartyComponent;
  let fixture: ComponentFixture<MainPollPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPollPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
