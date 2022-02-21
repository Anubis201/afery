import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCarouselComponent } from './poll-carousel.component';

describe('PollCarouselComponent', () => {
  let component: PollCarouselComponent;
  let fixture: ComponentFixture<PollCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
