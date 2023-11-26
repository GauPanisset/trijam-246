import { Car } from '../game-objects';

type CarConfig = {
  x: number;
  y: number;
  orientation: Car['orientation'];
  size: Car['size'];
};

export type { CarConfig };
