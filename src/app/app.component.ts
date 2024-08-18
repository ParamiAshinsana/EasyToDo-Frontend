import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../app/service/service.component';

interface Task {
  id: number;
  name: string;
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
      const task: Task = { id: 0, name: this.newTask, completed: false };
      this.taskService.addTask(task).subscribe((newTask) => {
        this.tasks.push(newTask);
        this.newTask = '';
      });
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  markAsDone(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }
}
























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