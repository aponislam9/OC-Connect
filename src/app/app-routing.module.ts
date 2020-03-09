import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'event-view/:event-id',
    loadChildren: () => import('./event-view/event-view.module').then( m => m.EventViewPageModule)
  },
  {
    path: 'comment-view',
    loadChildren: () => import('./comment-view/comment-view.module').then( m => m.CommentViewPageModule)
  },
  {
    path: 'sign-in-modal',
    loadChildren: () => import('./sign-in-modal/sign-in-modal.module').then( m => m.SignInModalPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
