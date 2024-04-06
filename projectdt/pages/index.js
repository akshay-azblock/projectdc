import { Model } from "@/components/models";

import {
  OrbitControls,
  Plane,
  MeshStandardMaterial,
  Environment,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Main } from "next/document";
import React from "react";

const Index = () => {
  const canvasStyle = {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
  };

  return (
    <main style={canvasStyle}>
      <div style={canvasStyle}>
        <Canvas shadowMap style={canvasStyle}>
          <color attach="background" args={["#112"]} />
          <OrbitControls />
          <directionalLight
            position={[0, 10, 0]}
            intensity={1.0}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <Model />
          <ContactShadows
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            opacity={1}
            width={40}
            height={40}
            blur={0.6}
            far={0.1}
          />
        </Canvas>
      </div>
    </main>
  );
};

export default Index;
