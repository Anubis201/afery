import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { environment } from 'src/environments/environment';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      providers: [
        MatDialog,
        Overlay
      ],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
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
