import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl } from '@angular/forms';

import { PollItemsComponent } from './poll-items.component';

describe('PollItemsComponent', () => {
  let component: PollItemsComponent;
  let fixture: ComponentFixture<PollItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollItemsComponent);
    component = fixture.componentInstance;
    component.typeDataControl = new FormControl();
    component.items = new FormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
