import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCommentsComponent } from './chat-comments.component';

describe('ChatCommentsComponent', () => {
  let component: ChatCommentsComponent;
  let fixture: ComponentFixture<ChatCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
