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

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    kind: new FormControl(ArticlesKindsEnum.Confirmed, Validators.required),
    entity: new FormControl(null, Validators.required), // partia/organizacja/pseudoInfluCoś
    costs: new FormControl(null),
  })

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
  ) { }

  ngOnInit() {
    this.form.get('type')?.patchValue(ArticlesTypesEnum.PoliticalParties);
    this.setItemsEntityOnTypeChange();
  }

  create(images: FileList | null) {
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
      this.form.get('entity')?.patchValue(null)

      switch(articleType) {
        case ArticlesTypesEnum.PoliticalParties:
          this.entityItems.next(ConvertEnum(PartiesEnum, 'number'));
          break;
        case ArticlesTypesEnum.People:
          this.entityItems.next([]);
          break;
        case ArticlesTypesEnum.Countries:
          this.entityItems.next([]);
          break;
      }
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
      imageSrc,
    }, ref).pipe(first()).subscribe({
      next: () => {
        this._snackBar.open('GOTOWE', 'close');
        this.isLoading.next(false);
      },
      error: () => {
        this._snackBar.open('Jakiś dziwny błąd', 'close');
        this.isLoading.next(false);
      }
    })
  }
}
