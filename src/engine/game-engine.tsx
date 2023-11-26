'use client';

import { Game, Scale, Types } from 'phaser';
import React from 'react';

import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import { FinishedLevelScene, LoadingScene, MainScene, UIScene } from './scenes';

const GameEngine = () => {
  const targetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (targetRef.current) {
      const gameConfig: Types.Core.GameConfig = {
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        type: Phaser.AUTO,
        scene: [LoadingScene, MainScene, UIScene, FinishedLevelScene],
        parent: targetRef.current,
        scale: {
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          mode: Scale.ScaleModes.NONE,
        },
        dom: {
          createContainer: true,
        },
        loader: {
          crossOrigin: 'use-credentials',
        },
        antialias: false,
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
