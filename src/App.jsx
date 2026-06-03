import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";

const bootLines = [
  "Microsoft MS-DOS Version 3.10",
  "Copyright Microsoft Corp 1981-1985.",
  "",
  "BIOS CHECKSUM: OK",
  "MEMORY TEST: 640K OK",
  "LOADING HIMEM.SYS...",
  "LOADING NEON_GRID.COM...",
  "LOADING THREEJS.EXE...",
  "",
  "C:\\> WIN /3.1 /NEON",
  "Starting Retro Windows 3.x shell...",
  "",
  "SYSTEM READY."
];

function NeonGrid() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = (clock.elapsedTime * 0.7) % 1;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.16) * 0.015;
  });

  return (
    <gridHelper
      ref={ref}
      args={[48, 64, "#00ccff", "#004d99"]}
      position={[0, -2.5, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

function NeonSun() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.8) * 0.06);
  });

  return (
    <mesh ref={ref} position={[0, 0.8, -4.2]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#0066ff"
        emissive="#00bbff"
        emissiveIntensity={3.2}
        transparent
        opacity={0.42}
      />
    </mesh>
  );
}

function NeonScene() {
  return (
    <Canvas camera={{ position: [0, 2.1, 6], fov: 62 }}>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, 3]} intensity={5} color="#00c8ff" />
      <pointLight position={[-3, 1, -2]} intensity={2} color="#334dff" />
      <NeonSun />
      <NeonGrid />
    </Canvas>
  );
}

function Typewriter({ lines, speed = 18 }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const fullText = lines.join("\n");
    let index = 0;

    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index += 1;

      if (index > fullText.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [lines, speed]);

  return (
    <pre className="typedText">
      {text}
      <span className="cursor">_</span>
    </pre>
  );
}

function DosWindow() {
  const winRef = useRef(null);
  const dragData = useRef({ active: false, x: 0, y: 0, left: 0, top: 0 });
  const [position, setPosition] = useState({ left: "50%", top: "54%" });

  function startDrag(e) {
    const box = winRef.current.getBoundingClientRect();

    dragData.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      left: box.left,
      top: box.top
    };

    document.body.classList.add("dragging");
  }

  useEffect(() => {
    function move(e) {
      if (!dragData.current.active) return;

      const dx = e.clientX - dragData.current.x;
      const dy = e.clientY - dragData.current.y;

      setPosition({
        left: `${dragData.current.left + dx}px`,
        top: `${dragData.current.top + dy}px`
      });
    }

    function stop() {
      dragData.current.active = false;
      document.body.classList.remove("dragging");
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
  }, []);

  return (
    <section
      ref={winRef}
      className="dosWindow"
      style={{
        left: position.left,
        top: position.top
      }}
    >
      <div className="titleBar" onPointerDown={startDrag}>
        <button className="winButton" aria-label="menu" />
        <span>MICROSOFT DOS 3.1 - NEON.EXE</span>
        <div className="winControls">
          <span>□</span>
          <span>×</span>
        </div>
      </div>

      <div className="terminalScreen">
        <Typewriter lines={bootLines} />
      </div>

      <div className="resizeHint">◢</div>
    </section>
  );
}

function LoadingSplash() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loadingSplash ${hidden ? "hideSplash" : ""}`}>
      <div className="splashBox">
        <div className="splashTitle">MS-DOS 3.1</div>
        <div className="splashText">Loading neon drivers...</div>
        <div className="loadingBar">
          <span />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main className="page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="threeLayer">
        <NeonScene />
      </div>

      <div className="crtOverlay" />
      <div className="scanlines" />

      <header className="logoContainer">
        <img src={logoImage} alt="Top logo" className="topLogo" />
      </header>

      <DosWindow />

      <LoadingSplash />
    </main>
  );
}
