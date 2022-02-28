import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatCommentsComponent } from './chat-comments/chat-comments.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { SingleDiscussionComponent } from './single-discussion/single-discussion.component';
import { WriteChatComponent } from './chat-comments/write-chat/write-chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatCommentsComponent,
    ChatHeaderComponent,
    SingleDiscussionComponent,
    WriteChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
  ]
})
export class ChatModule { }
