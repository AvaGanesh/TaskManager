import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task-list-response';
import { User } from 'src/app/models/user-list-response';
import { DataShareService } from 'src/app/services/data-share.service';
import { ToDoAPIService } from 'src/app/services/to-do-api.service';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent implements OnInit {

  taskForm: FormGroup;
  isEditRequest: boolean;
  taskData:Task;
  users: User[];
  priorityList = [
    {
      id: "1",
      name: "Normal"
    },
    {
      id: "2",
      name: "Med"
    },
    {
      id: "3",
      name: "High"
    }
  ];
  minDate: Date;
  
  constructor(public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
              private dataService: DataShareService,
              private todoService: ToDoAPIService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.isEditRequest = data.isEditRequest;
                this.taskData = data.data;
                this.initForm();
              }

  initForm() {
    this.taskForm = this.fb.group({
      id: [null],
      message: [null, [Validators.required]],
      assigned_to: [null],
      assigned_name: [null],
      created_on: [null],
      due_date: [null],
      priority: [null]
    });
    if(this.isEditRequest) {
        this.taskForm.setValue(this.taskData);
        if(this.taskData.due_date !== null && this.taskData.due_date !== undefined) {
          const date = this.taskData.due_date.split(' ');
          this.taskForm.controls.due_date.setValue(new Date(date[0]));
     }
    } 
  }

  ngOnInit(): void {
    this.getUserData();
    this.minDate = new Date();
  }

  getUserData() {
    this.dataService.getUserData().then((res) => {
      this.users = res;
    }).catch((err) => {
      console.error(err);
      this.todoService.listUser().subscribe((result) => {
        if(result.status === "success") {
          this.users = result.users;
        }
      });
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }


  submitResponse() {
    let formData = new FormData();
    this.taskForm.controls.due_date.setValue(this.getTimeStamp(this.taskForm.value.due_date));
    if(!this.isEditRequest) {
      this.taskForm.controls.created_on.setValue(this.getTimeStamp(new Date()));
    }
    let item = this.taskForm.value;
    for (let key in item) {
        formData.append(key, this.taskForm.get(key).value);
    }
    if(this.isEditRequest) {
      formData.append('taskid', this.taskData.id);
      this.todoService.updateTask(formData).subscribe((res) => {
        if(res.status === "success") {
          this.todoService.openSnackBar("Task updated successfully", true);
          this.dialogRef.close(true);
        }
      });
    } else {
      this.todoService.createTask(formData).subscribe((res) => {
        if(res.status === "success") {
          this.todoService.openSnackBar("New task added successfully", true);
          this.dialogRef.close(true);
        }
      });
    }
  }

  delete() {
    if(window.confirm('Are you sure?')) {
      this.todoService.deleteTask(Number.parseInt(this.taskData.id)).subscribe((res) => {
        if(res.status === "success") {
          this.todoService.openSnackBar(res.message, true);
          this.dialogRef.close(true);
        }
      })
    }
  }

  getTimeStamp(data: Date): string {
    let date = data;
    let iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
    console.log(iso[1] + ' ' + iso[2]);
    return iso[1]+ ' '+ iso[2];
  }
}
