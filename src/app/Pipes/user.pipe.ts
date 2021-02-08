import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task-list-response';
import { User } from '../models/user-list-response';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(values: Array<Task>, user: User): Array<Task> {
    if(!values) {
      return [];
    }
    if(!user) {
      return values;
    }
    return values.filter((task) => {
      return task.assigned_name === user.name;
    })
  }

}
