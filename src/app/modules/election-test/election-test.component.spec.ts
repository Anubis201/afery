import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionTestComponent } from './election-test.component';

describe('ElectionTestComponent', () => {
  let component: ElectionTestComponent;
  let fixture: ComponentFixture<ElectionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
