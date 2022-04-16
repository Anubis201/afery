import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ShortArticleComponent } from './short-article.component';

describe('ShortArticleComponent', () => {
  let component: ShortArticleComponent;
  let fixture: ComponentFixture<ShortArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortArticleComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {
          link: 'toGdzies',
          article: { title: 'testTitle', id: 'dasdasd2' }
        } },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
