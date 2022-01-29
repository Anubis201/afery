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
