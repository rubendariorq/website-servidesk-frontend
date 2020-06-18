import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { MenuComponent } from './components/menu/menu.component';
import { DependencesListComponent } from './components/dependences-list/dependences-list.component';
import { LogoutBarComponent } from './components/logout-bar/logout-bar.component';
import { DependenciesAddComponent } from './components/dependencies-add/dependencies-add.component';
import { DependenciesEditComponent } from './components/dependencies-edit/dependencies-edit.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { HardwareListComponent } from './components/hardware/hardware-list/hardware-list.component';
import { ComputerAddComponent } from './components/hardware/computers/computer-add/computer-add.component';
import { UpsAddComponent } from './components/hardware/ups/ups-add/ups-add.component';
import { PeripheralsAddComponent } from './components/hardware/peripherals/peripherals-add/peripherals-add.component';
import { SectionLocationHistoryComponent } from './components/hardware/section-location-history/section-location-history.component';
import { SectionAssignComponent } from './components/hardware/ups/section-assign/section-assign.component';
import { SectionAssignComputerComponent } from './components/hardware/computers/section-assign-computer/section-assign-computer.component';
import { SectionAssignPeripheralComponent } from './components/hardware/peripherals/section-assign-peripheral/section-assign-peripheral.component';
import { SectionConnectedPrintersComponent } from './components/hardware/computers/section-connected-printers/section-connected-printers.component';
import { SectionNetworkConfigurationComponent } from './components/hardware/computers/section-network-configuration/section-network-configuration.component';
import { ListLicensesComponent } from './components/software/licenses/list-licenses/list-licenses.component';
import { AddLicenseComponent } from './components/software/licenses/add-license/add-license.component';
import { AddSoftwareComponent } from './components/software/add-software/add-software.component';
import { ListSoftwareComponent } from './components/software/list-software/list-software.component';

//Services
import { DependenciesService } from './services/dependencies.service';
import { UserService } from "./services/user/user.service";
import { HardwareService } from "./services/hardware/hardware.service";
import { LicenseService } from "./services/license/license.service";
import { SoftwareService } from "./services/software/software.service";
import { AssignSoftwareComponent } from './components/software/assign-software/assign-software.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    MenuComponent,
    DependencesListComponent,
    LogoutBarComponent,
    DependenciesAddComponent,
    DependenciesEditComponent,
    UserListComponent,
    UserAddComponent,
    HardwareListComponent,
    ComputerAddComponent,
    UpsAddComponent,
    PeripheralsAddComponent,
    SectionLocationHistoryComponent,
    SectionAssignComponent,
    SectionAssignComputerComponent,
    SectionAssignPeripheralComponent,
    SectionConnectedPrintersComponent,
    SectionNetworkConfigurationComponent,
    ListLicensesComponent,
    AddLicenseComponent,
    AddSoftwareComponent,
    ListSoftwareComponent,
    AssignSoftwareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DependenciesService,
    UserService,
    HardwareService,
    LicenseService,
    SoftwareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
