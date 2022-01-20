import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-polls',
  templateUrl: './add-polls.component.html',
  styleUrls: ['./add-polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPollsComponent {
  form = new FormGroup({
    parties: new FormArray([ this.createItem() ]),
    surveying: new FormControl(null, Validators.required),
    when: new FormControl(null, Validators.required),
    people: new FormControl(null),
    forWhom: new FormControl(null),
  })

  isLoading = new BehaviorSubject<boolean>(false)

  constructor() { }

  addPoll() {

  }

  addItem() {
    (this.form.get('parties') as FormArray).push(this.createItem());
  }

  deleteItem(index: number) {
    (this.form.get('parties') as FormArray).removeAt(index);
  }

  private createItem() {
    return new FormGroup({
      party: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
    })
  }
}
