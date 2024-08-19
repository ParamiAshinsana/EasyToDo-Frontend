import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
  editTask: any;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

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
      this.editTask = { ...task };
    }
    cancelUpdate() {
      this.editTask = null;
   }
   saveUpdatedTask() {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask).subscribe({
        next: (updatedTask) => {
          // Check if the API response contains the updated task object
          if (updatedTask && updatedTask.taskId) {
            // Find the index of the task in the list that needs to be updated
            const index = this.tasks.findIndex(t => t.taskId === updatedTask.taskId);
            if (index !== -1) {
              // Update the task in the list with the new task description
              this.tasks[index] = updatedTask;
            }
          }
          // Close the pop-up after saving
          this.ngZone.run(() => {
            this.editTask = null;
          });
        },
        error: (err) => {
          console.error('Error updating task', err);
          // Handle error if needed
        }
      });
    } else {
      console.error('No task is being edited');
    }
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