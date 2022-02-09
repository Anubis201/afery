import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowAnimationComponent } from './snow-animation.component';

describe('SnowAnimationComponent', () => {
  let component: SnowAnimationComponent;
  let fixture: ComponentFixture<SnowAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnowAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
