import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  ngOnInit(): void {
  }

  deleteTask(task: Task) {
    console.log("Deleting task");
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter((t) => t.id !== task.id));
  }

  updateReminder(task: Task){
    console.log("Updating Reminder");
    this.taskService.updateReminder(task).subscribe((updateTask) => this.tasks.find(t=>t.id === updateTask.id).reminder = updateTask.reminder);
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe((newTask) => this.tasks.push(newTask));
    console.log("New Task added");
  }
}
