import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarOnlyPcComponent } from './navigation-bar-only-pc.component';

describe('NavigationBarOnlyPcComponent', () => {
  let component: NavigationBarOnlyPcComponent;
  let fixture: ComponentFixture<NavigationBarOnlyPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarOnlyPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarOnlyPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
