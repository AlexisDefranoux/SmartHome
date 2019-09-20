export class Mishap {
  idMishap: number;
  description: string;
  idPlace: number;
  createDate: string;
  idSeverity: number;
  idState: number;
  idUser: number;
  resolveDate: string;
  mishapDate: string;
  place: string;
  severity: string;
  state: string;
  user: string;
  idMode: number;

  constructor(mishap: any = {}) {
    this.idMishap = mishap.idMishap;
    this.description = mishap.description;
    this.idPlace = mishap.idPlace;
    this.createDate = mishap.createDate;
    this.idSeverity = mishap.idSeverity;
    this.idState = mishap.idState;
    this.idUser = mishap.idUser;
    this.resolveDate = mishap.resolveDate;
    this.mishapDate = mishap.mishapDate;
    this.place = mishap.place;
    this.severity = mishap.severity;
    this.state = mishap.state;
    this.user = mishap.user;
    this.idMode = mishap.idMode;
  }
}
