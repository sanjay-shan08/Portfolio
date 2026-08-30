import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import MainScene from './MainScene';

function ResponsiveCamera() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    if (size.width < 1024) {
      // Linearly pull the camera back as the screen gets narrower than 1024px
      const factor = (1024 - size.width) / 1024; 
      camera.position.z = 8 + factor * 10; // Pulls back to ~14 on mobile
    } else {
      camera.position.z = 8; // Default desktop
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);
  
  return null;
}

export default function CanvasContainer() {
  return (
    <div className="absolute-fill">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <color attach="background" args={['#0a0a0a']} />
          
          {/* Environment and Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#5555ff" />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
              <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
              <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            </group>
          </Environment>

          {/* 3D Elements orchestrated by Scroll */}
          <MainScene />

          {/* Post-processing */}
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={0.8} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
