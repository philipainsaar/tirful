import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";

function SynthwaveGrid() {
  const gridRef = useRef(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.elapsedTime * 1.2) % 2;
  });

  return (
    <group position={[0, -2.2, -2]}>
      <gridHelper
        ref={gridRef}
        args={[70, 70, "#00ccff", "#004cff"]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

function NeonOrb() {
  const orbRef = useRef(null);

  useFrame(({ clock }) => {
      if (!orbRef.current) return;

        const pulse = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.06;
          orbRef.current.scale.set(pulse, pulse, pulse);

            orbRef.current.rotation.y += 0.01;
              orbRef.current.rotation.x += 0.003;
              });

  return (
    <mesh ref={orbRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.65, 16, 16]} />
      <meshBasicMaterial
        wireframe
          color="#00aaff"
      />
    </mesh>
  );
}

function NeonHorizonLines() {
  const linesRef = useRef(null);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    linesRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={linesRef} position={[0, -0.65, -5]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.18, 0]}>
          <boxGeometry args={[9.5 - i * 0.55, 0.012, 0.012]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.28 - i * 0.02} />
        </mesh>
      ))}
    </group>
  );
}

function ThreeBackground() {
    return (
        <Canvas
              gl={{
                      alpha: true,
                              antialias: true
                                    }}
                                          onCreated={({ gl }) => {
                                                  gl.setClearColor(0x000000, 0);
                                                        }}
                                                              camera={{ position: [0, 2.4, 6.4], fov: 64 }}
                                                                  >
                                                                        <ambientLight intensity={0.38} />
                                                                              <pointLight position={[0, 4, 2]} intensity={5} color="#00ccff" />
                                                                                    <NeonOrb />
                                                                                          <NeonHorizonLines />
                                                                                                <SynthwaveGrid />
                                                                                                    </Canvas>
                                                                                                      );
                                                                                                      }


export default function App() {
  return (
    <main className="page">
      <div className="imageBackground" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="threeLayer">
        <ThreeBackground />
      </div>

      <header className="logoWrap">
        <img src={logoImage} alt="Logo" className="topLogo" />
      </header>

      <section className="terminal">
        <div className="top">
          <span>MICROSOFT DOS 3.1</span>
          <span>■</span>
        </div>

        <div className="screen">
          <p>Microsoft MS-DOS Version 3.10</p>
          <p>Copyright Microsoft Corp 1981-1985.</p>
          <br />
          <p>C:\&gt; DIR</p>
          <p>NEON.SYS&nbsp;&nbsp;&nbsp;&nbsp; BLUEBOOT.EXE</p>
          <p>THREEJS.COM&nbsp;&nbsp; TERMINAL.BAT</p>
          <br />
          <p>C:\&gt; RUN GLOW</p>
          <p>THREE.JS SYNTHWAVE GRID LOADED</p>
          <p className="blink">_</p>
        </div>
      </section>
    </main>
  );
}
