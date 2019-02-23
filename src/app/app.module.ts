import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// Components
import {AuthLoginService} from './services/auth-login.service'
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { EmployeesComponent } from './components/employees/employees.component';

import { EmployeeDialog } from './components/employees/employee-dialog';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AgenciesComponent } from './components/agencies/agencies.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardService } from './services/dashboard.service';
import { SubscriberDialog } from './components/subscribers/subscriber-dialog';
import { AgencyDialog } from './components/agencies/agency-dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    SubscribersComponent,
    EmployeesComponent,
    EmployeeDialog,
    NotFoundComponent,
    AgenciesComponent,
    ForgotPasswordComponent,
    SubscriberDialog,
    AgencyDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AppMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  entryComponents:[EmployeeDialog,SubscriberDialog,AgencyDialog],
  providers: [AuthLoginService,DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
