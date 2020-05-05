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

//Services
import { DependenciesService } from './services/dependencies.service';
import { UserService } from "./services/user/user.service";
import { UserAddComponent } from './components/users/user-add/user-add.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DependenciesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
