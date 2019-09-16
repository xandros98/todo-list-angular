import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../services/loggerService';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apuUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient,
    private loggerService: LoggerService) {
  }


  getTasks() {
    return this.http.get<any>(this.apuUrl + "tasks/getAllTasks/").map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  addTask(task: any) {
    return this.http.post<any>(this.apuUrl + "tasks/addNewTask/", task).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  deleteTask(item: any) {
    return this.http.post<any>(this.apuUrl + "tasks/deleteTask/", item).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  getUserById(id: number) {
    return this.http.get<any>(this.apuUrl + "users/getUserById/" + id).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  getUser(user: any) {
    return this.http.post<any>(this.apuUrl + "users/getUser/", user).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }


  updateTask(item: any) {
    return this.http.post<any>(this.apuUrl + "tasks/updateTask/", item).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  updateany(any: any) {
    return this.http.put<any>(this.apuUrl + "anys/updateany/", any).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  deleteUser(any: any) {
    return this.http.post<any>(this.apuUrl + "anys/deleteUser/", any).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  addNewUser(any: any) {
    return this.http.post<any>(this.apuUrl + "anys/addNewUser/", any).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }

  swapPosTasks(newObject: any) {
    return this.http.post<any>(this.apuUrl + "tasks/swapPosTasks/", newObject).map(
      (response: any) => {
        if (response.status === "ok") {
          return response.data;
        } else {
          this.loggerService.log(response.error);
        }
      }
    );
  }
}