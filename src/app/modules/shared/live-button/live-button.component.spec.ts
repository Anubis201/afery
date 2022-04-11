import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveButtonComponent } from './live-button.component';

describe('LiveButtonComponent', () => {
  let component: LiveButtonComponent;
  let fixture: ComponentFixture<LiveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
