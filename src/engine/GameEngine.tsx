'use client';

import { Game, Scale, Types } from 'phaser';
import React from 'react';

import { gameHeight, gameWidth } from './config';
import { MainScene } from './scenes';

const GameEngine = () => {
  const targetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (targetRef.current) {
      const gameConfig: Types.Core.GameConfig = {
        width: gameWidth,
        height: gameHeight,
        type: Phaser.AUTO,
        scene: [MainScene],
        parent: targetRef.current,
        scale: {
          width: gameWidth,
          height: gameHeight,
          mode: Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT,
        },
        dom: {
          createContainer: true,
        },
        loader: {
          crossOrigin: 'use-credentials',
        },
      };

      const game = new Game(gameConfig);

      return () => {
        game.destroy(true);
      };
    }

    return undefined;
  }, []);

  return <div ref={targetRef} className="relative h-full w-full" />;
};

export { GameEngine };
