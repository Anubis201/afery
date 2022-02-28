import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteChatComponent } from './write-chat.component';

describe('WriteChatComponent', () => {
  let component: WriteChatComponent;
  let fixture: ComponentFixture<WriteChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
