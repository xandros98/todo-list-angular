import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmation, UpdateDialog } from './tasks/taskscomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { LoggerService } from './services/loggerService';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TasksComponenet } from './tasks/taskscomponent.component';

@NgModule({
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    DeleteConfirmation,
    UpdateDialog,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    TasksComponenet
  ],
  entryComponents: [
    DeleteConfirmation,
    UpdateDialog
  ],
  providers: [DataService, LoggerService],
  bootstrap: [AppComponent]
})

export class AppModule { }
