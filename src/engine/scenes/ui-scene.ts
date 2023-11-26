import { Scene } from 'phaser';

import { EVENT_NAME } from '../constants';
import { MovesText, TimerText } from '../game-objects';
import { ResetButton } from '../game-objects';
import { convert } from '../helpers/convert';

class UIScene extends Scene {
  static KEY = 'UIScene';

  constructor() {
    super({ key: UIScene.KEY });
  }

  create() {
    new ResetButton(this, convert(7), convert(0));

    const movesText = new MovesText(this, 8, convert(7) - 24, 0);
    const timerText = new TimerText(this, 8, convert(7));

    this.game.events.on(EVENT_NAME.MoveUpdate, (newValue: number) => {
      movesText.updateMoves(newValue);
    });
    this.game.events.on(EVENT_NAME.TimerUpdate, (newValue: number) => {
      timerText.updateTimer(newValue);
    });

    this.events.on('shutdown', () => {
      this.game.events.off(EVENT_NAME.MoveUpdate);
      this.game.events.off(EVENT_NAME.TimerUpdate);
    });
  }
}

export { UIScene };
