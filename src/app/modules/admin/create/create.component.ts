import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, first } from 'rxjs';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ArticlesKindsEnum } from 'src/app/models/articles/enums/articles-kinds.enum';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { ImagesService } from 'src/app/services/collections/images/images.service';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    subtitle: new FormControl(null, Validators.required),
    text: new FormControl(null),
    image: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    kind: new FormControl(ArticlesKindsEnum.Confirmed, Validators.required),
    entity: new FormControl(null, Validators.required), // partie // jest required ponieważ domyślnie przyjmuje partie jako domyślny tryb
    customName: new FormControl(null), // uzywane w kategoriach politycy oraz reszta // odwrotnie do góry
    costs: new FormControl(null),
  })

  articleId = new BehaviorSubject<string>('') // jest on uzywany wylacznie podczas edycji artykulu, czyli jednoczesnie jest uzywane aby sprawdzic czy jest isEdit mode
  isLoading = new BehaviorSubject<boolean>(false)
  entityItems = new BehaviorSubject<PartiesEnum[]>(ConvertEnum(PartiesEnum, 'number'))

  readonly articleTypes = ConvertEnum(ArticlesTypesEnum, 'string')
  readonly articleKinds = ConvertEnum(ArticlesKindsEnum, 'string')
  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum
  private readonly maxFileSize = 1048576 // 1MB

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private imageService: ImagesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form.get('type')?.patchValue(ArticlesTypesEnum.PoliticalParties);
    this.setItemsEntityOnTypeChange();

    this.activatedRoute.queryParams.subscribe(({ id }) => {
      if (id) {
        this.getArticleForEdit(id);
      } else {
        this.articleId.next('');
      }
    })
  }

  handleSubmit(images: FileList | null) {
    if (this.articleId.value.length) {
      // edycja artykulu
      this.edit();
    } else {
      // tworzenie nowego artykulu
      this.create(images);
    }
  }

  private edit() {
    this.isLoading.next(true);
    this.articlesService.editArticle(this.form.value as ArticleModel, this.articleId.value).subscribe({
      next: () => {
        this._snackBar.open('Zedytowany artykuł', 'close');
        this.isLoading.next(false);
      },
      error: () => {
        this._snackBar.open('Nie udalo się zedytować artykułu', 'close');
        this.isLoading.next(false);
      }
    })
  }

  private create(images: FileList | null) {
    if (images === null) {
      this._snackBar.open('Brak obrazu', 'close');
      return
    }

    const image = images[0]
    if (image.size > this.maxFileSize) {
      this._snackBar.open('Max wielkość pliku to 1MB', 'close');
      return
    }

    const last3Characters = images[0].name.slice(-3)
    if (last3Characters !== 'jpg' && last3Characters !== 'png') {
      this._snackBar.open('Tylko png i jpg', 'close');
      return
    }

    this.isLoading.next(true);
    const ref = this.articlesService.getRef().doc().ref;

    this.imageService.addImage(ref.id, image).subscribe(value => {
      if (value === 100) {
        this._snackBar.open('Zdjęcie zostało dodane teraz czas na resztę', 'close');
        this.imageService.getImage(ref.id).subscribe(url => {
          this.addArticle(ref, url);
        })
      }
    })
  }

  private setItemsEntityOnTypeChange() {
    this.form.get('type')?.valueChanges.subscribe((articleType: ArticlesTypesEnum) => {
      switch(articleType) {
        case ArticlesTypesEnum.PoliticalParties:
          this.form.get('customName')?.patchValue(null);
          this.form.get('customName')?.clearValidators();
          this.form.get('entity')?.addValidators(Validators.required);
          break;
        case ArticlesTypesEnum.Politicians:
        case ArticlesTypesEnum.Others:
          this.form.get('entity')?.clearValidators();
          this.form.get('customName')?.addValidators(Validators.required);
          this.form.get('entity')?.patchValue(null);
          break;
      }

      this.form.get('customName')?.updateValueAndValidity()
      this.form.get('entity')?.updateValueAndValidity()
    })
  }

  private addArticle(ref: DocumentReference<unknown>, imageSrc: string) {
    this.articlesService.addArticle({
      title: this.form.get('title')?.value,
      text: this.form.get('text')?.value,
      type: this.form.get('type')?.value,
      kind: this.form.get('kind')?.value,
      entity: this.form.get('entity')?.value,
      costs: this.form.get('costs')?.value,
      createDate: new Date(),
      customName: this.form.get('customName')?.value,
      subtitle: this.form.get('subtitle')?.value,
      viewership: 1,
      imageSrc,
    }, ref).pipe(first()).subscribe({
      next: () => {
        this._snackBar.open('Stworzono artykuł!', 'close');
        this.isLoading.next(false);
      },
      error: () => {
        this._snackBar.open('Jakiś dziwny błąd', 'close');
        this.isLoading.next(false);
      }
    })
  }

  private getArticleForEdit(id: string) {
    this.articlesService.getArticle(id).subscribe({
      next: doc => {
        this.form.patchValue(doc.data() as ArticleModel);
        this.articleId.next(doc.id);
        this.form.get('image').clearValidators();
        this.form.get('image').updateValueAndValidity();
      },
      error: () => this._snackBar.open('Nie udało się pobrać artykułu', 'close')
    })
  }
}
