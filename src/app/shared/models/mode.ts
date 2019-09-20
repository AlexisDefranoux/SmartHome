export class Mode {
  idMode: number;
  label: string;
  tMin: number;
  tMax: number;

  constructor(mode: any = {}) {
    this.idMode = mode.idMode;
    this.label = mode.label;
    this.tMax = mode.tMax;
    this.tMin = mode.tMin;
  }
}
