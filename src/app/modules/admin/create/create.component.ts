import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { ArticlesKindsEnum } from 'src/app/models/articles/enums/articles-kinds.enum';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
    type: new FormControl(ArticlesTypesEnum.PoliticalParties, Validators.required),
    kind: new FormControl(ArticlesKindsEnum.Confirmed, Validators.required),
  })

  isLoading = new BehaviorSubject<boolean>(false)

  readonly articleTypes = ConvertEnum(ArticlesTypesEnum)
  readonly articleKinds = ConvertEnum(ArticlesKindsEnum)
  private readonly maxFileSize = 2097152 // 2MB

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private storage: AngularFireStorage,
  ) { }

  create(images: FileList | null) {
    if (images === null) {
      this._snackBar.open('Brak obrazu', 'close');
      return
    }

    const image = images[0]
    if (image.size > this.maxFileSize) {
      this._snackBar.open('Max wielkość pliku to 2MB', 'close');
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
      createDate: new Date(),
    }).subscribe({
      next: ref => {
        this.addImage(ref.id, image);
        this._snackBar.open('Artykuł został wysłany do bazy 1/2', 'close');
      },
      error: () => {
        this._snackBar.open('Jakiś dziwny błąd', 'close');
        this.isLoading.next(false);
      }
    })
  }

  addImage(docId: string, file: File) {
    const path = '/images-articles/' + docId;
    const uploadTask = this.storage.upload(path, file);

    uploadTask.percentageChanges().subscribe(value => {
      if (value === 100) {
        this._snackBar.open('Koniec dodawania zdjęcia! 2/2', 'close');
        this.isLoading.next(false);
      }
    })
  }
}
