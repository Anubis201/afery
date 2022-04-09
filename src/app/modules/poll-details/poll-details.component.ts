import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { Election2019 } from 'src/app/services/global/data/election-2019';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollDetailsComponent implements OnInit {
  data = new BehaviorSubject<PollModel>(null)
  previousData = new BehaviorSubject<PollModel>(null)
  sortingMethod = new BehaviorSubject<'poll' | 'election'>('poll')

  private dataSnapshot: any
  readonly PollDataEnum = PollDataEnum

  constructor(
    private pollsService: PollsService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private datePipe: DatePipe,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id, title }: { id: string, title: string }) => {
      this.getData(id);
      this.data.subscribe(d => {
        if (!d || d.typeItems !== PollDataEnum.Partie) return

        this.previousPoll();
      })
    })
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  handleEditPoll() {
    this.router.navigate(
      ['/admin/polls'],
      { queryParams: { id: this.data.value?.id } }
    )
  }

  handleDeletePoll() {
    this.pollsService.deletePoll(this.data.value.id).subscribe({
      next: () => {
        this._snackBar.open('Ni ma sondażu', 'zamknij');
        this.router.navigate(['/']);
      },
      error: () => {
        this._snackBar.open('Nie udało się usunąć', 'zamknij');
      }
    })
  }

  previousPoll() {
    this.pollsService.getPreviousPoll(this.data.value.surveying, this.dataSnapshot).subscribe({
      next: data => {
        this.previousData.next(data);
        this.sortingMethod.next('poll');
      },
    })
  }

  previousElection() {
    this.previousData.next(Election2019);
    this.sortingMethod.next('election');
  }

  private getData(id: string) {
    this.pollsService.getSinglePoll(id).subscribe({
      next: doc => {
        this.dataSnapshot = doc;
        this.data.next({
          ...doc.data() as PollModel,
          when: (doc.data() as any).when.toDate(),
          id: doc.id,
        })
        this.titleService.setTitle(this.data.value.title + ' - Afery');
        this.meta.updateTag({ name:'description', content: `Sondaż ${this.data.value.surveying} z dnia ${this.datePipe.transform(this.data.value.when, 'yyyy.MM.dd')}` }, "name='description'");
      },
    })
  }
}
