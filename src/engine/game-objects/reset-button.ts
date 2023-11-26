import { GameObjects, Scene } from 'phaser';

import { EVENT_NAME } from '../constants';

class ResetButton extends GameObjects.DOMElement {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.createFromHTML(/* HTML */ `
      <button
        class="text-cyan-900 border-cyan-900 border-2 rounded-full h-10 w-10 bg-cyan-50 shadow-pixel shadow-cyan-900/80 active:shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 m-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </button>
    `);

    this.addListener('click');
    this.on('click', () => {
      scene.game.events.emit(EVENT_NAME.Cancel);
    });

    scene.add.existing(this);
  }
}

export { ResetButton };
