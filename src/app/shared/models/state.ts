export class State {
  idState: number;
  name: string;

  constructor(state: any = {}) {
    this.idState = state.idState;
    this.name = state.name;
  }
}
