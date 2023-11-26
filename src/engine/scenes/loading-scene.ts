import { Scene } from 'phaser';

import { MainScene, UIScene } from '.';

class LoadingScene extends Scene {
  static KEY = 'LoadingScene';

  constructor() {
    super({ key: LoadingScene.KEY });
  }

  preload() {
    [
      '1x1-1',
      '1x1-2',
      '1x1-shadow',
      '1x2-1-1',
      '1x2-2-1',
      '1x2-shadow-1',
      '1x2-1-2',
      '1x2-2-2',
      '1x2-shadow-2',
      '1x4-1',
      '1x4-2',
      '1x4-shadow',
      'background',
    ].forEach((spriteName) =>
      this.load.image(spriteName, `assets/sprites/${spriteName}.png`)
    );
    [
      'beep-1x1-1',
      'beep-1x2-1',
      'beep-1x2-2',
      'beep-1x2-3',
      'beep-1x4-1',
      'engine-1x1-1',
      'engine-1x2-1',
      'engine-1x4-1',
      'background',
    ].forEach((spriteName) =>
      this.load.audio(spriteName, `assets/sfx/${spriteName}.mp3`)
    );
  }

  create() {
    this.scene.start(MainScene.KEY);
    this.scene.start(UIScene.KEY);
  }
}

export { LoadingScene };
