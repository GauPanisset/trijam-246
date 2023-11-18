'use client';

import dynamic from 'next/dynamic';

const GameEngine = dynamic(
  () => import('@/engine').then((module) => module.GameEngine),
  { ssr: false }
);

const Home = () => {
  return <main>{<GameEngine />}</main>;
};

export default Home;
