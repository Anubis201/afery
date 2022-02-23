import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShortArticleComponent } from './mobile-short-article.component';

describe('MobileShortArticleComponent', () => {
  let component: MobileShortArticleComponent;
  let fixture: ComponentFixture<MobileShortArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileShortArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileShortArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
