import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  addOtherImage(name: string) {
    const path = '/images-others/' + name;
  }

  addImage(docId: string, file: File) {
    const path = '/images-articles/' + docId;
    const uploadTask = this.storage.upload(path, file);

    return uploadTask.percentageChanges();
  }

  getImage(articleUid: string = '') {
    const ref = this.storage.ref('/images-articles').child(articleUid);

    return ref.getDownloadURL();
  }

  getAllImages() {
    const ref = this.storage.ref('/images-articles');

    return ref.listAll()
  }

  deleteImage(articleId: string) {
    const ref = this.storage.ref('/images-articles').child(articleId);

    return ref.delete();
  }
}
