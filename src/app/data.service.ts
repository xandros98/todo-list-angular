import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apuUrl = 'http://10.11.12.4:5000/api/tasks/';

  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get<Task[]>(this.apuUrl + "getAllTasks/");
  }

  addTask(itemText: any) {
    return this.http.post<Task[]>(this.apuUrl + "addNewTask/", itemText);
  }

  deleteTask(item: any) {
    return this.http.post<Task[]>(this.apuUrl + "deleteTask/", item);
  }

  updateTask(item: any) {
    return this.http.put<Task[]>(this.apuUrl + "updateTask/", item);
  }
}
