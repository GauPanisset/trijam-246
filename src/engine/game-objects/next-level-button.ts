import { GameObjects, Scene } from 'phaser';

import { EVENT_NAME } from '../constants';

class NextLevelButton extends GameObjects.DOMElement {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.createFromHTML(/* HTML */ `
      <button
        class="text-cyan-900 border-cyan-900 border-2 rounded-full px-2 bg-cyan-50 shadow-pixel shadow-cyan-900/80 active:shadow-none"
      >
        Next level
      </button>
    `);

    this.addListener('click');
    this.on('click', () => {
      scene.game.events.emit(EVENT_NAME.NextLevel);
      scene.scene.stop();
    });

    scene.add.existing(this);
  }
}

export { NextLevelButton };
