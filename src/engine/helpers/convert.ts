import { CELL_SIZE } from '../constants';

const convert = (value: number, to?: 'simple' | 'default') => {
  if (to === 'simple') {
    return (value - CELL_SIZE / 2) / CELL_SIZE;
  }

  return value * CELL_SIZE + CELL_SIZE / 2;
};

export { convert };
