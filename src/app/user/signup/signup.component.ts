import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/loggerService';
import { DataService } from '../../services/data.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  private username: string;
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private error: boolean;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private router: Router
  ) {
    this.username = "";
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.password = "";
    this.error = false;
  }

  goBack() {
    this.router.navigate(['/'])
  }

  addUser() {
    const newUser = {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }

    for (let key in newUser) {
      if (newUser[key].trim() == "") {
        this.error = true;
        break;
      } else {
        this.error = false;
      }
    }

    if (this.error) {
      this.loggerService.log("Please complete all fields!");
    } else {
      this.dataService.addNewUser(newUser).subscribe(res => {
        if (res.length != 0) {
          this.loggerService.log("Succes! You are now signed in as " + this.username);
          this.router.navigate(['/'])
        }
      });
    }
  }
}
