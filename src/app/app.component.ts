import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
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
  private index: number;
  private error: string;
  private mode: string;
  private itemText: string;

  constructor(private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private dataService: DataService) {

    this.input = "";
    this.index = 0;
    this.error = "";
    this.mode = "view";
    this.itemText = "";
  }

  ngOnInit() {
    this.dataService.getTasks()
      .subscribe(tasks => this.todoitems = tasks);
  }

  log(msg: string) {
    this.snackbar.open(msg, "x", { duration: 2500 });
  }

  addItem() {
    if (this.input.trim() != "") {

      this.dataService.addTask({ itemText: this.input, id: 0 }).subscribe(tasks => this.todoitems = tasks);
      this.input = "";
    } else {
      this.log("Please add a task");
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

    // this.mode = "edit";
    // this.itemText = this.todoitems[i].itemText;

    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
  }

  saveItem(index: number) {
    if (this.itemText) {
      this.todoitems[index].itemText = this.itemText;
      this.cancel();
    } else {
      this.log("Must not be empty");
    }
  }

  cancel() {
    this.itemText = "";
    this.mode = "view";
  }
}


@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmation {

  private itemText: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DeleteConfirmation>) {
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DeleteConfirmation>) {
    this.itemText = data;
  }

  no() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(this.itemText);
  }
}