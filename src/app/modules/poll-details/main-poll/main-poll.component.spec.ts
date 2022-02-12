import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPollComponent } from './main-poll.component';

describe('MainPollComponent', () => {
  let component: MainPollComponent;
  let fixture: ComponentFixture<MainPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
