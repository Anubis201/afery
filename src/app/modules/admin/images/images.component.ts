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

  addOtherImage(image: ImageModel) {

  }

  private getOthersImage() {
    this.imagesService.getAllOthersImages().subscribe({
      next: refs => {
        refs.items.forEach(item => {
          item.getDownloadURL().then(src => {
            this.othersImages.next(this.sortImages([
              ...this.othersImages.value,
              { name: item.name, src }
            ]))
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
            // TODO jak bedzie zbyt spowalaniac to zastwanowic sie na lepszym sortowaniem
            this.articleImages.next(this.sortImages([
              ...this.articleImages.value,
              { name: item.name, src }
            ]))
          })
        })
      },
    })
  }
}
