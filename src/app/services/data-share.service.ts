import { Injectable } from '@angular/core';
import { User } from '../models/user-list-response';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private users: User[];

  setUserData(userList: User[]) {
    this.users = userList;
  }

  async getUserData(): Promise<User[]> {
    if(this.users === undefined || this.users === null) {
      return await Promise.reject('No data found');
    } 
    return await Promise.resolve(this.users);
  }
}
