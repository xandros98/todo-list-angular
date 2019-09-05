import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('newItemInput', { static: false, }) inputEl: ElementRef;

  private todoitems: any[];
  private input: string;
  private index: number;
  private error: string;
  private mode: string;
  private itemText: string;
  private chosenItemIndex: number;

  constructor(private dialog: MatDialog,
    private snackbar: MatSnackBar) {

    this.todoitems = [];
    this.input = "";
    this.index = 0;
    this.error = "";
    this.mode = "view";
    this.itemText = "";
  }

  log(msg: string) {
    this.snackbar.open(msg, "x", { duration: 2500 });
    console.log("msg: ", msg);
  }

  addItem() {
    if (this.input.trim() != "") {
      this.todoitems.push({ item: this.input, index: ++this.index })
      this.input = "";
    } else {
      this.log("Please add a task");
    }
  }

  removeItem(item: any) {
    const dialogRef = this.dialog.open(DeleteConfirmation, {
      width: '600px',
      data: item.item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let removeIndex = this.todoitems.map(function (item) { return item.index; }).indexOf(item.index);
        this.todoitems.splice(removeIndex, 1);
      }
    });
  }

  editItem(i: number) {
    this.mode = "edit";
    this.chosenItemIndex = i;
    this.itemText = this.todoitems[i].item;

    setTimeout(() => this.inputEl.nativeElement.focus(), 0);
  }

  saveItem(index: number) {
    if (this.itemText) {
      this.todoitems[index].item = this.itemText;
      this.cancel();
    } else {
      this.log("Must not be empty");
    }
  }

  cancel() {
    this.itemText = "";
    this.mode = "view";
    this.chosenItemIndex = null;
  }
}


@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html'
})
export class DeleteConfirmation {

  private taskname: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DeleteConfirmation>) {
    this.taskname = data;
  }

  no() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(true);
  }
}