import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

export const Model = forwardRef(function Model(props, ref) {
  const { scene } = useGLTF("/models/MARVEL_3.glb");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const defNeckRef = useRef(null);
  const orgNeckRef = useRef(null);
  const cameraRef = useRef(null);

  // Find and store neck bones
  useEffect(() => {
    if (scene.traverse) {
      scene.traverse((object) => {
        if (object.isBone) {
          console.log('Found bone:', object.name);
          if (object.name === "DEF-head") {
            defNeckRef.current = object;
            console.log('Found DEF-neck bone');
          } else if (object.name === "ORG-head") {
            orgNeckRef.current = object;
            console.log('Found ORG-neck bone');
          }
        }
        // Find the camera
        if (object.isCamera) {
          cameraRef.current = object;
          console.log('Found camera');
        }
      });
    }
  }, [scene]);

  // Update neck rotation to look at mouse position
  useEffect(() => {
    if (!defNeckRef.current || !orgNeckRef.current) {
      return;
    }

    const offset = 0; // offset should depend on position of the model in the screen
    
    // Simple direct rotation based on mouse position
    const maxRotation = Math.PI / 4;
    const xRotation = -mousePosition.y * maxRotation + offset;
    const yRotation = mousePosition.x * maxRotation;

    const rotation = new THREE.Euler(xRotation, yRotation, 0);

    defNeckRef.current.rotation.copy(rotation);
    orgNeckRef.current.rotation.copy(rotation);
  }, [mousePosition]);

  // Track mouse movement
  React.useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <primitive 
      ref={ref}
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
      {...props}
    />
  );
});