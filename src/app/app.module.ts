import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/services/user.service';
import { SeverityService } from './shared/services/severity.service';
import { PlaceService } from './shared/services/place.service';
import {HttpClientModule} from '@angular/common/http';
import { AddMishapComponent } from './add-mishap/add-mishap.component';
import { Error404Component } from './error404/error404.component';
import {MishapService} from './shared/services/mishap.service';
import { DetailsMishapComponent } from './details-mishap/details-mishap.component';
import { TaskComponent } from './task/task.component';
import { TaskService} from './shared/services/task.service';
import {StateService} from './shared/services/state.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddPlaceComponent } from './add-place/add-place.component';
import { EmailComponent } from './email/email.component';
import { HeaterComponent } from './heater/heater.component';
import {ModeService} from './shared/services/mode.service';
import { AddModeComponent } from './add-mode/add-mode.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    DashboardComponent,
    HeaderComponent,
    AddMishapComponent,
    Error404Component,
    DetailsMishapComponent,
    TaskComponent,
    AddPlaceComponent,
    EmailComponent,
    HeaterComponent,
    AddModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    SeverityService,
    MishapService,
    PlaceService,
    TaskService,
    StateService,
    TaskService,
    ModeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
