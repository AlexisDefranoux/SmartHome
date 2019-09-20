import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Mishap} from '../shared/models/mishap';
import {MishapService} from '../shared/services/mishap.service';
import {PlaceService} from '../shared/services/place.service';
import {StateService} from '../shared/services/state.service';
import {SeverityService} from '../shared/services/severity.service';
import {sortOther, sortString} from '../utils';
import {UserService} from '../shared/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public mishaps: Mishap[];
  public searchString: string;
  public descDate: boolean;
  public descUser: boolean;
  public descDesc: boolean;
  public descPlace: boolean;
  public descSeverity: boolean;
  public descState: boolean;

  constructor(public mishapService: MishapService,
              public stateService: StateService,
              public severityService: SeverityService,
              public placeService: PlaceService,
              public userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getMishaps();
    this.descDate = null;
    this.descSeverity = null;
    this.descUser = null;
    this.descDesc = null;
    this.descPlace = null;
    this.descSeverity = null;
    this.descState = null;
  }

  getMishaps(): void {
    this.mishapService.getMishapByUserId(this.userService.session.idUser)
      .subscribe(mishaps => {
        this.mishaps = mishaps, this.getPlaceNameById(mishaps);
      });
  }

  getPlaceNameById(mishaps: Mishap[]): void {
    mishaps.forEach(mishap => {
      this.placeService.getPlaceById(mishap.idPlace).subscribe(place => mishap.place = place.name),
        this.stateService.getStateById(mishap.idState).subscribe(state => mishap.state = state.name),
        this.severityService.getSeverityById(mishap.idSeverity).subscribe(severity => mishap.severity = severity.name),
        this.userService.getUserById(mishap.idUser).subscribe(user => mishap.user = user.name);
    });
  }

  goAddMishap(): void {
    this.router.navigate(['add-mishap']);
  }

  goHeater(): void {
    this.router.navigate(['heater']);
  }

  search(): void {
    console.log(this.searchString);
    if (this.searchString === '' || this.searchString == null) {
      this.getMishaps();
    } else {
      this.mishapService.searchMishap(this.searchString, this.userService.session.idUser)
        .subscribe(mishaps => {this.mishaps = mishaps, this.getPlaceNameById(mishaps); });
    }
  }

  combineSort (sortBy: string, decreasing: boolean): boolean {
    if (decreasing == null) {
      decreasing = false;
      this.descDate = null;
      this.descUser = null;
      this.descSeverity = null;
      this.descDesc = null;
      this.descPlace = null;
      this.descSeverity = null;
      this.descState = null;  }
    this.mishaps = this.mishaps.sort(function (a, b) {
      if (!a || !b) { return this.mishaps; } // Case void entry.
      if (typeof a[sortBy] === 'string') { return sortString(a, b, sortBy, decreasing); }
      return sortOther(a, b, sortBy, decreasing);
    });
    return !decreasing;
  }
}



