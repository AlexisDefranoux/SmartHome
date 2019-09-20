import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  public logoUrl = '../../assets/images/error404.gif';


  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate(['connection']);
  }

}
