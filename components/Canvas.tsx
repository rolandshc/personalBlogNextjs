import React, { useRef, useEffect } from "react";
import { Canvas, extend, useFrame, type ThreeElements } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: {
      args?: ConstructorParameters<typeof TextGeometry>;
      attach?: string;
    };
  }
}

const HelloWorldText = () => {
  const textRef = useRef<THREE.Mesh>(null);
  const font = new FontLoader().parse(helvetiker);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.computeBoundingBox();
      const { boundingBox } = textRef.current.geometry;
      if (boundingBox) {
        const xOffset = (boundingBox.max.x - boundingBox.min.x) / -2;
        const yOffset = (boundingBox.max.y - boundingBox.min.y) / -2;
        const zOffset = (boundingBox.max.z - boundingBox.min.z) / -2;
        textRef.current.position.set(xOffset, yOffset, zOffset);
      }
    }
  }, []);

  return (
    <mesh ref={textRef}>
      <textGeometry
        args={[
          "Ciao! I'm Roland",
          {
            font: font,
            size: 1,
            height: 0.01,
            curveSegments: 20,
            bevelEnabled: true,
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
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const directionRef = useRef(1);

  useFrame(() => {
    if (spotlightRef.current) {
      spotlightRef.current.position.x += directionRef.current * 0.05;

      if (spotlightRef.current.position.x > 10) {
        directionRef.current = -1;
      } else if (spotlightRef.current.position.x < -10) {
        directionRef.current = 1;
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
