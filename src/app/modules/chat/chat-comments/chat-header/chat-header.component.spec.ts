import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ChatHeaderComponent } from './chat-header.component';

describe('ChatHeaderComponent', () => {
  let component: ChatHeaderComponent;
  let fixture: ComponentFixture<ChatHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHeaderComponent);
    component = fixture.componentInstance;
    component.time = new FormControl()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
