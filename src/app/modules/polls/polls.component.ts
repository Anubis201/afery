import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsComponent implements OnInit {
  allPolls = new BehaviorSubject<PollModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)
  showMore = new BehaviorSubject<boolean>(false)

  private lastItemSnapshot = null
  private readonly limit = 6

  get isAdmin() {
    return this.userService.isAdmin
  }

  constructor(
    private pollsService: PollsService,
    private meta: Meta,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.getPolls();
    this.metaTags();
  }

  handleEditPoll(id: string) {
    this.router.navigate(
      ['/admin/polls'],
      { queryParams: { id } }
    )
  }

  handleDeletePoll(id: string) {
    this.pollsService.deletePoll(id).subscribe({
      next: () => {
        this.allPolls.next(this.allPolls.value.filter(element => element.id !== id));
      },
      error: () => {
        this._snackBar.open('Nie udało sie usunąć sondażu', 'close');
      }
    })
  }

  getPolls(isMore = false) {
    this.isLoading.next(true);
    this.pollsService.getPolls(this.limit + 1, isMore, this.lastItemSnapshot).subscribe({
      next: docs => {
        let data: PollModel[] = [];
        let i = 0;

        docs.forEach(d => {
          data.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate(), id: d.id })
          if (this.limit - 1 === i) this.lastItemSnapshot = d;
          i++;
        })

        if (data.length === this.limit + 1) {
          this.showMore.next(true);
          data.pop();
        } else {
          this.showMore.next(false);
        }

        this.allPolls.next([
          ...this.allPolls.value,
          ...data,
        ]);
        this.isLoading.next(false);
      },
      error: () => this.isLoading.next(false)
    })
  }

  private metaTags() {
    this.titleService.setTitle('Sondaże');
    this.meta.updateTag({ name:'description', content:'Tu znajdziesz najnowsze sondaże polskich partii. Zapraszam na inne strony, gdzie zobaczysz afery naszej "niesamowitej" polityki.' }, "name='description'");
  }
}
