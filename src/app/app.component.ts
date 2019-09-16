import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from './services/data.service';
import { LoggerService } from './services/loggerService';
import { UpdateDialog, DeleteConfirmation } from './tasks/taskscomponent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void { }

  constructor() { }

}