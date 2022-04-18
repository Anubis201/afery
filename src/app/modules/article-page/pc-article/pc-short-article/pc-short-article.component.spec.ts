import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

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
    component.article = {
      title: 'testTitle',
      text: 'testText',
      type: ArticlesTypesEnum.PoliticalParties,
      createDate: new Date(),
      id: 'testId',
      imageSrc: 'testImage',
      entity: PartiesEnum.po,
      costs: 123124,
      customName: 'testCustomName',
      tags: [ 'wojna' ],
      likes: 0,
      dislikes: 0,
      viewership: 232,
      isHide: false,
      isFirstArticle: false,
      articleWrite: ArticleWriteEnum.normal,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
