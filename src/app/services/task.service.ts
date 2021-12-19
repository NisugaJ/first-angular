import { Injectable } from '@angular/core';
import { Task } from 'src/app/Task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // sample only
  private apiUrl = "http://localhost:5000/tasks"

  constructor(private http: HttpClient) { }

  // backend request to fetch tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const deleteResult = this.http.delete<Task>(this.apiUrl + "/" + task.id)
    console.log("deleteTask", deleteResult)
    return deleteResult
  }

  updateReminder(task: Task): Observable<Task> {
    const reminderUpdate = this.http.patch<Task>(this.apiUrl + "/" + task.id, {reminder: !task.reminder});
    console.log("reminderUpdate", reminderUpdate)
    return reminderUpdate
  }

  addTask(task: Task): Observable<Task>{
    const newTaskResult = this.http.post<Task>(this.apiUrl, task);
    console.log("newTaskResult", newTaskResult)
    return newTaskResult
  }
}
