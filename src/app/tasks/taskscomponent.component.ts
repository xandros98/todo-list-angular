import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from '../services/data.service';
import { LoggerService } from '../services/loggerService';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './taskscomponent.component.html',
  styleUrls: ['./taskscomponent.component.css']
})
export class TasksComponenet implements OnInit {
  @ViewChild('newItemInput', { static: false, }) inputEl: ElementRef;

  private todoitems: any;
  private input: string;
  private itemText: string;

  constructor(private dialog: MatDialog,
    private dataService: DataService,
    private loggerService: LoggerService) {

    this.input = "";
    this.itemText = "";
    this.todoitems = [];
  }

  ngOnInit() {
    this.dataService.getTasks()
      .subscribe(tasks => this.todoitems = tasks)
      , (err: any) => this.loggerService.log("Something Went Wrong");
  }

  addItem() {
    if (this.input.trim() != "") {
      this.dataService.addTask({ itemText: this.input }).subscribe(tasks => this.todoitems = tasks);
      this.loggerService.log("Successfully added the task");
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
          this.loggerService.log("Successfully removed the task");
        });
      }
    }, (err: any) =>
      this.loggerService.log("Something Went Wrong")
    );
  }

  completeItem() {
    // addToCompleted()
    this.loggerService.log("Congratulations on completing the task!");
  }

  editItem(item: any) {
    const dialogRef = this.dialog.open(UpdateDialog, {
      width: '600px',
      data: [item.itemText, item.desc, , item.pos]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateTask({ itemText: result.itemText, desc: result.desc, pos: item.pos, id: item.id })
          .subscribe((response: any) => {
            this.todoitems = response;
            this.loggerService.log("Successfully updated the task");
          }, (err: any) =>
            this.loggerService.log("Something Went Wrong")
          )
      }
    });
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
  private desc: string;
  private pos: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: string[],
    private dialogRef: MatDialogRef<DeleteConfirmation>,
    private loggerService: LoggerService) {

    this.itemText = data[0];
    this.desc = data[1];
    this.pos = parseInt(data[2]);
  }

  no() {
    this.dialogRef.close(false);
  }

  ok() {
    const taskObj = {
      itemText: this.itemText,
      desc: this.desc,
      pos: this.pos
    }

    if (this.itemText.trim() != "") {
      this.dialogRef.close(taskObj);
    } else {
      this.loggerService.log("Please add a task");
    }
  }
}