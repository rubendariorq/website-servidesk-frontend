import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DependencesListComponent } from './components/dependences-list/dependences-list.component';
import { DependenciesAddComponent } from './components/dependencies-add/dependencies-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/login',
    pathMatch: 'full'
  },
  {
    path: 'users/login',
    component: LoginComponent
  },
  {
    path: 'users/forgot',
    component: ForgotComponent
  },
  {
    path: 'dependencies',
    component: DependencesListComponent
  },
  {
    path: 'add-dependencie',
    component: DependenciesAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
