import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';

import { PcHeaderComponent } from './pc-header.component';

describe('PcHeaderComponent', () => {
  let component: PcHeaderComponent;
  let fixture: ComponentFixture<PcHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PcHeaderComponent,
        TimePipe,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
