import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';

import { LiveItemComponent } from './live-item.component';

describe('LiveItemComponent', () => {
  let component: LiveItemComponent;
  let fixture: ComponentFixture<LiveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveItemComponent, TimePipe ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveItemComponent);
    component = fixture.componentInstance;
    component.item = {
      text: 'Witam',
      date: new Date()
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
