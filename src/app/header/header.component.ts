import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logoUrl = '././assets/images/HouseLogo.png';
  public title = 'SmartHome';

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // if (this.userService.session.name == 'guest') {
    //   this.router.navigate(['connection']);
    // }
  }

  logOut(): void {
    this.userService.session = new User({'idUser': '', 'name': 'guest', 'email': '', 'password': '', 'role': ''});
    this.router.navigate(['connection']);
  }
}
