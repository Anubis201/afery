import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';

interface itemsModel {
  text: string,
  hours: number
}

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {
  @Input() order: OrderEnum

  @Output() changeOrder = new EventEmitter<OrderEnum>()

  time = new FormControl(24)

  readonly OrderEnum = OrderEnum
  readonly items: itemsModel[] = [
    {
      text: '24 godziny',
      hours: 24,
    },
    {
      text: '7 dni',
      hours: 168,
    },
    {
      text: '1 miesiąc',
      hours: 720,
    },
    {
      text: '1 rok',
      hours: 8765,
    },
  ]
}
