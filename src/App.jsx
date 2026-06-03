import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";
const fallbackCover = "/images/logo.png";

/*
  Complete combined version:
  - Player outside terminal
  - Option B instant Bandcamp embed
  - All provided embed URLs
  - Lyrics-ready fields
  - No oEmbed/fetch
  - No autoplay attempt

  Add lyrics per release:
  lyrics: `your lyrics here`

  For exact line sync:
  syncedLyrics: [
    { time: 0, text: "first line" },
    { time: 12.5, text: "second line" }
  ]

  Set durationSeconds to exact song length for smooth auto-scroll lyrics.
*/

const releases = [
  {
    name: 'Unilateral Workflow',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/unilateral-workflow',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3207621954/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Straight From The Can',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/straight-from-the-can',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=149509746/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: "Gorbino's Quest",
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/gorbinos-quest',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=576207098/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Primordial Sludge',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/primordial-sludge',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3851790619/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'All You Want To Hear',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/all-you-want-to-hear',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=778678908/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Projected Sins',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/projected-sins',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2353183252/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Same Places, Different Endings',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/same-places-different-endings',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3260983734/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'yNYNMhnh',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/ynynmhnh',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=4294218096/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Twisting Light',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/twisting-light',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=678391349/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: '2 Days Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/2-days-away',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=472756539/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'ERROR_',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/error',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3117184652/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'RazorBladeZ',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/razorbladez',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=234314278/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'NOT_JOINED',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/not-joined',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=100176574/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'NO_INTERFACE',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/no-interface-2',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2204686771/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'The Sun Feels Colder',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/the-sun-feels-colder',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=285289752/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: "I'll work it out in my way",
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/ill-work-it-out-in-my-way',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=888650209/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Any Easy Intimacy',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/any-easy-intimacy',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2334350329/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Fragmented and Lost',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/fragmented-and-lost',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=936361839/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Who You Really Were',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/who-you-really-were',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=948271045/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Before I Knew',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/before-i-knew',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=4074488612/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Goodbye',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/goodbye',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3842785507/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Fragments of Loss',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/fragments-of-loss',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=1327757472/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Allysin',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/allysin',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1119227384/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Barely a Chance',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/barely-a-chance',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1479601724/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Koume',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/koume',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1403161770/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Debris Slide',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/debris-slide',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2561265051/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Wish Yourself Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/wish-yourself-away',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2344296227/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'You Turned Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/you-turned-away',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3937048583/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Field of Being',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/field-of-being',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=459115388/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  },
  {
    name: 'Be There',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/be-there',
    cover: fallbackCover,
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2251432630/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/',
    durationSeconds: 180,
    lyrics: "",
    syncedLyrics: []
  }
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
    <group ref={orbRef} position={[0, -0.08, -5.7]}>
      <mesh>
        <sphereGeometry args={[3.9, 48, 48]} />
        <meshStandardMaterial
          color="#0077ff"
          emissive="#00bbff"
          emissiveIntensity={2.8}
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[4.0, 32, 32]} />
        <meshBasicMaterial
          color="#00ccff"
          wireframe
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.55, 0.025, 12, 160]} />
        <meshBasicMaterial
          color="#9ff4ff"
          transparent
          opacity={0.24}
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
      <p>WIN31MP.EXE&nbsp;&nbsp; LYRICS.SCR</p>
      <br />
      <p>C:\&gt; RUN WIN31MP</p>
      <p>LOADING WINDOWS 3.1 MEDIA PLAYER...</p>
      <p className="blink">_</p>
    </div>
  );
}

function usePlaybackClock(release, isRunning, resetKey) {
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(0);
  const savedElapsed = useRef(0);

  useEffect(() => {
    setElapsed(0);
    savedElapsed.current = 0;
    startTime.current = performance.now();
  }, [resetKey, release]);

  useEffect(() => {
    if (!isRunning) {
      savedElapsed.current = elapsed;
      return;
    }

    startTime.current = performance.now() - savedElapsed.current * 1000;
    let frameId;

    function tick() {
      const nextElapsed = (performance.now() - startTime.current) / 1000;
      setElapsed(Math.min(nextElapsed, release.durationSeconds || 180));
      frameId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(frameId);
  }, [isRunning, release]);

  return elapsed;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function LyricsWindow({ release, elapsed, onClose, onRestart }) {
  const lyricsRef = useRef(null);
  const synced = release.syncedLyrics && release.syncedLyrics.length > 0;
  const lyricsText = release.lyrics?.trim();

  const activeLineIndex = synced
    ? release.syncedLyrics.reduce((active, line, index) => {
        return elapsed >= line.time ? index : active;
      }, 0)
    : 0;

  useEffect(() => {
    const element = lyricsRef.current;
    if (!element) return;

    if (synced) {
      const activeLine = element.querySelector(`[data-line="${activeLineIndex}"]`);
      if (activeLine) activeLine.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const duration = Math.max(release.durationSeconds || 180, 1);
    const maxScroll = element.scrollHeight - element.clientHeight;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollTop = maxScroll * progress;
  }, [elapsed, release, synced, activeLineIndex]);

  return (
    <div className="lyricsWindow">
      <div className="lyricsTitleBar">
        <span>LYRICS.SCR - {release.name}</span>
        <button type="button" onClick={onRestart}>↺</button>
        <button type="button" onClick={onClose}>×</button>
      </div>

      <div className="lyricsMeta">
        <span>TIME {formatTime(elapsed)}</span>
        <span>DURATION {formatTime(release.durationSeconds || 180)}</span>
      </div>

      <div className="lyricsScroller" ref={lyricsRef}>
        {synced ? (
          release.syncedLyrics.map((line, index) => (
            <p
              key={`${line.time}-${line.text}`}
              data-line={index}
              className={index === activeLineIndex ? "activeLyricLine" : ""}
            >
              {line.text}
            </p>
          ))
        ) : lyricsText ? (
          lyricsText.split("\n").map((line, index) => (
            <p key={`${index}-${line}`}>{line || "\u00a0"}</p>
          ))
        ) : (
          <p className="emptyLyrics">
            NO LYRICS ADDED. PASTE LYRICS INTO release.lyrics OR ADD syncedLyrics.
          </p>
        )}
      </div>
    </div>
  );
}

function FloatingWin31Player({
  release,
  currentIndex,
  total,
  minimized,
  onPrevious,
  onNext,
  onClose,
  onMinimize,
  onRestore
}) {
  const [position, setPosition] = useState({ x: 18, y: 120 });
  const [showLyrics, setShowLyrics] = useState(false);
  const [clockRunning, setClockRunning] = useState(false);
  const [clockResetKey, setClockResetKey] = useState(0);
  const drag = useRef({ active: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  const elapsed = usePlaybackClock(release, clockRunning, clockResetKey);

  useEffect(() => {
    setClockRunning(false);
    setShowLyrics(false);
    setClockResetKey((value) => value + 1);
  }, [release]);

  function startDrag(event) {
    event.preventDefault();

    drag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: position.x,
      baseY: position.y
    };

    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", stopDrag);
  }

  function moveDrag(event) {
    if (!drag.current.active) return;

    const nextX = drag.current.baseX + event.clientX - drag.current.startX;
    const nextY = drag.current.baseY + event.clientY - drag.current.startY;

    setPosition({
      x: Math.max(4, Math.min(nextX, window.innerWidth - 220)),
      y: Math.max(4, Math.min(nextY, window.innerHeight - 120))
    });
  }

  function stopDrag() {
    drag.current.active = false;
    window.removeEventListener("pointermove", moveDrag);
    window.removeEventListener("pointerup", stopDrag);
  }

  function restartLyricsClock() {
    setClockResetKey((value) => value + 1);
    setClockRunning(true);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", stopDrag);
    };
  }, []);

  if (!release) return null;

  if (minimized) {
    return (
      <button className="minimizedPlayer" type="button" onClick={onRestore}>
        ▣ MEDIA PLAYER - {release.name}
      </button>
    );
  }

  return (
    <>
      <div
        className="floatingWinPlayer"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="winPlayerTitleBar" onPointerDown={startDrag}>
          <span className="winPlayerMenuBox" />
          <span className="winPlayerTitle">Windows 3.1 Media Player - TIRFUL.WAV</span>

          <button
            className="winPlayerControlButton"
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onMinimize}
            aria-label="Minimize player"
          >
            _
          </button>

          <button
            className="winPlayerControlButton"
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={onClose}
            aria-label="Close player"
          >
            ×
          </button>
        </div>

        <div className="winPlayerBody">
          <a
            className="winPlayerArt"
            href={release.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${release.name} on Bandcamp`}
          >
            <img src={release.cover} alt={`${release.name} cover`} />
          </a>

          <div className="winPlayerPanel">
            <div className="winPlayerDisplay">
              <p className="winPlayerNow">NOW PLAYING</p>
              <p className="winPlayerTrack">{release.name}</p>
              <p className="winPlayerArtist">{release.artist}</p>
              <p className="winPlayerCounter">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </div>

            <div className="fakeProgress">
              <span style={{ width: `${Math.min((elapsed / (release.durationSeconds || 180)) * 100, 100)}%` }} />
            </div>

            <div className="winPlayerControls">
              <button type="button" onClick={onPrevious}>◀ PREV</button>
              <button type="button" onClick={onNext}>NEXT ▶</button>
              <button type="button" onClick={() => setShowLyrics((value) => !value)}>LYRICS</button>
              <button type="button" onClick={restartLyricsClock}>↺ SYNC LYRICS</button>
              <button type="button" onClick={() => setClockRunning((value) => !value)}>
                {clockRunning ? "❚❚ PAUSE LYRICS" : "▶ START LYRICS"}
              </button>
              <a href={release.url} target="_blank" rel="noreferrer">OPEN BANDCAMP</a>
            </div>

            <div className="winPlayerEmbed">
              <div className="bandcampInstruction">
                Press ▶ inside the Bandcamp player below
              </div>

              <iframe
                className="bandcampPlayer"
                title={`Bandcamp player for ${release.name}`}
                src={release.embedUrl}
                seamless="seamless"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      </div>

      {showLyrics && (
        <LyricsWindow
          release={release}
          elapsed={elapsed}
          onRestart={restartLyricsClock}
          onClose={() => setShowLyrics(false)}
        />
      )}
    </>
  );
}

function AlbumPage({ activeIndex, onPlayRelease }) {
  return (
    <div className="albumPage">
      <div className="albumIntro">
        <p className="albumHeader">C:\&gt; TIRFUL_PLAYER</p>
        <p className="albumSub">OPEN PLAYER loads Bandcamp inside a Win 3.1 window.</p>
      </div>

      <div className="albumGrid">
        {releases.map((release, index) => (
          <article
            className={`albumCard ${activeIndex === index ? "activeAlbumCard" : ""}`}
            key={release.url}
          >
            <a
              className="coverLink"
              href={release.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${release.name} on Bandcamp`}
            >
              <img src={release.cover} alt={`${release.name} cover`} />
            </a>

            <div className="albumCardFooter">
              <p className="albumName">{release.name}</p>

              <button
                className="playButton"
                type="button"
                onClick={() => onPlayRelease(index)}
              >
                OPEN PLAYER
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showAlbums, setShowAlbums] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const activeRelease = activeIndex === null ? null : releases[activeIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlbums(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function playRelease(index) {
    setActiveIndex(index);
    setMinimized(false);
  }

  function previousRelease() {
    setActiveIndex((current) => {
      if (current === null) return releases.length - 1;
      return (current - 1 + releases.length) % releases.length;
    });
    setMinimized(false);
  }

  function nextRelease() {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + 1) % releases.length;
    });
    setMinimized(false);
  }

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
          {showAlbums ? (
            <AlbumPage activeIndex={activeIndex} onPlayRelease={playRelease} />
          ) : (
            <BootText />
          )}
        </div>
      </section>

      {activeRelease && (
        <FloatingWin31Player
          release={activeRelease}
          currentIndex={activeIndex}
          total={releases.length}
          minimized={minimized}
          onPrevious={previousRelease}
          onNext={nextRelease}
          onMinimize={() => setMinimized(true)}
          onRestore={() => setMinimized(false)}
          onClose={() => {
            setActiveIndex(null);
            setMinimized(false);
          }}
        />
      )}
    </main>
  );
}
