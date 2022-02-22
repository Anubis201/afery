import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPollPresidentsComponent } from './main-poll-presidents.component';

describe('MainPollComponent', () => {
  let component: MainPollPresidentsComponent;
  let fixture: ComponentFixture<MainPollPresidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPollPresidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollPresidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
