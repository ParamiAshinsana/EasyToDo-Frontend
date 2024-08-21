import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  taskId: string;
  taskDescription: string;
  issuedDate:string;
  issuedTime:string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/v1/task'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl+"/getAllTasks");
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl+"/saveTask", task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl+"/deleteTask"}/${taskId}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl+"/updateTask"}/${task.taskId}`, task);
  }
}
