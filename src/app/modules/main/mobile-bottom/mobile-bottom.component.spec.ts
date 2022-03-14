import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottomComponent } from './mobile-bottom.component';

describe('MobileBottomComponent', () => {
  let component: MobileBottomComponent;
  let fixture: ComponentFixture<MobileBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
