import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./style.css";

const backgroundImage = "/backgrounds/bg.gif";
const logoImage = "/images/logo.png";

function NeonGrid() {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = (clock.elapsedTime * 0.75) % 1;
  });

  return (
    <gridHelper
      ref={ref}
      args={[48, 56, "#00aaff", "#003b88"]}
      position={[0, -2.6, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

function BlueGlow() {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.5) * 0.08);
    ref.current.rotation.y = clock.elapsedTime * 0.35;
  });

  return (
    <mesh ref={ref} position={[0, 0.7, -4]}>
      <sphereGeometry args={[1.65, 64, 64]} />
      <meshStandardMaterial
        color="#0077ff"
        emissive="#00aaff"
        emissiveIntensity={2.8}
        transparent
        opacity={0.00}
      />
    </mesh>
  );
}

function WireCube() {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.24;
    ref.current.rotation.y = clock.elapsedTime * 0.34;
  });

  return (
    <mesh ref={ref} position={[0, 0.8, -2.6]}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshBasicMaterial color="#54dcff" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 2.2, 6], fov: 60 }}>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 3]} intensity={4} color="#00aaff" />
      <BlueGlow />
      <WireCube />
      <NeonGrid />
    </Canvas>
  );
}

const bootLines = [
  "Microsoft MS-DOS Version 3.10",
  "Copyright Microsoft Corp 1981-1985.",
  "",
  "C:\\> LOAD LOGO.SYS",
  "LOGO FOUND: /images/logo.png",
  "",
  "C:\\> LOAD BACKDROP",
  "BACKGROUND FOUND: /backgrounds/dos-bg.png",
  "",
  "C:\\> DIR",
  "NEON.SYS      BLUEBOOT.EXE",
  "THREEJS.COM   TERMINAL.BAT",
  "BGIMAGE.PNG   GLOW.EXE",
  "",
  "C:\\> RUN GLOW",
  "Loading blue terminal environment..."
];

function TerminalText() {
  return (
    <>
      {bootLines.map((line, index) =>
        line === "" ? <br key={index} /> : <p key={index}>{line}</p>
      )}
      <p className="blink">_</p>
    </>
  );
}

export default function App() {
  return (
    <main className="page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="threeLayer">
        <Scene />
      </div>

      <div className="scanlines" />
      <div className="vignette" />

      <header className="logoContainer">
        <img src={logoImage} alt="Site logo" className="topLogo" />
      </header>

      <section className="terminal" aria-label="Microsoft DOS 3.1 terminal">
        <div className="terminalTop">
          <span>MICROSOFT DOS 3.1</span>
          <span>■</span>
        </div>

        <div className="terminalScreen">
          <TerminalText />
        </div>
      </section>
    </main>
  );
}
