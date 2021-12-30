import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieIconComponent } from './partie-icon.component';

describe('PartieIconComponent', () => {
  let component: PartieIconComponent;
  let fixture: ComponentFixture<PartieIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartieIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
