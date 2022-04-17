import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';

import { MainPollOtherComponent } from './main-poll-other.component';

describe('MainPollOtherComponent', () => {
  let component: MainPollOtherComponent;
  let fixture: ComponentFixture<MainPollOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainPollOtherComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollOtherComponent);
    component = fixture.componentInstance;
    component.poll = {
      forWhom: 'testForWhom',
      people: 1122,
      surveying: 'cbos',
      when: new Date(),
      items: [ { text: 'testText', percentage: 33, color: 'red'  } ],
      typeItems: PollDataEnum.Inne,
      title: 'testTitle',
      viewType: ViewPullEnum.Normalny,
      id: 'testsId',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
