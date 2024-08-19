import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../app/service/service.component';

interface Task {
  taskId: string;
  taskDescription: string;
  issuedDate:string;
  issuedTime:string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [TaskService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newTask: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = { taskId: "", taskDescription: this.newTask, issuedDate:"",issuedTime:"", completed: false };
      this.taskService.addTask(task).subscribe((newTask) => {
        this.tasks.push(newTask);
        this.newTask = '';
      });
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.taskId).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
    });
  }

    updateTask(task: Task) {
    
  }

  markAsDone(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }
}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = 'http://localhost:8080/api/v1/task';

//   constructor(private http: HttpClient) { }

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(`${this.apiUrl}/getAllTasks`);
//   }

//   addTask(task: Task): Observable<Task> {
//     return this.http.post<Task>(`${this.apiUrl}/saveTask`, task);
//   }

//   deleteTask(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/deleteTask/${id}`);
//   }

//   updateTask(task: Task): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/updateTask/${task.id}`, task);
//   }
// }




















// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// interface Task {
//   name: string;
//   completed: boolean;
// }

// @Component({
//   standalone: true,
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [CommonModule, FormsModule],
// })
// export class AppComponent {
// markAsDone(_t14: Task) {
// throw new Error('Method not implemented.');
// }
//   newTask: string = '';
//   tasks: Task[] = [];

//   addTask() {
//     if (this.newTask.trim()) {
//       this.tasks.push({ name: this.newTask, completed: false });
//       this.newTask = '';
//     }
//   }

//   deleteTask(task: Task) {
//     this.tasks = this.tasks.filter(t => t !== task);
//   }
// }