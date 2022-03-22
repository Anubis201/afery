import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ImagesService } from 'src/app/services/collections/images/images.service';

@Component({
  selector: 'app-add-no-article-image',
  templateUrl: './add-no-article-image.component.html',
  styleUrls: ['./add-no-article-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNoArticleImageComponent {
  isSaving = new BehaviorSubject<boolean>(false)

  private readonly maxFileSize = 1048576 // 1MB

  constructor(
    private _snackBar: MatSnackBar,
    private imageService: ImagesService,
  ) { }

  sendImage(images: FileList) {
    this.isSaving.next(true)

    if (!images.length) {
      this._snackBar.open('Brak obrazu', 'close');
      this.isSaving.next(false)
      return
    }

    const image = images[0]
    if (image.size > this.maxFileSize) {
      this._snackBar.open('Max wielkość pliku to 1MB', 'close');
      this.isSaving.next(false)
      return
    }

    const last3Characters = images[0].name.slice(-3)
    if (last3Characters !== 'jpg' && last3Characters !== 'png' && last3Characters !== 'jpeg') {
      this._snackBar.open('Tylko png i jpg', 'close');
      this.isSaving.next(false)
      return
    }

    this.imageService.addImage('test', image).subscribe(value => {
      if (value === 100) {
        this._snackBar.open('Zdjęcie zostało dodane', 'close');
        this.isSaving.next(false);
      }
    })
  }
}
