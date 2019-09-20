import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMishapComponent } from './add-mishap/add-mishap.component';
import { Error404Component } from './error404/error404.component';
import { DetailsMishapComponent } from './details-mishap/details-mishap.component';
import {HeaterComponent} from './heater/heater.component';


const routes: Routes = [
  { path: '', redirectTo: '/connection', pathMatch: 'full' },
  { path: 'connection', component: ConnectionComponent },
  { path: 'heater', component: HeaterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-mishap', component: AddMishapComponent },
  { path: 'details-mishap/:idMishap', component: DetailsMishapComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
