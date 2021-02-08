import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from 'src/app/modals/task-detail-dialog/task-detail-dialog.component';
import { Priority } from 'src/app/models/priority.enum';
import { Task } from 'src/app/models/task-list-response';
import { User } from 'src/app/models/user-list-response';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() refreshEvent = new EventEmitter();
  priority: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPriority();
  }

  getPriority() {

    switch(this.task.priority) {
      case "1": this.priority = "Normal";
              break;
      case "2": this.priority = "Med";
              break;
      case "3": this.priority = "High";
             break;
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    dialogConfig.data = {
      isEditRequest: true,
      data: this.task
    }
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
       //  result will return boolean value, if true refresh the table
      if (result) {
        // ṛefresh data
        this.refreshEvent.emit();
      }
    });

  }
 


  

}
