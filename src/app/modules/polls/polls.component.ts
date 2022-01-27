import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
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

  get isAdmin() {
    return this.userService.isAdmin
  }

  constructor(
    private pollsService: PollsService,
    private meta: Meta,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
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

  private getPolls() {
    this.isLoading.next(true);
    this.pollsService.getPolls().subscribe({
      next: docs => {
        this.isLoading.next(false);
        let data: PollModel[] = [];
        docs.forEach(d =>{
          data.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate(), id: d.id })
        })
        this.allPolls.next(data);
      },
      error: () => {
        this.isLoading.next(false);
      }
    })
  }

  private metaTags() {
    this.meta.updateTag({ name:'description', content:'Tu znajdziesz najnowsze sondaże polskich partii. Zapraszam na inne strony, gdzie zobaczysz żałosne afery naszej polityki.' }, "name='description'");
  }
}
