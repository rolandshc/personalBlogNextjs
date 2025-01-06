import React, { useRef, useEffect } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

extend({ TextGeometry });

const HelloWorldText = () => {
  const textRef = useRef();
  const font = new FontLoader().parse(helvetiker);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.computeBoundingBox();
      const { boundingBox } = textRef.current.geometry;
      const xOffset =
        (boundingBox.max.x - boundingBox.min.x) / -2; // Center horizontally
      const yOffset =
        (boundingBox.max.y - boundingBox.min.y) / -2; // Center vertically
      const zOffset =
        (boundingBox.max.z - boundingBox.min.z) / -2; // Center depth-wise
      textRef.current.position.set(xOffset, yOffset, zOffset);
    }
  }, []);

  return (
    <mesh ref={textRef}>
      <textGeometry
        args={[
          "Ciao! I'm Roland", // The text to display
          {
            font: font,
            size: 1, // Font size (made larger)
            height: 0.01, // Depth of the text
            curveSegments: 20, // Smoothness of the curves
            bevelEnabled: true, // Add bevel to the text
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 3,
          },
        ]}
      />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const MovingSpotlight = () => {
  const spotlightRef = useRef();
  const directionRef = useRef(1); // 1 for right, -1 for left

  useFrame(() => {
    if (spotlightRef.current) {
      spotlightRef.current.position.x += directionRef.current * 0.05;

      // Reverse direction when limits are reached
      if (spotlightRef.current.position.x > 10) {
        directionRef.current = -1; // Move left
      } else if (spotlightRef.current.position.x < -10) {
        directionRef.current = 1; // Move right
      }
    }
  });

  return (
    <spotLight
      ref={spotlightRef}
      position={[0, 0, 1]}
      intensity={100}
      angle={0.5}
      penumbra={1}
      castShadow
    />
  );
};

const ThreeCanvas = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.1} />
      <MovingSpotlight />
      <HelloWorldText />
    </Canvas>
  );
};

export default ThreeCanvas;