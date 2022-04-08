import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, first } from 'rxjs';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { ImagesService } from 'src/app/services/collections/images/images.service';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';

enum ImageEnum {
  new,
  old,
}

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
    imageDesc: new FormControl(null),
    type: new FormControl(null, Validators.required),
    entity: new FormControl(null, Validators.required), // partie // jest required ponieważ domyślnie przyjmuje partie jako domyślny tryb
    customName: new FormControl(null), // uzywane w kategoriach politycy oraz reszta // odwrotnie do góry
    costs: new FormControl(null),
    imageSrc: new FormControl(null), // WYŁĄCZNIE gdy biore z gotowe zdjecie z bazy
    articleWrite: new FormControl(ArticleWriteEnum.normal, Validators.required),
    liveItems: new FormArray([]),
  })

  articleId = new BehaviorSubject<string>('') // jest on uzywany wylacznie podczas edycji artykulu, czyli jednoczesnie jest uzywane aby sprawdzic czy jest isEdit mode
  isLoading = new BehaviorSubject<boolean>(false)
  entityItems = new BehaviorSubject<PartiesEnum[]>(ConvertEnum(PartiesEnum, 'number'))
  tags = new BehaviorSubject<string[]>([])
  articleWriteSubject = new BehaviorSubject<ArticleWriteEnum>(ArticleWriteEnum.normal)
  imageType = new FormControl(ImageEnum.new)

  readonly articleTypes = ConvertEnum(ArticlesTypesEnum, 'string')
  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly ImageEnum = ImageEnum
  readonly ArticleWriteEnum = ArticleWriteEnum
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
    this.onArticleWriteChange();

    this.activatedRoute.queryParams.subscribe(({ id }) => {
      if (id) {
        this.getArticleForEdit(id);
      } else {
        this.articleId.next('');
      }
    })
  }

  handleSubmit(images: FileList | null) {
    // TODO sprawdzenie obiektu form czy jest wlasciwy tzn
    if (this.articleId.value.length) {
      // edycja artykulu
      this.edit();
    } else {
      // tworzenie nowego artykulu
      this.create(images);
    }
  }

  onChangeTypeImage(img: ImageEnum) {
    if (img === ImageEnum.new) {
      this.form.get('image').addValidators(Validators.required);
      this.form.get('imageSrc').clearValidators();
    } else {
      this.form.get('image').clearValidators();
      this.form.get('imageSrc').addValidators(Validators.required);
    }

    this.form.get('image').updateValueAndValidity();
    this.form.get('imageSrc').updateValueAndValidity();
  }

  private edit() {
    this.isLoading.next(true);
    this.articlesService.editArticle({ ...(this.form.value as ArticleModel), tags: this.tags.value }, this.articleId.value).subscribe({
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
    const ref = this.articlesService.getRef().doc().ref;
    if (this.imageType.value === ImageEnum.old) {
      this.addArticle(ref, this.form.get('imageSrc').value);
      return
    }

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
    if (last3Characters !== 'jpg' && last3Characters !== 'png' && last3Characters !== 'jpeg') {
      this._snackBar.open('Tylko png i jpg', 'close');
      return
    }

    this.isLoading.next(true);

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
        case ArticlesTypesEnum.Army:
          this.form.get('entity').clearValidators();
          this.form.get('entity').patchValue(null);
          this.form.get('customName').clearValidators();
          this.form.get('customName').patchValue(null);
          break;
      }

      this.form.get('customName')?.updateValueAndValidity();
      this.form.get('entity')?.updateValueAndValidity();
    })
  }

  private addArticle(ref: DocumentReference<unknown>, imageSrc: string) {
    this.articlesService.addArticle({
      title: this.form.get('title')?.value,
      text: this.form.get('text')?.value,
      type: this.form.get('type')?.value,
      entity: this.form.get('entity')?.value,
      costs: this.form.get('costs')?.value,
      customName: this.form.get('customName')?.value,
      subtitle: this.form.get('subtitle')?.value,
      imageDesc: this.form.get('imageDesc')?.value,
      createDate: new Date(),
      articleWrite: this.form.get('articleWrite')?.value,
      viewership: 1,
      tags: this.tags.value,
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
        const data = doc.data() as ArticleModel;
        this.form.patchValue(data);
        this.articleId.next(doc.id);
        this.tags.next(data?.tags ?? []);
        this.form.get('image').clearValidators();
        this.form.get('image').updateValueAndValidity();
      },
      error: () => this._snackBar.open('Nie udało się pobrać artykułu', 'close')
    })
  }

  private onArticleWriteChange() {
    this.form.get('articleWrite').valueChanges.subscribe((val: ArticleWriteEnum) => {
    const refItems = this.form.get('liveItems') as FormArray;
      if (val === ArticleWriteEnum.live && refItems.length) {
        refItems.push(this.addNewLiveItem());
      } else if (val === ArticleWriteEnum.normal) {

      }

      this.articleWriteSubject.next(val);
    })
  }

  private addNewLiveItem() {
    return new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      text: new FormControl(null, Validators.required),
    })
  }
}
