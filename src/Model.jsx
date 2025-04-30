// Model.jsx
import React, { useRef, useState } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

export function Model() {
  const { scene } = useGLTF("/models/45.glb");
  const { camera } = useThree();
  const spineRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState(0);

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

  // Find the bones once model is loaded
  React.useEffect(() => {
    console.log('Available bones in the model:');
    scene.traverse((object) => {
      if (object.isBone) {
        console.log(`Bone name: ${object.name}`);
        if (object.name === "head") {
          headRef.current = object;
        } else if (object.name === "upper_armL") {
          leftArmRef.current = object;
        } else if (object.name === "upper_armR") {
          rightArmRef.current = object;
        } else if (object.name === "thighL") {
          leftLegRef.current = object;
        } else if (object.name === "thighR") {
          rightLegRef.current = object;
        } else if (object.name === "CC_Base_L_Eye") {
          leftEyeRef.current = object;
        } else if (object.name === "CC_Base_R_Eye") {
          rightEyeRef.current = object;
        } else if (object.name === "spine003") {
          spineRef.current = object;
        }
      }
    });
  }, [scene]);

  // Apply animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Calculate target direction based on mouse position
    const targetDirection = new THREE.Vector3(mousePosition.x, mousePosition.y, 0);
    targetDirection.normalize();

    // Smooth spine rotation with interpolation
    if (spineRef.current) {
      const targetRotation = Math.atan2(targetDirection.x, targetDirection.z) * 0.2;
      const smoothFactor = 0.1;
      const newRotation = currentRotation + (targetRotation - currentRotation) * smoothFactor;
      setCurrentRotation(newRotation);
      spineRef.current.rotation.y = newRotation;
    }

    // Head rotation to look at pointer
    if (headRef.current) {
      const maxHeadRotation = Math.PI / 4; // Reduced rotation for more natural movement
      // Y rotation (left/right)
      headRef.current.rotation.y = mousePosition.x * maxHeadRotation;
      // X rotation (up/down)
      headRef.current.rotation.x = -mousePosition.y * maxHeadRotation;
      // Add slight tilt based on mouse position
      headRef.current.rotation.z = mousePosition.x * maxHeadRotation * 0.2;
    }

    // Eyes following mouse
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeMaxRotation = Math.PI / 8;
      // Set default forward-facing position with negative rotation
      leftEyeRef.current.rotation.set(0, -Math.PI/2, 0);
      rightEyeRef.current.rotation.set(0, -Math.PI/2, 0);
      // Then apply horizontal rotation
      leftEyeRef.current.rotation.x = Math.PI + (mousePosition.x * eyeMaxRotation);
      rightEyeRef.current.rotation.x = Math.PI + (mousePosition.x * eyeMaxRotation);
    }

    // Legs walking motion
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time) * 0.5;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(time + Math.PI) * 0.5;
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={new THREE.Vector3(-0.1119957372536149, 0.7, 1.8)}
        fov={30}
        near={0.1}
        far={1000}
        rotation={new THREE.Euler(0.08189374639765687, 0.080582541329128964, -0.004969370274470226)}
      />
      <primitive object={scene} scale={1.2} position={[0, -2, 0]} />
    </>
  );
}
