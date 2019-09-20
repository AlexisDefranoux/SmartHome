import { Component, OnInit } from '@angular/core';
import {ModeService} from '../shared/services/mode.service';
import {Mishap} from '../shared/models/mishap';
import {Mode} from '../shared/models/mode';
import {Location} from '@angular/common';
import {MishapService} from '../shared/services/mishap.service';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-heater',
  templateUrl: './heater.component.html',
  styleUrls: ['./heater.component.css']
})
export class HeaterComponent implements OnInit {

  public mishap: Mishap;
  public errorSubmit: boolean;
  public unlimited: boolean;

  constructor(
    public modeService: ModeService,
    private mishapService: MishapService,
    private location: Location,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unlimited = false;
    this.mishap = new Mishap();
    this.mishap.idUser = this.userService.session.idUser;
    this.mishap.idPlace = 52;
    this.mishap.place = 'All the house';
    this.mishap.idSeverity = 4;
    this.mishap.severity = 'No severity';
    this.mishap.idState = 1;
    this.mishap.createDate = new Date().toString();
    this.mishap.mishapDate = new Date().toString();
    this.mishap.resolveDate = new Date().toString();
    this.modeService.getModes().subscribe(modes => this.choice(modes) );
    this.errorSubmit = false;
  }

  choice(modes): void {
    if (this.modeService.modes == null) {
      this.modeService.modes = modes;
    }
    if (this.modeService.defaultPlace == null) {
      this.modeService.defaultPlace = this.modeService.modes[0];
    }
    this.mishap.idMode = this.modeService.defaultPlace.idMode;
  }

  goBack(): void {
    this.location.back();
  }

  change(): void {
    this.unlimited = !this.unlimited;
    this.mishap.resolveDate = null;
  }

  add(): void {
    this.mishap.idMode = this.modeService.defaultPlace.idMode;
    this.mishap.description = 'The vacation mode is activated.';
    this.mishapService.addMishap(this.mishap)
      .subscribe(mishap => this.redirect(mishap));
  }

  redirect(mishap): void {
    if (mishap != null) {
      this.mishap = new Mishap(mishap);
      this.router.navigate(['dashboard']);
    } else {
      this.errorSubmit = true;
    }
  }

}
