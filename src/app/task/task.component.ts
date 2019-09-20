import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task';
import { TaskService } from '../shared/services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public tasks: Task[];
  public idMishap : number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.idMishap = Number.parseFloat(this.route.snapshot.paramMap.get('idMishap'));
    this.taskService.getTasksByMishapId(this.idMishap)
      .subscribe(tasks => {this.getUsers(tasks), this.tasks = tasks; });
  }

  getUsers(tasks): void {
    tasks.forEach(task => {
        this.userService.getUserById(task.idUser).subscribe(user => task.author = user.name),
          this.taskService.getRecipientsByTaskId(task.idTask).subscribe(users => task.users = users);
    });
  }
}
