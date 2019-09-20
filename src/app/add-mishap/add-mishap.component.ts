import {Component, OnInit} from '@angular/core';
import {Mishap} from '../shared/models/mishap';
import {MishapService} from '../shared/services/mishap.service';
import {SeverityService} from '../shared/services/severity.service';
import {PlaceService} from '../shared/services/place.service';
import {Severity} from '../shared/models/severity';
import {Place} from '../shared/models/place';
import {Location} from '@angular/common';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {StateService} from '../shared/services/state.service';

@Component({
  selector: 'app-add-mishap',
  templateUrl: './add-mishap.component.html',
  styleUrls: ['./add-mishap.component.css']
})
export class AddMishapComponent implements OnInit {

  public mishap: Mishap;
  public severities: Severity[];
  public places: Place[];
  public errorSubmit: boolean;
  public state: string;

  constructor(
    private severityService: SeverityService,
    public placeService: PlaceService,
    private mishapService: MishapService,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private stateService: StateService
  ) {
  }

  ngOnInit() {
    this.mishap = new Mishap();
    this.mishap.idUser = this.userService.session.idUser;
    this.mishap.createDate = new Date().toString();
    this.mishap.mishapDate = new Date().toString();
    this.mishap.resolveDate = null;
    this.mishap.idMode = null;
    this.stateService.getStateById(1).subscribe(state => {
      this.state = state.name, this.mishap.idState = state.idState;
    });
    this.severityService.getSeverities().subscribe(severities => {
      this.severities = severities, this.severities.pop(), this.mishap.idSeverity = this.severities[2].idSeverity;
    });
    this.placeService.getPlacesByUserId(this.mishap.idUser).subscribe(places => {
      this.placeService.places = places, this.places = this.placeService.places, this.choicePlace(places);
    });
    this.errorSubmit = false;
  }

  choicePlace(places): void {
    if (this.placeService.defaultPlace == null) {
      places.forEach(place => {
        if (place.idUser === this.userService.session.idUser) {
          this.placeService.defaultPlace = place;
        }
      });
      if (this.placeService.defaultPlace == null) {
        this.placeService.defaultPlace = this.places[0];
      }
      this.mishap.idPlace = this.placeService.defaultPlace.idPlace;
    }
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.mishap.idPlace = this.placeService.defaultPlace.idPlace;
    this.mishap.place = this.placeService.defaultPlace;
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
