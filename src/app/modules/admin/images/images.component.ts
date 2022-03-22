import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImageModel } from 'src/app/models/others/image.model';
import { ImagesService } from 'src/app/services/collections/images/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {
  articleImages = new BehaviorSubject<ImageModel[]>([])
  othersImages = new BehaviorSubject<ImageModel[]>([])

  constructor(
    private imagesService: ImagesService,
  ) { }

  ngOnInit() {
    this.getArticlesImage();
    this.getOthersImage();
  }

  sortImages(images: ImageModel[]) {
    const comapre = (a, b) => {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    }

    return images.sort(comapre)
  }

  private getOthersImage() {
    this.imagesService.getAllOthersImages().subscribe({
      next: refs => {
        refs.items.forEach(item => {
          item.getDownloadURL().then(src => {
            this.othersImages.next([
              ...this.othersImages.value,
              { name: item.name, src }
            ]);
            console.log(this.othersImages.value)
          })
        })
      },
    })
  }

  private getArticlesImage() {
    this.imagesService.getAllArticlesImage().subscribe({
      next: refs => {
        refs.items.forEach(item => {
          item.getDownloadURL().then(src => {
            this.articleImages.next([
              ...this.articleImages.value,
              { name: item.name, src }
            ]);
          })
        })
      },
    })
  }
}
