import { Scene } from 'phaser';

import { EVENT_NAME } from '../constants';
import { Car } from '../game-objects';
import { convert } from '../helpers/convert';
import { levels } from '../levels';
import { Position } from '../types';
import { FinishedLevelScene, UIScene } from '.';

export class MainScene extends Scene {
  static KEY = 'MainScene';

  private currentLevel: number = 1;
  private movesHistory: {
    carId: number;
    previousPosition: Position;
    newPosition: Position;
  }[] = [];
  private startAt: number = 0;

  constructor() {
    super({ key: MainScene.KEY });
  }

  create() {
    this.add.sprite(0, 0, 'background').setOrigin(0);
    this.sound.play('background', {
      loop: true,
      volume: 0.5,
    });

    this.startAt = Date.now();
    this.movesHistory = [];

    this.registry.set(
      'cars',
      levels[this.currentLevel].map(
        (carConfig) =>
          new Car(
            this,
            convert(carConfig.x),
            convert(carConfig.y),
            carConfig.orientation,
            carConfig.size,
            this.pushToHistory.bind(this)
          )
      )
    );

    this.game.events.on(EVENT_NAME.Cancel, this.cancelMove, this);
    this.game.events.on(EVENT_NAME.NextLevel, this.nextLevel, this);

    this.events.on('shutdown', () => {
      this.game.events.off(EVENT_NAME.Cancel);
      this.game.events.off(EVENT_NAME.NextLevel);
    });
  }

  update() {
    const timeInSeconds = Math.floor((Date.now() - this.startAt) / 1000);
    this.game.events.emit(EVENT_NAME.TimerUpdate, timeInSeconds);

    const cars: Car[] | undefined = this.registry.get('cars');

    if (cars && cars.filter((car) => !car.isOut()).length === 0) {
      cars.forEach((car) => car.destroy());

      this.scene.launch(FinishedLevelScene.KEY, {
        currentLevel: this.currentLevel,
        moves: this.movesHistory.length,
        timeInSeconds: timeInSeconds,
      });
      this.scene.pause();
      this.scene.stop(UIScene.KEY);
    }
  }

  private cancelMove() {
    const lastMoveHistory = this.movesHistory.pop();
    if (!lastMoveHistory) {
      return;
    }

    const { carId, previousPosition } = lastMoveHistory;

    const cars: Car[] | undefined = this.registry.get('cars');
    if (!cars) {
      return;
    }

    const car = cars.find((c) => c.id === carId);
    if (!car) {
      return;
    }

    car.setPosition(previousPosition.x, previousPosition.y);

    this.game.events.emit(EVENT_NAME.MoveUpdate, this.movesHistory.length);
  }

  private pushToHistory(
    carId: number,
    previousPosition: Position,
    newPosition: Position
  ) {
    this.movesHistory.push({ carId, previousPosition, newPosition });

    this.game.events.emit(EVENT_NAME.MoveUpdate, this.movesHistory.length);
  }

  private nextLevel() {
    if (!levels[this.currentLevel + 1]) {
      return;
    }

    this.currentLevel += 1;

    this.scene.restart();
    this.scene.launch(UIScene.KEY);
  }
}
