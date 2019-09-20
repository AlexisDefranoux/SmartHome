export class User {
  idUser: number;
  name: string;
  email: string;
  password: string;
  role: boolean;

  constructor(user: any = {}) {
    this.idUser = user.idUser;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }
}
