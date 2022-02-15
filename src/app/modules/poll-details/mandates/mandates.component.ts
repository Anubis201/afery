import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';

@Component({
  selector: 'app-mandates',
  templateUrl: './mandates.component.html',
  styleUrls: ['./mandates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MandatesComponent {
  @Input() set parties(parties: PartyCharModel[]) {

    this.countMandates(parties);
  }

  mandates = new BehaviorSubject<any[]>([])

  private countMandates(parties: PartyCharModel[]) {

  }
}
