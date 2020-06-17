import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DependencesListComponent } from './components/dependences-list/dependences-list.component';
import { DependenciesAddComponent } from './components/dependencies-add/dependencies-add.component';
import { DependenciesEditComponent } from './components/dependencies-edit/dependencies-edit.component';
import { UserListComponent } from "./components/users/user-list/user-list.component";
import { UserAddComponent } from "./components/users/user-add/user-add.component";
import { HardwareListComponent } from "./components/hardware/hardware-list/hardware-list.component";
import { ComputerAddComponent } from "./components/hardware/computers/computer-add/computer-add.component";
import { UpsAddComponent } from "./components/hardware/ups/ups-add/ups-add.component";
import { PeripheralsAddComponent } from "./components/hardware/peripherals/peripherals-add/peripherals-add.component";
import { ListLicensesComponent } from "./components/software/licenses/list-licenses/list-licenses.component";
import { AddLicenseComponent } from "./components/software/licenses/add-license/add-license.component";
import { AddSoftwareComponent } from "./components/software/add-software/add-software.component";
import { ListSoftwareComponent } from "./components/software/list-software/list-software.component";

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
  },
  {
    path: 'users/edit/:id',
    component: UserAddComponent
  },
  {
    path: 'hardware',
    component: HardwareListComponent
  },
  {
    path: 'hardware/computers/add',
    component: ComputerAddComponent
  },
  {
    path: 'hardware/ups/add',
    component: UpsAddComponent
  },
  {
    path: 'hardware/peripherals/add',
    component: PeripheralsAddComponent
  },
  {
    path: 'hardware/computer/edit/:id',
    component: ComputerAddComponent
  },
  {
    path: 'hardware/ups/edit/:id',
    component: UpsAddComponent
  },
  {
    path: 'hardware/peripheral/edit/:id',
    component: PeripheralsAddComponent
  },
  {
    path: 'hardware/ups/view/:id',
    component: UpsAddComponent
  },
  {
    path: 'hardware/peripheral/view/:id',
    component: PeripheralsAddComponent
  },
  {
    path: 'hardware/computer/view/:id',
    component: ComputerAddComponent
  },
  {
    path: 'licenses',
    component: ListLicensesComponent
  },
  {
    path: 'licenses/add',
    component: AddLicenseComponent
  },
  {
    path: 'licenses/:id',
    component: AddLicenseComponent
  },
  {
    path: 'software',
    component: ListSoftwareComponent
  },
  {
    path: 'software/add',
    component: AddSoftwareComponent
  },
  {
    path: 'software/:id',
    component: AddSoftwareComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
