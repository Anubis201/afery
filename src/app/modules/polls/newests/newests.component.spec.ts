import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestsComponent } from './newests.component';

describe('NewestsComponent', () => {
  let component: NewestsComponent;
  let fixture: ComponentFixture<NewestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
