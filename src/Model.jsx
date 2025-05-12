import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three';

export const Model = forwardRef(function Model(props, ref) {
  const { scene } = useGLTF("/models/MARVEL_3.glb");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const defHeadRef = useRef(null);
  const orgHeadRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftAxesHelperRef = useRef(null);
  const rightAxesHelperRef = useRef(null);

  // Find and store bones
  useEffect(() => {
    if (scene.traverse) {
      scene.traverse((object) => {
        if (object.isBone) {
          console.log('Found bone:', object.name);
          if (object.name === "DEF-head") {
            defHeadRef.current = object;
            console.log('Found DEF-head bone');
          } else if (object.name === "ORG-head") {
            orgHeadRef.current = object;
            console.log('Found ORG-head bone');
          } else if (object.name === "ORG-eyeballL") {
            leftEyeRef.current = object;
            // Add axes helper to left eye
            const leftAxesHelper = new THREE.AxesHelper(0.1); // Small size for eye
            leftAxesHelperRef.current = leftAxesHelper;
            object.add(leftAxesHelper);
            console.log('Found left eye bone and added axes helper');
          } else if (object.name === "ORG-eyeballR") {
            rightEyeRef.current = object;
            // Add axes helper to right eye
            const rightAxesHelper = new THREE.AxesHelper(0.1); // Small size for eye
            rightAxesHelperRef.current = rightAxesHelper;
            object.add(rightAxesHelper);
            console.log('Found right eye bone and added axes helper');
          }
        }
      });
    }
  }, [scene]);

  // Update head and eye rotation to look at mouse position
  useEffect(() => {
    if (!defHeadRef.current || !orgHeadRef.current || !leftEyeRef.current || !rightEyeRef.current) {
      return;
    }

    // Simple direct rotation based on mouse position
    const maxRotation = Math.PI / 5;
    const eyeMaxRotation = Math.PI / 6;

    // Head rotation
    const headXRotation = -mousePosition.y * maxRotation;
    const headYRotation = mousePosition.x * maxRotation;
    const headRotation = new THREE.Euler(headXRotation, headYRotation, 0);
    
    console.log(mousePosition.x, mousePosition.y);

    // For left eye
    const leftEyeBaseMatrix = new THREE.Matrix4();
    const xRotationLeft = new THREE.Matrix4();
    const finalLeftMatrix = new THREE.Matrix4();
    const leftEyeRotation = new THREE.Euler();
   
    leftEyeBaseMatrix.makeRotationFromEuler(new THREE.Euler(
      Math.PI/2,
      Math.PI/2,
      -mousePosition.y * eyeMaxRotation
    ));
    
    xRotationLeft.makeRotationX(mousePosition.x * eyeMaxRotation);
    finalLeftMatrix.multiplyMatrices(leftEyeBaseMatrix, xRotationLeft);
    leftEyeRotation.setFromRotationMatrix(finalLeftMatrix);
    
    // For right eye
    const rightEyeBaseMatrix = new THREE.Matrix4();
    const xRotationRight = new THREE.Matrix4();
    const finalRightMatrix = new THREE.Matrix4();
    const rightEyeRotation = new THREE.Euler();

    rightEyeBaseMatrix.makeRotationFromEuler(new THREE.Euler(
      Math.PI/2,
      3*Math.PI/2,
      mousePosition.y * eyeMaxRotation,
    ));

    xRotationRight.makeRotationX(-mousePosition.x * eyeMaxRotation);
    finalRightMatrix.multiplyMatrices(rightEyeBaseMatrix, xRotationRight);
    rightEyeRotation.setFromRotationMatrix(finalRightMatrix);

    // Apply rotations
    defHeadRef.current.rotation.copy(headRotation);
    orgHeadRef.current.rotation.copy(headRotation);
    leftEyeRef.current.rotation.copy(leftEyeRotation);
    rightEyeRef.current.rotation.copy(rightEyeRotation);

    // Log the current rotation axes of both eyes
    if (leftAxesHelperRef.current && rightAxesHelperRef.current) {
      // Log left eye
      const leftWorldMatrix = new THREE.Matrix4();
      leftEyeRef.current.updateWorldMatrix(true, false);
      leftWorldMatrix.copy(leftEyeRef.current.matrixWorld);
      const leftPosition = new THREE.Vector3();
      const leftQuaternion = new THREE.Quaternion();
      const leftScale = new THREE.Vector3();
      leftWorldMatrix.decompose(leftPosition, leftQuaternion, leftScale);

      // Log right eye
      const rightWorldMatrix = new THREE.Matrix4();
      rightEyeRef.current.updateWorldMatrix(true, false);
      rightWorldMatrix.copy(rightEyeRef.current.matrixWorld);
      const rightPosition = new THREE.Vector3();
      const rightQuaternion = new THREE.Quaternion();
      const rightScale = new THREE.Vector3();
      rightWorldMatrix.decompose(rightPosition, rightQuaternion, rightScale);
    }
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