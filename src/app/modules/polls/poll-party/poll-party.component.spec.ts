import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';
import { environment } from 'src/environments/environment';

import { PollPartyComponent } from './poll-party.component';

describe('PollPcComponent', () => {
  let component: PollPartyComponent;
  let fixture: ComponentFixture<PollPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PollPartyComponent,
        TimePipe,
      ],
      providers: [
        DatePipe
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPartyComponent);
    component = fixture.componentInstance;
    component.poll = {
      forWhom: 'testForWhom',
      people: 1122,
      surveying: 'cbos',
      when: new Date(),
      items: [ { text: 'testText', percentage: 33, color: 'red'  } ],
      typeItems: PollDataEnum.Partie,
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
