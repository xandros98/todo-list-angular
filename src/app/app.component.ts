import { Component } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private todoitems: any[];
  private input: string;
  private index: number;

  constructor() {
    this.todoitems = [];
    this.input = "";
    this.index = 0;
  }

  addItem() {
    this.index++;

    this.todoitems.push({ item: this.input, index: this.index })

    this.input = "";
  }

  removeItem(item: any) {
    let removeIndex = this.todoitems.map(function (item) { return item.index; }).indexOf(item.index);

    this.todoitems.splice(removeIndex, 1);
  }
}
