import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoArticleImageComponent } from './add-no-article-image.component';

describe('AddNoArticleImageComponent', () => {
  let component: AddNoArticleImageComponent;
  let fixture: ComponentFixture<AddNoArticleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoArticleImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoArticleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
