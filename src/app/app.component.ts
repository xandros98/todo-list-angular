import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from './data.service';
import { LoggerService } from './loggerService';
import { Task } from './task.model';

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
      data: item.itemText
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateTask({ itemText: result, id: item.id }).subscribe(tasks => {
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

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmation {

  private itemText: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<DeleteConfirmation>) {
    this.itemText = data;
  }

  no() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'update-confirmation',
  templateUrl: './update.component.html'
})
export class UpdateDialog {

  private itemText: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<DeleteConfirmation>,
    private loggerService: LoggerService) {

    this.itemText = data;
  }

  no() {
    this.dialogRef.close(false);
  }

  ok() {
    if (this.itemText.trim() != "") {
      this.dialogRef.close(this.itemText);
    } else {
      this.loggerService.log("Please add a task");
    }
  }
}