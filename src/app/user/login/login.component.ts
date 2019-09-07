import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/loggerService';
import { Router } from "@angular/router"
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private username: string;
  private password: string;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private router: Router
  ) {
    this.username = "";
    this.password = "";
  }

  logIn() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.dataService.getUser(user).subscribe(res => {
      if (res.length != 0) {
        this.loggerService.log("Succes! You are now logged in as " + this.username);
        this.router.navigate(['/'])
      } else {
        this.loggerService.log("Please try again");
      }
    });

  }
}
