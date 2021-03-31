import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit(): void {
  }

  getUsers(){
    return this.users.slice();
  }

}
