import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcShortArticleComponent } from './pc-short-article.component';

describe('PcShortArticleComponent', () => {
  let component: PcShortArticleComponent;
  let fixture: ComponentFixture<PcShortArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcShortArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcShortArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
