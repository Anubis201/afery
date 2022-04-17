import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';

import { MainPollPresidentsComponent } from './main-poll-presidents.component';

describe('MainPollComponent', () => {
  let component: MainPollPresidentsComponent;
  let fixture: ComponentFixture<MainPollPresidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainPollPresidentsComponent,
        TimePipe,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPollPresidentsComponent);
    component = fixture.componentInstance;
    component.poll = {
      forWhom: 'testForWhom',
      people: 1122,
      surveying: 'cbos',
      when: new Date(),
      items: [ { text: 'testText', percentage: 33, color: 'red'  } ],
      typeItems: PollDataEnum.Prezydenci,
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
