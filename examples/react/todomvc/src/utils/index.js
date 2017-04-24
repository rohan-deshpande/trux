import { ESCAPE, ENTER } from './keys';

function uuid() {
  return performance.now();
}

export { uuid, ESCAPE, ENTER };
