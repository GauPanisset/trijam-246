import { Scene } from 'phaser';

import { NextLevelButton } from '../game-objects';
import { formatSeconds } from '../helpers/formatSeconds';
import { levels } from '../levels';

type FinishedLevelData = {
  currentLevel: number;
  moves: number;
  timeInSeconds: number;
};

class FinishedLevelScene extends Scene {
  static KEY = 'FinishedLevelScene';

  constructor() {
    super({ key: FinishedLevelScene.KEY });
  }

  create({ currentLevel, moves, timeInSeconds }: FinishedLevelData) {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(0, 0, width, height, 0x000, 0.4).setOrigin(0);
    this.add
      .text(width / 2, height / 3, `Level ${currentLevel} complete!`)
      .setOrigin(0.5);
    const movesText = this.add
      .text(width / 2, height / 2, `Moves: ${moves}`)
      .setOrigin(0.5);
    this.add
      .text(
        width / 2,
        movesText.y + movesText.height * 2,
        `Time: ${formatSeconds(timeInSeconds)}`
      )
      .setOrigin(0.5);

    if (levels[currentLevel + 1]) {
      new NextLevelButton(this, width / 2, (2 * height) / 3);
    }
  }
}

export { FinishedLevelScene };
