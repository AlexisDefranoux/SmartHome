import {User} from './user';

export class Task {
  idTask: number;
  idMishap: number;
  description: string;
  users: User[];
  createDate: string;
  author: string;

  constructor(task: any = {}) {
    this.idTask = task.idTask;
    this.idMishap = task.idMishap;
    this.description = task.description;
    this.users = task.users;
    this.createDate = task.createDate;
    this.author = task.author;
  }
}
