import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionHeaderComponent } from './discussion-header.component';

describe('DiscussionHeaderComponent', () => {
  let component: DiscussionHeaderComponent;
  let fixture: ComponentFixture<DiscussionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
