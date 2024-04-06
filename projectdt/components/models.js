import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { ShaderMaterial } from "three";
import * as THREE from "three";

export function Model(props) {
  const { nodes } = useGLTF("/ind1.gltf");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const materials = useRef([]);

  useEffect(() => {
    let allMaterialsSetup = true;
    Object.keys(nodes).forEach((key, index) => {
      const node = nodes[key];
      if (node.material) {
        const customMaterial = new ShaderMaterial({
          uniforms: { time: { value: 0 } },
          vertexShader: `
          varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying vec3 vPosition;
            void main() {
                float time = time/50.0;
                float loopTime = mod(time, 1.0); // Loop time within a period of 2 units
                float alpha = clamp(1.5 - (-vPosition.z + 3.8) / 1.3 + loopTime, 0.02,0.5);
                gl_FragColor = vec4(1.0, 0.0, 0.0, loopTime*0.02);
                // gl_FragColor = vec4(0.1, 0.9, 1.0, 0.01);
                // gl_FragColor = vec4(1.0, 0.0, 0.0, alpha);
            }
          `,
        });
        const customMaterial2 = new ShaderMaterial({
          uniforms: { time: { value: 0 } },
          vertexShader: `
          varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying vec3 vPosition;
            void main() {
                float time = time/220.0;
                float loopTime = mod(time, 3.0); // Loop time within a period of 2 units
                float alpha = clamp(1.5 - (-vPosition.z + 3.8) / 1.3 + loopTime, 0.02,0.5);
                // gl_FragColor = vec4(0.0, 1.0, alpha, alpha*0.2);
                gl_FragColor = vec4(0.1, 0.9, 1.0, 0.01);
              
            }
          `,
        });

        if (node.material["name"] != "asdf") {
          // console.log(node.material["name"]);
          node.material = customMaterial2;
          // node.castShadow = true;
          // node.receiveShadow = true;
          node.material.wireframe = true;
          // node.material.wireframeLinewidth = 5;
          node.material.transparent = true;
          node.material.alphaTest = 0.0;
          // node.material.blending = THREE.AlphaBlending; // Use AlphaBlending for correct transparency sorting
          node.material.depthTest = true;
          node.material.depthWrite = false; // Set depthWrite to false for correct rendering order
          node.material.side = THREE.DoubleSide;
          // node.polygonOffset = true;
          // node.polygonOffsetFactor = -1;
          // node.polygonOffsetUnits = -1;

          materials.current[index] = customMaterial2;
        } else if (node.material["name"] == "asdf") {
          console.log(node.material["name"]);
          node.material = customMaterial;
          // node.castShadow = true;
          // node.receiveShadow = true;
          node.material.wireframe = true;
          // node.material.wireframeLinewidth = 5;
          node.material.transparent = true;
          node.material.alphaTest = 0.0;
          // node.material.blending = THREE.AlphaBlending; // Use AlphaBlending for correct transparency sorting
          node.material.depthTest = true;
          node.material.depthWrite = false; // Set depthWrite to false for correct rendering order
          node.material.side = THREE.DoubleSide;
          // node.polygonOffset = true;
          // node.polygonOffsetFactor = -1;
          // node.polygonOffsetUnits = -1;

          materials.current[index] = customMaterial;
        }
      } else {
        allMaterialsSetup = false;
      }
    });

    if (allMaterialsSetup) {
      setModelLoaded(true);
      console.log("Model loaded!");
    }
  }, [nodes]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10); // Update time every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    materials.current.forEach((material) => {
      material.uniforms.time.value = time;
    });
  }, [time]);

  return (
    <group
      scale={[0.05, 1.0, 0.05]}
      position={[0.0, 0.0, 0.0]}
      {...props}
      dispose={null}
    >
      {Object.values(nodes).map((child, index) => (
        <primitive key={index} object={child} />
      ))}
    </group>
  );
}

// useGLTF.preload("/car.gltf");
