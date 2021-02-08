import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user-list-response';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss']
})
export class UserBadgeComponent implements OnInit {
  userInitial: string;
  @Input() user: User;
  @Output() userSelected = new EventEmitter();
  isSelected = false;
  constructor() { }

  ngOnInit(): void {
    let userNameArr = this.user.name.split('');
    this.userInitial = userNameArr[0] + userNameArr[1];
  }

  userClick() {
    this.userSelected.emit(this.user);
  }

}
