import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';

interface itemsModel {
  text: string,
  hours: Date
}

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent implements OnInit {
  @Input() order: OrderEnum
  @Input() time: FormControl

  @Output() changeOrder = new EventEmitter<OrderEnum>()

  readonly OrderEnum = OrderEnum
  items: itemsModel[]

  ngOnInit() {
    const now = moment(),
      day = now.subtract(1, 'days').toDate(),
      week = now.subtract(1, 'weeks').toDate(),
      month = now.subtract(1, 'months').toDate(),
      year = now.subtract(1, 'years').toDate();

    this.time.patchValue(day);

    this.items = [
      {
        text: 'Dzień',
        hours: day,
      },
      {
        text: 'Tydzień',
        hours: week,
      },
      {
        text: 'Miesiąc',
        hours: month,
      },
      {
        text: 'Rok',
        hours: year,
      },
    ]
  }
}
