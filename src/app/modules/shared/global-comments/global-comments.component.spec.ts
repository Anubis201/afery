import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCommentsComponent } from './global-comments.component';

describe('CommentsComponent', () => {
  let component: GlobalCommentsComponent;
  let fixture: ComponentFixture<GlobalCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
