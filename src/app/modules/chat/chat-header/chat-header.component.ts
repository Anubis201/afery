import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHeaderComponent {
  @Input() order: OrderEnum

  @Output() changeOrder = new EventEmitter<OrderEnum>()

  readonly OrderEnum = OrderEnum
}
