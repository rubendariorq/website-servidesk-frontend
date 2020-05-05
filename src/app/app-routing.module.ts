import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DependencesListComponent } from './components/dependences-list/dependences-list.component';
import { DependenciesAddComponent } from './components/dependencies-add/dependencies-add.component';
import { DependenciesEditComponent } from './components/dependencies-edit/dependencies-edit.component';
import { UserListComponent } from "./components/users/user-list/user-list.component";
import { UserAddComponent } from "./components/users/user-add/user-add.component";

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
    path: 'dependencies/add',
    component: DependenciesAddComponent
  },
  {
    path: 'dependencies/edit/:id',
    component: DependenciesEditComponent
  },
  {
    path: 'users',
    component: UserListComponent 
  },
  {
    path: 'users/add',
    component: UserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
