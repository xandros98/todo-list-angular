import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmation, UpdateDialog } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';

@NgModule({
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DeleteConfirmation,
    UpdateDialog
  ],
  entryComponents: [
    DeleteConfirmation,
    UpdateDialog
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
