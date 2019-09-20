export class Severity {
	idSeverity: number;
	name: string;

	constructor(severity: any = {}) {
	  this.idSeverity = severity.idSeverity;
	  this.name = severity.name;
  }
}
