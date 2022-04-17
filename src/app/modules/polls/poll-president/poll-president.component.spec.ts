import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';

import { PollPresidentComponent } from './poll-president.component';

describe('PollPresidentComponent', () => {
  let component: PollPresidentComponent;
  let fixture: ComponentFixture<PollPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PollPresidentComponent,
        TimePipe,
      ],
      providers: [
        DatePipe
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPresidentComponent);
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
