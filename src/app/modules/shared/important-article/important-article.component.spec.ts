import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { environment } from 'src/environments/environment';

import { ImportantArticleComponent } from './important-article.component';

describe('ImportantArticleComponent', () => {
  let component: ImportantArticleComponent;
  let fixture: ComponentFixture<ImportantArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantArticleComponent ],
      providers: [
        MatDialog,
        Overlay,
      ],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantArticleComponent);
    component = fixture.componentInstance;
    component.article = {
      title: 'testTitle',
      text: 'testText',
      type: ArticlesTypesEnum.PoliticalParties,
      createDate: new Date(),
      id: 'dsads',
      imageSrc: 'dsadsadas',
      entity: PartiesEnum.pis,
      costs: 123213333,
      customName: 'textcustomname',
      tags: [ 'cos', 'drugicos' ],
      viewership: 3213,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
