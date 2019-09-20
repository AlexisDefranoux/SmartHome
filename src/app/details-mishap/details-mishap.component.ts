import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { MishapService } from '../shared/services/mishap.service';
import { Mishap } from '../shared/models/mishap';
import { PlaceService } from '../shared/services/place.service';
import { SeverityService } from '../shared/services/severity.service';
import {StateService} from '../shared/services/state.service';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-details-mishap',
  templateUrl: './details-mishap.component.html',
  styleUrls: ['./details-mishap.component.css']
})

export class DetailsMishapComponent implements OnInit {

  public mishap: Mishap;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mishapService: MishapService,
    private placeService: PlaceService,
    private severityService: SeverityService,
    private stateService: StateService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.mishap = new Mishap();
    const idMishap = Number.parseFloat(this.route.snapshot.paramMap.get('idMishap'));
    this.mishapService.getMishapById(idMishap)
      .subscribe(mishap => this.subscribeMishap(mishap));
  }

  subscribeMishap(mishap): void {

    if (mishap == null) {
      this.router.navigate(['error404']);
    }

    this.mishap = new Mishap(mishap);

    this.placeService.getPlaceById(this.mishap.idPlace)
      .subscribe(place => this.mishap.place = place.name);
    this.severityService.getSeverityById(this.mishap.idSeverity)
      .subscribe(severity => this.mishap.severity = severity.name);
    this.stateService.getStateById(this.mishap.idState)
      .subscribe(state => this.mishap.state = state.name);
    this.userService.getUserById(this.mishap.idUser)
      .subscribe(user => this.mishap.user = user.name);
  }

  goBack(): void {
    this.location.back();
  }

}
