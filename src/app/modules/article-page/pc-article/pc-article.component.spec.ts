import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcArticleComponent } from './pc-article.component';

describe('PcArticleComponent', () => {
  let component: PcArticleComponent;
  let fixture: ComponentFixture<PcArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
