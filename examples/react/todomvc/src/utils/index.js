export { ESCAPE, ENTER } from './keys';

export function uuid() {
  return performance.now();
}

export function objectIsEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length > 0;
}
