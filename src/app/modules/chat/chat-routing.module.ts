import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatCommentsComponent } from './chat-comments/chat-comments.component';
import { ChatComponent } from './chat.component';
import { SingleDiscussionComponent } from './single-discussion/single-discussion.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'dyskusja/:discussionId',
        component: SingleDiscussionComponent,
      },
      {
        path: 'dyskusje',
        component: ChatCommentsComponent,
      },
      {
        path: '**',
        redirectTo: 'dyskusje',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
