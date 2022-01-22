import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';

@Component({
  selector: 'app-add-polls',
  templateUrl: './add-polls.component.html',
  styleUrls: ['./add-polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPollsComponent implements OnInit {
  form = new FormGroup({
    parties: new FormArray([ this.createItem() ]),
    surveying: new FormControl(null, Validators.required),
    when: new FormControl(null, Validators.required),
    people: new FormControl(null),
    forWhom: new FormControl(null),
  })

  isLoading = new BehaviorSubject<boolean>(false)
  idPoll = new BehaviorSubject<string>('')

  constructor(
    private pollsService: PollsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ id }) => {
      if (id) {
        this.getPollDataForEdit(id);
      } else {
        this.idPoll.next('');
      }
    })
  }

  handleSubmit() {
    if (this.idPoll.value.length) {
      // edycja artykulu
      this.editPoll();
    } else {
      this.addPoll();
    }
  }

  addItem() {
    (this.form.get('parties') as FormArray).push(this.createItem());
  }

  deleteItem(index: number) {
    (this.form.get('parties') as FormArray).removeAt(index);
  }

  private editPoll() {
    this.isLoading.next(true);
    this.pollsService.editPoll(this.form.value, this.idPoll.value).subscribe({
      next: () => {
        this.isLoading.next(false);
        this._snackBar.open('Sondaż został zmodyfikowany', 'close');
      },
      error: () => {
        this.isLoading.next(false);
        this._snackBar.open('Nie udało się zmodyfikować sondażu', 'close');
      }
    })
  }

  private addPoll() {
    this.isLoading.next(true);
    this.pollsService.addPoll(this.form.value).subscribe({
      next: () => {
        this.isLoading.next(false);
        this._snackBar.open('Sondaż został dodany', 'close');
      },
      error: () => {
        this.isLoading.next(false);
        this._snackBar.open('Nie udało się dodać sondażu', 'close');
      }
    })
  }

  private getPollDataForEdit(id: string) {
    this.pollsService.getSinglePoll(id).subscribe({
      next: doc => {
        let data = doc.data() as PollModel;

        this.form.patchValue({
          ...data,
          when: (data as any).when.toDate(),
        });

        (this.form.get('parties') as FormArray).controls = [];

        data.parties.forEach(element => {
          (this.form.get('parties') as FormArray).push(
            new FormGroup({
              party: new FormControl(element.party, Validators.required),
              percentage: new FormControl(element.percentage, Validators.required),
          })
        )})

        this.idPoll.next(doc.id);
      },
      error: () => this._snackBar.open('Nie udało się pobrać sondażu dla edycji', 'close')
    })
  }

  private createItem() {
    return new FormGroup({
      party: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
    })
  }
}
