import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmation } from './app.component';

@NgModule({
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DeleteConfirmation
  ],
  entryComponents: [
    DeleteConfirmation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
