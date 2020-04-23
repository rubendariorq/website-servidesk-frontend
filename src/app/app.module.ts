import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { MenuComponent } from './components/menu/menu.component';
import { DependencesListComponent } from './components/dependences-list/dependences-list.component';
import { LogoutBarComponent } from './components/logout-bar/logout-bar.component';
import { DependenciesAddComponent } from './components/dependencies-add/dependencies-add.component';
import { DependenciesEditComponent } from './components/dependencies-edit/dependencies-edit.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
