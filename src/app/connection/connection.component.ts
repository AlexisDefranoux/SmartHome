import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';

import { User } from '../shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  public user: User;
  public loginError: boolean;

  constructor(
   private userService: UserService,
   private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
    this.loginError = false;
  }

  submit(): void {
    this.userService.checkUser(this.user)
      .subscribe(user => this.redirect(user));
  }

  redirect(user): void {
    if (user != null) {
      this.userService.session = new User(user);
      this.router.navigate(['dashboard']);
    } else {
      this.loginError = true;
    }
  }
}
