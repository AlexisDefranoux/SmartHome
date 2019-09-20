import {Mishap} from './shared/models/mishap';

export function sortString (a: Mishap, b: Mishap, sortBy: string, reverse: boolean): number {
  if (reverse) {
    if (a[sortBy].toUpperCase() < b[sortBy].toUpperCase()) { return 1; }
    if (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) { return -1; }
  }
  if (a[sortBy].toUpperCase() > b[sortBy].toUpperCase()) { return 1; }
  if (a[sortBy].toUpperCase() < b[sortBy].toUpperCase()) { return -1; }
  return 0;
}

export function sortOther(a: Mishap, b: Mishap, sortBy: string, reverse: boolean): number {
  if (reverse) {
    if (a[sortBy] < b[sortBy]) { return -1; }
    if (a[sortBy] > b[sortBy]) { return 1; }
  }
  if (a[sortBy] < b[sortBy]) { return 1; }
  if (a[sortBy] > b[sortBy]) { return -1; }
  return 0;
}
