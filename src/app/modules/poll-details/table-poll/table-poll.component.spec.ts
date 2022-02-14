import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePollComponent } from './table-poll.component';

describe('TablePollComponent', () => {
  let component: TablePollComponent;
  let fixture: ComponentFixture<TablePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
