import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, from } from 'rxjs';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';


interface Menu {
  href: string
  text: string
  icon: string
  badgeNumber?: number
  function?: () => void
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListComponent implements OnInit {
  items = new BehaviorSubject<Menu[]>([])

  private newCommentsDocs: any

  constructor(
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.items.next([
      {
        href: 'create',
        text: 'Stwórz artykuł',
        icon: 'mail_outline'
      },
      {
        href: 'comments',
        text: 'Komentarze',
        icon: 'comment',
        function: () => {
          this.updateIsNewComments();
        },
      },
      {
        href: 'polls',
        text: 'Dodaj sondaż',
        icon: 'poll'
      },
      {
        href: 'images',
        text: 'Zdjęcia',
        icon: 'collections'
      }
    ]);
    this.checkNewComments();
  }

  private updateIsNewComments() {
    const batch = this.db.firestore.batch();
    this.newCommentsDocs.forEach(doc => batch.update(doc.ref, { isNew: false }));

    from(batch.commit()).subscribe({
      next: () => {
        this.checkNewComments();
      },
      error: () => this._snackBar.open('Nie udało się pobrać liczby nowych komentarzy', 'close')
    })
  }

  private checkNewComments() {
    this.commentsService.getAdminNumberOfNewComments().subscribe({
      next: docs => {
        this.newCommentsDocs = docs;
        let allItems = this.items.value;
        allItems[1].badgeNumber = docs.size;
        this.items.next(allItems);
      },
      error: () => this._snackBar.open('Nie udało się pobrać liczby nowych komentarzy', 'close')
    })
  }
}
