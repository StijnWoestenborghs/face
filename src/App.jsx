// App.jsx
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';
import { RigControls } from './components/RigControls';

function Scene({ modelRef }) {
  return (
    <>
      <Model ref={modelRef} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
}

function App() {
  const modelRef = useRef();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Scene modelRef={modelRef} />
      </Canvas>
      <RigControls modelRef={modelRef} />
    </div>
  );
}

export default App;
