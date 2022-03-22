import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImagesService } from 'src/app/services/collections/images/images.service';

interface ImageModel {
  name: string
  src: string
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {
  images = new BehaviorSubject<ImageModel[]>([])
  isLoading = new BehaviorSubject<boolean>(true)

  constructor(
    private imagesService: ImagesService,
  ) { }

  ngOnInit() {
    this.getRef();
  }

  toArticlePage(id: string) {
    return `/artykul/${id}/cos`
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

  private getRef() {
    this.imagesService.getAllImages().subscribe({
      next: refs => {
        refs.items.forEach(item => {
          item.getDownloadURL().then(src => {
            this.images.next([
              ...this.images.value,
              { name: item.name, src }
            ]);
          })
        })
      },
    })
  }
}
