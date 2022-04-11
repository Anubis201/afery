import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPollOtherComponent } from './main-poll-other.component';

describe('MainPollOtherComponent', () => {
  let component: MainPollOtherComponent;
  let fixture: ComponentFixture<MainPollOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPollOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
