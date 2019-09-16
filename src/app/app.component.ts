import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from './services/data.service';
import { LoggerService } from './services/loggerService';
import { UpdateDialog, DeleteConfirmation } from './tasks/taskscomponent.component';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('newItemInput', { static: false, }) inputEl: ElementRef;

  private todoitems: Task[];
  private input: string;
  private itemText: string;

  constructor(private dialog: MatDialog,
    private dataService: DataService,
    private loggerService: LoggerService) {

    this.input = "";
    this.itemText = "";
  }

  ngOnInit() {
    this.dataService.getTasks()
      .subscribe(tasks => this.todoitems = tasks);
  }

  addItem() {
    if (this.input.trim() != "") {
      this.dataService.addTask({ itemText: this.input }).subscribe(tasks => this.todoitems = tasks);
      this.input = "";
    } else {
      this.loggerService.log("Please add a task");
    }
  }

  removeItem(item: any) {
    const dialogRef = this.dialog.open(DeleteConfirmation, {
      width: '600px',
      data: item.itemText
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteTask(item).subscribe(tasks => {
          this.todoitems = tasks;
        });
      }
    });
  }

  editItem(item: any) {
    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '600px',
      data: [item.itemText, item.desc]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateTask({ itemText: result, id: item.id, desc: item.desc }).subscribe(tasks => {
          this.todoitems = tasks;
        });
      }
    });
  }

  saveItem(index: number) {
    if (this.itemText) {
      this.todoitems[index].itemText = this.itemText;
      this.cancel();
    } else {
      this.loggerService.log("Must not be empty");
    }
  }

  cancel() {
    this.itemText = "";
  }
}