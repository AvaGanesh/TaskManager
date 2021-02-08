import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CreateTaskResponse } from '../models/create-task-response';
import { DeleteTaskResponse } from '../models/delete-task-response';
import { TaskListResponse } from '../models/task-list-response';
import { UserListResponse } from '../models/user-list-response';


@Injectable({
  providedIn: 'root'
})
export class ToDoAPIService {

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }
  httpOption = {
    headers : new HttpHeaders({
      'AuthToken':'HScqP3R3ETaMtHPDRrIFiLUDfD9fNMR5'
    })
  };
  serverUrl = 'https://devza.com/tests/tasks';

  listUser(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.serverUrl}/listusers`, this.httpOption);
  }

  createTask(body: FormData): Observable<CreateTaskResponse> {
    return this.http.post<CreateTaskResponse>(`${this.serverUrl}/create`, body, this.httpOption);
  }

  updateTask(body: FormData): Observable<CreateTaskResponse> {
    return this.http.post<CreateTaskResponse>(`${this.serverUrl}/update`, body, this.httpOption);
  }

  deleteTask(taskid: number): Observable<DeleteTaskResponse> {
    let formData = new FormData();
    formData.append('taskid', taskid.toString());
    return this.http.post<DeleteTaskResponse>(`${this.serverUrl}/delete`, formData, this.httpOption);
  }

  listTasks(): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(`${this.serverUrl}/list`, this.httpOption);
  }

  openSnackBar(message: string, isSuccess: boolean) {
    this.snackBar.open(message, ' ', {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'start', //'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

}
