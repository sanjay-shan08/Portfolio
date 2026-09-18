import { ScrollControls, Scroll } from '@react-three/drei';
import HeroObject from './HeroObject';
import LaptopScene from './LaptopScene';
import HeroUI from './HeroUI';

export default function MainScene() {
  return (
    <ScrollControls pages={6} damping={0.2}>

      <HeroObject />

      <LaptopScene />

      <Scroll html style={{ width: '100%', height: '100%' }}>
        <HeroUI />
      </Scroll>
    </ScrollControls>
  );
}
