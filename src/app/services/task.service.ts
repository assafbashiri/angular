import { Injectable } from '@angular/core';
import {HttpClient,   HttpHeaders} from '@angular/common/http';
import {Task} from '../Task'
import {Observable, observable} from 'rxjs'


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apuUrl = 'http://localhost:5000/tasks'

  constructor(private http:HttpClient) { }
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apuUrl)
  }

  deleteTask(task:Task): Observable<Task> {
    const url = `${this.apuUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task:Task): Observable<Task> {
    const url = `${this.apuUrl}/${task.id}`;
    return this.http.put<Task>(url,task, httpOptions)
  }
  addTask(task:Task): Observable<Task> {
    return this.http.post<Task>(this.apuUrl,task, httpOptions )

  }
}
