import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
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
    viewType: new FormControl(ViewPullEnum.Normalny, Validators.required),
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
      this.onViewTypeChange();
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
    switch (this.form.get('typeItems').value) {
      case PollDataEnum.Partie:
        (this.form.get('items') as FormArray).push(this.createPartyItem());
        break
      case PollDataEnum.Inne:
        this.createTextItem();
        break
      case PollDataEnum.Prezydenci:
        this.createPresidentItem();
        break
    }
  }

  deleteItem(index: number) {
    (this.form.get('items') as FormArray).removeAt(index);
  }

  private onViewTypeChange() {
    this.form.get('typeItems').valueChanges.subscribe((val: PollDataEnum) => {
      if (val !== PollDataEnum.Inne) {
        this.form.get('viewType').patchValue(ViewPullEnum.Normalny)
      }
    })
  }

  private handleTypeChange() {
    this.form.get('typeItems').valueChanges.subscribe((value: PollDataEnum) => {
      (this.form.get('items') as FormArray).controls = [];
      this.loadingItems.next(true);

      switch(value) {
        case PollDataEnum.Partie:
          this.createPartyDefault();
          break
        case PollDataEnum.Inne:
          this.createTextItem();
          break
        case PollDataEnum.Prezydenci:
          this.createPresidentItem()
          break
      }

      this._ref.detectChanges();
      this.loadingItems.next(false);
      })
  }

  private checkTitle() {
    if (!this.form.get('title').value?.length) {
      this.form.get('title').patchValue('Sonda?? ' + this.form.get('surveying').value);
    }
  }

  private editPoll() {
    this.pollsService.editPoll(this.form.value, this.idPoll.value).subscribe({
      next: () => {
        this.isLoading.next(false);
        this._snackBar.open('Sonda?? zosta?? zmodyfikowany', 'close');
      },
      error: () => {
        this.isLoading.next(false);
        this._snackBar.open('Nie uda??o si?? zmodyfikowa?? sonda??u', 'close');
      }
    })
  }

  private addPoll() {
    this.pollsService.addPoll(this.form.value).subscribe({
      next: () => {
        this.isLoading.next(false);
        this._snackBar.open('Sonda?? zosta?? dodany', 'close');
      },
      error: () => {
        this.isLoading.next(false);
        this._snackBar.open('Nie uda??o si?? doda?? sonda??u', 'close');
      }
    })
  }

  private getPollDataForEdit(id: string) {
    this.pollsService.getSinglePoll(id).subscribe({
      next: doc => {
        const data = doc.data() as PollModel;

        this.form.patchValue({
          ...data,
          when: (data as any).when.toDate(),
        });

        (this.form.get('items') as FormArray).controls = [];

        switch(data.typeItems) {
          case PollDataEnum.Partie:
            data.items.forEach(element => {
              (this.form.get('items') as FormArray).push(
                new FormGroup({
                  party: new FormControl(element.party, Validators.required),
                  percentage: new FormControl(element.percentage, Validators.required),
              })
            )})
            break;
          case PollDataEnum.Prezydenci:
            data.items.forEach(element => {
              (this.form.get('items') as FormArray).push(
                new FormGroup({
                  percentage: new FormControl(element.percentage, Validators.required),
                  president: new FormControl(element.president, Validators.required),
              })
            )})
            break;
          case PollDataEnum.Inne:
            data.items.forEach(element => {
              (this.form.get('items') as FormArray).push(
                new FormGroup({
                  text: new FormControl(element.text, Validators.required),
                  color: new FormControl(element.color, Validators.required),
                  percentage: new FormControl(element.percentage, Validators.required),
              })
            )})
            break;
        }

        this.idPoll.next(doc.id);
      },
      error: () => this._snackBar.open('Nie uda??o si?? pobra?? sonda??u dla edycji', 'close')
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

  private createPresidentItem() {
    const ref = (this.form.get('items') as FormArray);
    ref.push(new FormGroup({
      president: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
    }));
  }

  private createTextItem() {
    const ref = (this.form.get('items') as FormArray);
    ref.push(new FormGroup({
      text: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
      color: new FormControl('red', Validators.required)
    }));
  }

  private createPartyItem(party: PartiesEnum | null = null, pertcantage: number | null = null) {
    return new FormGroup({
      party: new FormControl(party, Validators.required),
      percentage: new FormControl(pertcantage, Validators.required),
    })
  }
}
