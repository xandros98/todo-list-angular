import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
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
    return this.http.get<Task[]>(this.apuUrl + "tasks/getAllTasks/");
  }

  addTask(task: any) {
    return this.http.post<Task[]>(this.apuUrl + "tasks/addNewTask/", task);
  } 

  deleteTask(item: any) {
    return this.http.post<Task[]>(this.apuUrl + "tasks/deleteTask/", item);
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

  getUserById(id: number) {
    return this.http.get<User>(this.apuUrl + "users/getUserById/" + id);
  }

  getUser(user: any) {
    return this.http.post<any>(this.apuUrl + "users/getUser/", user);
  }

  updateUser(user: any) {
    return this.http.put<User[]>(this.apuUrl + "users/updateUser/", user);
  }

  deleteUser(user: any) {
    return this.http.post<User[]>(this.apuUrl + "users/deleteUser/", user);
  }

  addNewUser(user: any) {
    return this.http.post<User[]>(this.apuUrl + "users/addNewUser/", user);
  }

  swapPosTasks(newObject: any) {
    return this.http.post<any>(this.apuUrl + "tasks/swapPosTasks/", newObject);
  }
}