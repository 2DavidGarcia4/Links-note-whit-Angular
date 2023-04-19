import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';

const routes: Routes = [
  {
    title: 'Links note',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'Group links',
    path: 'group/:groupId',
    component: GroupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
