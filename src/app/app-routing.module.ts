import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/all-articles/all-articles.module').then(m => m.AllArticlesModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'artykul',
    loadChildren: () => import('./modules/article-page/article-page.module').then(m => m.ArticlePageModule),
  },
  {
    path: 'sondaze',
    loadChildren: () => import('./modules/polls/polls.module').then(m => m.PollsModule),
  },
  {
    path: 'szukaj',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'sondaz',
    loadChildren: () => import('./modules/poll-details/poll-details.module').then(m => m.PollDetailsModule),
  },
  {
    path: 'bulwar',
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: 'konto',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'tag',
    loadChildren: () => import('./modules/tag-view/tag-view.module').then(m => m.TagViewModule),
  },
  {
    path: 'test-wyborczy',
    loadChildren: () => import('./modules/election-test/election-test.module').then(m => m.ElectionTestModule),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
