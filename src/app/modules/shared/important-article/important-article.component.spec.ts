import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantArticleComponent } from './important-article.component';

describe('ImportantArticleComponent', () => {
  let component: ImportantArticleComponent;
  let fixture: ComponentFixture<ImportantArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
