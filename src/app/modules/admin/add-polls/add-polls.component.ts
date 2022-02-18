import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
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
    items: new FormArray([]),
    title: new FormControl(null),
    surveying: new FormControl(null, Validators.required),
    when: new FormControl(null, Validators.required),
    people: new FormControl(null),
    forWhom: new FormControl(null),
    typeItems: new FormControl(PollDataEnum.Partie)
  })

  isLoading = new BehaviorSubject<boolean>(false)
  idPoll = new BehaviorSubject<string>('')
  loadingItems = new BehaviorSubject<boolean>(false)

  readonly PollDataEnum = PollDataEnum

  constructor(
    private pollsService: PollsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ id }) => {
      if (id) {
        this.addEmptyItem();
        this.getPollDataForEdit(id);
      } else {
        this.idPoll.next('');
        this.createPartyDefault();
      }

      this.handleTypeChange();
    })
  }

  handleSubmit() {
    this.isLoading.next(true);
    this.checkTitle();

    if (this.idPoll.value.length) {
      // edycja artykulu
      this.editPoll();
    } else {
      this.addPoll();
    }
  }

  addEmptyItem() {
    switch(this.form.get('typeItems').value) {
      case PollDataEnum.Partie:
        (this.form.get('items') as FormArray).push(this.createPartyItem());
        break
      case PollDataEnum.Teksty:
        this.createTextItem();
        break
    }
  }

  deleteItem(index: number) {
    (this.form.get('items') as FormArray).removeAt(index);
  }

  private handleTypeChange() {
    this.form.get('typeItems').valueChanges.subscribe((value: PollDataEnum) => {
      (this.form.get('items') as FormArray).controls = [];
      this.loadingItems.next(true);

      switch(value) {
        case PollDataEnum.Partie:
          this.createPartyDefault();
          break
        case PollDataEnum.Teksty:
          this.createTextItem();
          break
      }

      this._ref.detectChanges();
      this.loadingItems.next(false);
      })
  }

  private checkTitle() {
    if (!this.form.get('title').value?.length) {
      this.form.get('title').patchValue('Sondaż ' + this.form.get('surveying').value);
    }
  }

  private editPoll() {
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

        (this.form.get('items') as FormArray).controls = [];

        data.items.forEach(element => {
          (this.form.get('items') as FormArray).push(
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

  private createPartyDefault() {
    const ref = (this.form.get('items') as FormArray);
    ref.push(this.createPartyItem(PartiesEnum.pis));
    ref.push(this.createPartyItem(PartiesEnum.po));
    ref.push(this.createPartyItem(PartiesEnum.polska2050));
    ref.push(this.createPartyItem(PartiesEnum.konfederacja));
    ref.push(this.createPartyItem(PartiesEnum.lewica));
    ref.push(this.createPartyItem(PartiesEnum.psl));
  }

  private createTextItem() {
    const ref = (this.form.get('items') as FormArray);
    ref.push(new FormGroup({
      text: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
    }));
  }

  private createPartyItem(party: PartiesEnum | null = null, pertcantage: number | null = null) {
    return new FormGroup({
      party: new FormControl(party, Validators.required),
      percentage: new FormControl(pertcantage, Validators.required),
    })
  }
}
