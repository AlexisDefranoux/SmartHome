import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PlaceService } from '../shared/services/place.service';
import { Place } from '../shared/models/place';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],

})
/**
 * a modal to add places
 */
export class AddPlaceComponent implements OnInit {
  public place: Place;
  public closeResult: string;
  public errorSubmit: boolean;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal,
              private placeService: PlaceService) {}

  /**
   * call the modal service and handle dismiss results
   * @param content
   */
  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';

    });
  }

  ngOnInit() {
    this.place = new Place();
    this.place.state = 1;
    this.errorSubmit = false;
  }

  /**
   * add a place in database calling the web service, and push the result in the service
   */
  add() {
    this.placeService.addPlace(this.place).subscribe(place => this.redirect(place));
  }

  redirect(place): void {
    if (place != null) {
      this.placeService.defaultPlace = place;
      this.placeService.places.push(place);
      this.place.name = '';
      this.errorSubmit = false;
      this.modalRef.close();
      //this.modalRef.dismiss();
    } else {
      this.errorSubmit = true;
    }
  }

  close() {
    this.place = new Place();
    this.place.state = 1;
    this.errorSubmit = false;
    this.modalRef.dismiss();
  }
}
