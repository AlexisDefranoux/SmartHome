export class Place {
	idPlace: number;
	name: string;
	state: number;
	idUser: number;

  constructor(place: any = {}) {
    this.idPlace = place.idPlace;
    this.name = place.name;
    this.state = place.state;
    this.idUser = place.idUser;
  }
}
