import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Mode} from '../shared/models/mode';
import {ModeService} from '../shared/services/mode.service';

@Component({
  selector: 'app-add-mode',
  templateUrl: './add-mode.component.html',
  styleUrls: ['./add-mode.component.css']
})
export class AddModeComponent implements OnInit {

  public mode: Mode;
  public closeResult: string;
  public errorSubmit: boolean;
  private modalRef: NgbModalRef;
  public temperatures: number[];

  constructor(private modalService: NgbModal,
              private modeService: ModeService) {}

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
    this.temperatures = new Array<number>();
    for (let i = 0; i <= 40; ++i) {
      this.temperatures.push(i);
    }
    this.mode = new Mode();
    this.errorSubmit = false;
  }

  /**
   * add a place in database calling the web service, and push the result in the service
   */
  add() {
    this.modeService.addMode(this.mode).subscribe(mode => this.redirect(mode));
  }

  redirect(mode): void {
    this.modeService.defaultPlace = mode;
    this.modeService.modes.push(mode);
    if (mode != null) {
      this.mode.label = '';
      this.errorSubmit = false;
      this.modalRef.close();
    } else {
      this.errorSubmit = true;
    }
  }

  close() {
    this.mode = new Mode();
    this.errorSubmit = false;
    this.modalRef.dismiss();
  }
}
