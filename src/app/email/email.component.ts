import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../shared/models/user';
import {MishapService} from '../shared/services/mishap.service';
import {TaskService} from '../shared/services/task.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Input() idUser: number;
  @Input() idMishap: number;
  @Input() idTask: number;
  @Input() nameUser: string;

  private modalRef: NgbModalRef;
  public user: User;
  public name: string;
  public description: string;

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private mishapService: MishapService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.user = new User();
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    });
    this.userService.getUserById(this.idUser)
      .subscribe(user => this.user = user);

    if (this.idMishap != -1) {
      this.mishapService.getMishapById(this.idMishap).subscribe(mishap => this.description = mishap.description);
      this.name = 'mishap';
    } else {
      this.taskService.getTasksById(this.idTask).subscribe(task => this.description = task.description);
      this.name = 'task';
    }
  }

  close() {
    this.modalRef.dismiss();
  }
}

