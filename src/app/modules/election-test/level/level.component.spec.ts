import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

import { LevelComponent } from './level.component';

describe('LevelComponent', () => {
  let component: LevelComponent;
  let fixture: ComponentFixture<LevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelComponent);
    component = fixture.componentInstance;
    component.question = {
      text: 'testText',
      answers: [{
        text: 'testText',
        isChoosed: false,
        partiesPoints: [{ party: PartiesEnum.lewica, points: 2 }]
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
