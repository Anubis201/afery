import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {

  @Input() surveying: FormControl
  @Input() when: FormControl
  @Input() people: FormControl
  @Input() forWhom: FormControl

}
