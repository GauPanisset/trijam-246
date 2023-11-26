import { GameObjects, Scene } from 'phaser';

import { formatSeconds } from '../helpers/formatSeconds';

class TimerText extends GameObjects.DOMElement {
  private timeInSeconds: number = 0;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.setOrigin(0);

    this.updateHTML();

    scene.add.existing(this);
  }

  updateTimer(newValue: number) {
    this.timeInSeconds = newValue;
    this.updateHTML();
  }

  private updateHTML() {
    this.createFromHTML(/* HTML */ `
      <div
        class="text-cyan-900 font-semibold text-xs flex justify-center items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        ${formatSeconds(this.timeInSeconds)}
      </div>
    `);
  }
}

export { TimerText };
