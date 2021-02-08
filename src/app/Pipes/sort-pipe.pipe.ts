import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task-list-response';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(value: Array<Task>, sortBy: string): Array<Task> {
    if (sortBy === undefined || sortBy === null) { return value; }
    if (sortBy === 'Normal to High') {
      value.sort((a, b) => {
        return Number.parseInt(a.priority) - Number.parseInt(b.priority);
      });
      return value;
    }

    
    if (sortBy === 'High to Normal') {
      value.sort((a, b) => {
        return Number.parseInt(b.priority) - Number.parseInt(a.priority);
      });
      return value;
    }

    return value;
  }

}
