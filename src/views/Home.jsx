'use client';
import MazeHero from '@/components/home/MazeHero';
import PaperBody from '@/components/home/paper/PaperBody';

const Home = () => {
  return (
    <>
      {/* Prototype (redesign/without-the-maze-hero): the maze hero and the paper body.
          The previous HeroSection and section components are kept on disk for comparison. */}
      <MazeHero />
      <PaperBody />
    </>
  );
};

export { default as UsFlagIcon } from '@/components/icons/UsFlagIcon';

export default Home;
