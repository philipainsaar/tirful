import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";
const fallbackCover = "/images/logo.png";

const releases = [
  { name: "Unilateral Workflow", url: "https://tirful.bandcamp.com/album/unilateral-workflow", cover: fallbackCover },
  { name: "Straight From The Can", url: "https://tirful.bandcamp.com/track/straight-from-the-can", cover: fallbackCover },
  { name: "Gorbino's Quest", url: "https://tirful.bandcamp.com/track/gorbinos-quest", cover: fallbackCover },
  { name: "Primordial Sludge", url: "https://tirful.bandcamp.com/track/primordial-sludge", cover: fallbackCover },
  { name: "All You Want To Hear", url: "https://tirful.bandcamp.com/track/all-you-want-to-hear", cover: fallbackCover },
  { name: "Projected Sins", url: "https://tirful.bandcamp.com/track/projected-sins", cover: fallbackCover },
  { name: "Same Places, Different Endings", url: "https://tirful.bandcamp.com/track/same-places-different-endings", cover: fallbackCover },
  { name: "yNYNMhnh", url: "https://tirful.bandcamp.com/track/ynynmhnh", cover: fallbackCover },
  { name: "Twisting Light", url: "https://tirful.bandcamp.com/track/twisting-light", cover: fallbackCover },
  { name: "2 Days Away", url: "https://tirful.bandcamp.com/track/2-days-away", cover: fallbackCover },
  { name: "ERROR_", url: "https://tirful.bandcamp.com/album/error", cover: fallbackCover },
  { name: "RazorBladeZ", url: "https://tirful.bandcamp.com/track/razorbladez", cover: fallbackCover },
  { name: "NOT_JOINED", url: "https://tirful.bandcamp.com/track/not-joined", cover: fallbackCover },
  { name: "NO_INTERFACE", url: "https://tirful.bandcamp.com/track/no-interface-2", cover: fallbackCover },
  { name: "The Sun Feels Colder", url: "https://tirful.bandcamp.com/track/the-sun-feels-colder", cover: fallbackCover },
  { name: "I'll work it out in my way", url: "https://tirful.bandcamp.com/track/ill-work-it-out-in-my-way", cover: fallbackCover },
];

function SynthwaveGrid() {
  const gridRef = useRef(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.elapsedTime * 1.2) % 2;
  });

  return (
    <group position={[0, -2.2, -2]}>
      <gridHelper ref={gridRef} args={[70, 70, "#00ccff", "#004cff"]} />
    </group>
  );
}

function NeonOrb() {
  const orbRef = useRef(null);

  useFrame(({ clock }) => {
    if (!orbRef.current) return;

    const pulse = 1 + Math.sin(clock.elapsedTime * 1.7) * 0.055;
    orbRef.current.scale.set(pulse, pulse, pulse);
    orbRef.current.rotation.y = clock.elapsedTime * 0.35;
    orbRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.18;
  });

  return (
    <group ref={orbRef} position={[0, -0.18, -5.5]}>
      <mesh>
        <sphereGeometry args={[3.35, 48, 48]} />
        <meshStandardMaterial
          color="#0077ff"
          emissive="#00bbff"
          emissiveIntensity={2.7}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[3.42, 32, 32]} />
        <meshBasicMaterial
          color="#00ccff"
          wireframe
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.9, 0.025, 12, 160]} />
        <meshBasicMaterial
          color="#9ff4ff"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
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
          <meshBasicMaterial
            color="#00aaff"
            transparent
            opacity={0.28 - i * 0.02}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function ThreeBackground() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      camera={{ position: [0, 2.4, 6.4], fov: 64 }}
    >
      <ambientLight intensity={0.38} />
      <pointLight position={[0, 4, 2]} intensity={5} color="#00ccff" />
      <pointLight position={[-4, 1, -2]} intensity={2} color="#004cff" />
      <NeonOrb />
      <NeonHorizonLines />
      <SynthwaveGrid />
    </Canvas>
  );
}

function BootText() {
  return (
    <div className="bootText">
      <p>Microsoft MS-DOS Version 3.10</p>
      <p>Copyright Microsoft Corp 1981-1985.</p>
      <br />
      <p>C:\&gt; DIR</p>
      <p>TIRFUL.EXE&nbsp;&nbsp;&nbsp;&nbsp; PLAYER.DB</p>
      <p>THREEJS.COM&nbsp;&nbsp; BANDCAMP.BAT</p>
      <br />
      <p>C:\&gt; RUN PLAYER</p>
      <p>LOADING TIRFUL BANDCAMP INDEX...</p>
      <p className="blink">_</p>
    </div>
  );
}

function extractIframeSrc(html) {
  const srcMatch = html.match(/src="([^"]+)"/);
  return srcMatch ? srcMatch[1].replaceAll("&amp;", "&") : "";
}

function BandcampPlayer({ release }) {
  const [playerSrc, setPlayerSrc] = useState("");
  const [status, setStatus] = useState("LOADING BANDCAMP PLAYER...");

  useEffect(() => {
    let cancelled = false;

    async function loadPlayer() {
      try {
        setStatus("LOADING BANDCAMP PLAYER...");

        const endpoint = `https://bandcamp.com/oembed?format=json&url=${encodeURIComponent(release.url)}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        const src = extractIframeSrc(data.html || "");

        if (!cancelled) {
          if (src) {
            setPlayerSrc(src);
            setStatus("");
          } else {
            setStatus("PLAYER EMBED NOT FOUND. USE OPEN.");
          }
        }
      } catch {
        if (!cancelled) {
          setStatus("PLAYER BLOCKED BY BROWSER. USE OPEN.");
        }
      }
    }

    loadPlayer();

    return () => {
      cancelled = true;
    };
  }, [release]);

  return (
    <div className="playerBox">
      <div className="playerTop">
        <span>NOW PLAYING: {release.name}</span>
        <a href={release.url} target="_blank" rel="noreferrer">
          OPEN
        </a>
      </div>

      {status && <p className="playerStatus">{status}</p>}

      {playerSrc && (
        <iframe
          className="bandcampPlayer"
          title={`Bandcamp player for ${release.name}`}
          src={playerSrc}
          seamless="seamless"
          allow="autoplay"
        />
      )}
    </div>
  );
}

function AlbumPage() {
  const [activeRelease, setActiveRelease] = useState(null);

  return (
    <div className="albumPage">
      <div className="albumIntro">
        <p className="albumHeader">C:\&gt; TIRFUL_PLAYER</p>
        <p className="albumSub">PLAY loads in-page audio. Cover opens Bandcamp.</p>
      </div>

      {activeRelease && <BandcampPlayer release={activeRelease} />}

      <div className="albumList">
        {releases.map((release, index) => (
          <div className="albumRow" key={release.url}>
            <a
              className="coverLink"
              href={release.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${release.name} on Bandcamp`}
            >
              <img src={release.cover} alt={`${release.name} cover`} />
            </a>

            <span className="albumNumber">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="albumName">{release.name}</span>

            <button
              className="playButton"
              type="button"
              onClick={() => setActiveRelease(release)}
            >
              PLAY
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showAlbums, setShowAlbums] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlbums(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="page">
      <div
        className="imageBackground"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="threeLayer">
        <ThreeBackground />
      </div>

      <header className="logoWrap">
        <img src={logoImage} alt="Tirful logo" className="topLogo" />

        <div className="logoGlitchScratch">
          <span />
          <span />
          <span />
        </div>
      </header>

      <section className="terminal">
        <div className="top">
          <span>MICROSOFT DOS 3.1</span>
          <span>■</span>
        </div>

        <div className="screen">
          {showAlbums ? <AlbumPage /> : <BootText />}
        </div>
      </section>
    </main>
  );
}
