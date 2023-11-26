import { GameObjects, Math as PhaserMath, Scene } from 'phaser';

import { CELL_SIZE, GAME_HEIGHT, GAME_WIDTH } from '../constants';
import { Position } from '../types';

type Orientation = 'north' | 'east' | 'south' | 'west';
type Size = 1 | 2 | 4;

const spriteKeyBySize = {
  1: ['1x1-1', '1x1-2'],
  2: ['1x2-1-1', '1x2-1-2', '1x2-2-1', '1x2-2-2'],
  4: ['1x4-1', '1x4-2'],
};

const rotationByOrientation = {
  north: (3 * Math.PI) / 2,
  east: 0,
  south: Math.PI / 2,
  west: Math.PI,
};

const shadowOffset = 8;

class Car extends GameObjects.Sprite {
  static CAR_LAST_ID = 0;

  public id = Car.CAR_LAST_ID++;
  private beepSound: string;
  private nextBeepTime = 0;
  private orientation: Orientation;
  private size: Size;
  private shadowSprite: GameObjects.Sprite;
  private onMove: (
    carId: number,
    previousPosition: Position,
    newPosition: Position
  ) => void;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    orientation: Orientation,
    size: Size,
    onMove: (
      carId: number,
      previousPosition: Position,
      newPosition: Position
    ) => void
  ) {
    const spriteSrc =
      spriteKeyBySize[size][
        PhaserMath.Between(0, spriteKeyBySize[size].length - 1)
      ];
    super(scene, x, y, spriteSrc);

    this.orientation = orientation;
    this.size = size;
    this.onMove = onMove;
    this.beepSound = `beep-1x${this.size}-${PhaserMath.Between(
      1,
      this.size === 2 ? 3 : 1
    )}`;

    const splittedSrc = spriteSrc.split('-');
    splittedSrc[1] = 'shadow';
    const shadowSpriteSrc = splittedSrc.join('-');
    this.shadowSprite = new GameObjects.Sprite(
      scene,
      x + shadowOffset,
      y + shadowOffset,
      shadowSpriteSrc
    ).setAlpha(0.5);
    this.shadowSprite.setDepth(1);
    this.setDepth(2);

    this.transformSprite(this);
    this.transformSprite(this.shadowSprite);

    this.setInteractive();
    this.on('pointerdown', this.moveForward);

    scene.add.existing(this);
    scene.add.existing(this.shadowSprite);
  }

  preUpdate(time: number) {
    if (!this.isOut() && time > this.nextBeepTime) {
      this.beep();
    }
  }

  setPosition(x: number, y: number) {
    super.setPosition(x, y);
    this.shadowSprite?.setPosition(x + shadowOffset, y + shadowOffset);

    return this;
  }

  isOut() {
    return (
      this.x - CELL_SIZE / 2 === -(this.size * CELL_SIZE) ||
      this.x + CELL_SIZE / 2 === GAME_WIDTH + this.size * CELL_SIZE ||
      this.y - CELL_SIZE / 2 === -(this.size * CELL_SIZE) ||
      this.y + CELL_SIZE / 2 === GAME_HEIGHT + this.size * CELL_SIZE
    );
  }

  private moveForward() {
    let movement = 0;
    while (this.canMoveForwardTo((movement + 1) * CELL_SIZE)) {
      movement += 1;
    }

    if (movement === 0) {
      this.beep();
      return;
    }

    let to: { x?: string; y?: string };
    switch (this.orientation) {
      case 'north':
        to = { y: `-=${movement * CELL_SIZE}` };
        break;
      case 'east':
        to = { x: `+=${movement * CELL_SIZE}` };
        break;
      case 'south':
        to = { y: `+=${movement * CELL_SIZE}` };
        break;
      case 'west':
        to = { x: `-=${movement * CELL_SIZE}` };
        break;
      default:
        throw new Error('Invalid orientation: ' + this.orientation);
    }

    const previousPosition = { x: this.x, y: this.y };

    this.scene.tweens.add({
      targets: [this, this.shadowSprite],
      props: {
        scale: 2,
      },
      duration: 100,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: [this, this.shadowSprite],
      ...to,
      duration: 800,
      ease:
        movement > 4
          ? PhaserMath.Easing.Cubic.In
          : PhaserMath.Easing.Cubic.InOut,
      onComplete() {
        this.onMove(this.id, previousPosition, { x: this.x, y: this.y });
      },
      callbackScope: this,
    });
  }

  private canMoveForwardTo(distance: number) {
    const cars: Car[] | undefined = this.scene.registry.get('cars');

    let to = { x: this.x, y: this.y };
    switch (this.orientation) {
      case 'north':
        to.y -= distance;
        break;
      case 'east':
        to.x += distance;
        break;
      case 'south':
        to.y += distance;
        break;
      case 'west':
        to.x -= distance;
        break;
      default:
        throw new Error('Invalid orientation: ' + this.orientation);
    }

    return (
      to.x >= -(this.size * CELL_SIZE) &&
      to.x <= GAME_WIDTH + this.size * CELL_SIZE &&
      to.y >= -(this.size * CELL_SIZE) &&
      to.y <= GAME_HEIGHT + this.size * CELL_SIZE &&
      cars &&
      !cars.some((car) => !car.isOut() && car.getBounds().contains(to.x, to.y))
    );
  }

  private transformSprite(sprite: GameObjects.Sprite) {
    sprite.setScale(1.6);
    sprite.setOrigin((this.size * 2 - 1) / (this.size * 2), 1 / 2);
    sprite.setRotation(rotationByOrientation[this.orientation]);
  }

  private beep() {
    this.scene.sound.play(this.beepSound);
    this.nextBeepTime =
      this.scene.game.getTime() + PhaserMath.Between(1000, 5000);
  }
}

export { Car };
