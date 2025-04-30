// App.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import "./App.css";

function App() {
  return (
    <>
      <div style={{ width: "80vw", height: "80vh" }}>
        <Canvas camera={{ position: [0, 1.5, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
