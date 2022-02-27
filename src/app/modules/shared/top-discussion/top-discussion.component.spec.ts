import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDiscussionComponent } from './top-discussion.component';

describe('TopDiscussionComponent', () => {
  let component: TopDiscussionComponent;
  let fixture: ComponentFixture<TopDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
