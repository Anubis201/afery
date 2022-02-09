import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCommentsComponent implements OnInit {
  comments = new BehaviorSubject<CommentModel[]>([])

  constructor(
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getComments();
  }

  goToArticle(id: string) {
    this.router.navigateByUrl('/../../artykul/' + id)
  }

  getComments() {
    this.commentsService.getAdminAllComments().subscribe({
      next: commentsDocs => {
        let allComments: CommentModel[] = [];
        commentsDocs.forEach(comment => {
          allComments.push({
            ...comment.data() as CommentModel,
            date: (comment.data() as any).date.toDate(),
            id: comment.id
          });
        });
        this.comments.next(allComments);
      },
      error: () => {
        this._snackBar.open('Nie udało się pobrać komentarzy', 'close');
      }
    })
  }

  deleteComment(id: string) {
    this.commentsService.deteleComment(id).subscribe({
      next: () => {
        this.comments.next(this.comments.value.filter(filterV => filterV.id !== id));
        this._snackBar.open('Komentarz został usunięty', 'close');
      },
      error: () => {
        this._snackBar.open('Błąd', 'close');
      }
    })
  }
}
