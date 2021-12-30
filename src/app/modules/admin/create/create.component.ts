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
    this.articlesService.addArticle({
      title: this.form.get('title')?.value,
      text: this.form.get('text')?.value,
      type: this.form.get('type')?.value,
      kind: this.form.get('kind')?.value,
      entity: this.form.get('entity')?.value,
      createDate: new Date(),
    }).pipe(first()).subscribe({
      next: ref => {
        this.addArticleImage(ref.id, image);
        this._snackBar.open('Artykuł został wysłany do bazy 1/2', 'close');
      },
      error: () => {
        this._snackBar.open('Jakiś dziwny błąd', 'close');
        this.isLoading.next(false);
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

  private addArticleImage(docId: string, file: File) {
    this.imageService.addImage(docId, file).subscribe(value => {
      if (value === 100) {
        this._snackBar.open('Koniec dodawania zdjęcia! 2/2', 'close');
        this.isLoading.next(false);
      }
    })
  }
}
