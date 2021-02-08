import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from 'src/app/modals/task-detail-dialog/task-detail-dialog.component';
import { Task } from 'src/app/models/task-list-response';
import { User } from 'src/app/models/user-list-response';
import { DataShareService } from 'src/app/services/data-share.service';
import { ToDoAPIService } from 'src/app/services/to-do-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedUser: User;
  tasksList: Task[];
  usersList: User[];

  states: string[] = [
    'Normal to High', 'High to Normal'
  ];

  selectedPriority = null;
  constructor(private service: ToDoAPIService,
              private dataShareService: DataShareService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listUsers();
    this.listTasks();
  }

  listTasks() {
    this.service.listTasks().subscribe((res) => {
      if(res.status === "success") {
          this.tasksList = res.tasks;
      } else {
         this.service.openSnackBar('Error while fetching the tasks', false);
      }
    }, (err) => {
      console.error(err);
      this.service.openSnackBar('Error while fetching the tasks', false);
    });
  }

  listUsers() {
    this.service.listUser().subscribe((res) => {
      if(res.status === "success") {
          this.usersList = res.users;
          this.dataShareService.setUserData(res.users);
      } else {
         this.service.openSnackBar('Error while fetching the users list', false);
      }
    }, (err) => {
      console.error(err);
      this.service.openSnackBar('Error while fetching the users list', false);
    })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    dialogConfig.data = {
      isEditRequest: false
    }
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
       //  result will return boolean value, if true refresh the table
      if (result) {
        this.refreshData();
      }
    });
  }


  refreshData() {
    this.usersList = [];
    this.tasksList = [];
    this.listUsers();
    this.listTasks();
  }

  applyUserFilter(user: User) {
    this.selectedUser = user;
  }

  removeUserFilter() {
    this.selectedUser = null;
  }

 }
