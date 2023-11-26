import { level1 } from './1';
import { level2 } from './2';
import { level3 } from './3';
import { level4 } from './4';
import { CarConfig } from './types';

const levels: Record<number, CarConfig[]> = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
};

export { levels };
