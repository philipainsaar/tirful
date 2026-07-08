"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";
const fallbackCover = "/images/logo.png";

/*
  Slim bottom player version:
  - Terminal is only the album browser.
  - Floating player is a slim Windows 3.1 window at the bottom.
  - Player contains only the Bandcamp embed and a close button.
  - Bandcamp embed uses artwork=small, so the cover appears inside the embed.
*/

const releases = [
  {
    name: 'Unilateral Workflow',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/unilateral-workflow',
    cover: '/images/covers/unilateral-workflow.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3207621954/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Straight From The Can',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/straight-from-the-can',
    cover: '/images/covers/straight-from-the-can.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=149509746/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: "Gorbino's Quest",
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/gorbinos-quest',
    cover: '/images/covers/gorbinos-quest.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=576207098/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Primordial Sludge',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/primordial-sludge',
    cover: '/images/covers/primordial-sludge.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3851790619/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'All You Want To Hear',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/all-you-want-to-hear',
    cover: '/images/covers/all-you-want-to-hear.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=778678908/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Projected Sins',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/projected-sins',
    cover: '/images/covers/projected-sins.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2353183252/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Same Places, Different Endings',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/same-places-different-endings',
    cover: '/images/covers/same-places-different-endings.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3260983734/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'yNYNMhnh',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/ynynmhnh',
    cover: '/images/covers/ynynmhnh.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=4294218096/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Twisting Light',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/twisting-light',
    cover: '/images/covers/twisting-light.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=678391349/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: '2 Days Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/2-days-away',
    cover: '/images/covers/2-days-away.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=472756539/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'ERROR_',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/error',
    cover: '/images/covers/error.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3117184652/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'RazorBladeZ',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/razorbladez',
    cover: '/images/covers/razorbladez.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=234314278/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'NOT_JOINED',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/not-joined',
    cover: '/images/covers/not-joined.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=100176574/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'NO_INTERFACE',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/no-interface-2',
    cover: '/images/covers/no-interface.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2204686771/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'The Sun Feels Colder',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/the-sun-feels-colder',
    cover: '/images/covers/the-sun-feels-colder.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=285289752/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: "I'll work it out in my way",
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/ill-work-it-out-in-my-way',
    cover: '/images/covers/ill-work-it-out-in-my-way.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=888650209/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Any Easy Intimacy',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/any-easy-intimacy',
    cover: '/images/covers/any-easy-intimacy.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2334350329/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Fragmented and Lost',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/fragmented-and-lost',
    cover: '/images/covers/fragmented-and-lost.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=936361839/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Who You Really Were',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/who-you-really-were',
    cover: '/images/covers/who-you-really-were.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=948271045/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Before I Knew',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/before-i-knew',
    cover: '/images/covers/before-i-knew.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=4074488612/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Goodbye',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/goodbye',
    cover: '/images/covers/goodbye.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3842785507/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Fragments of Loss',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/album/fragments-of-loss',
    cover: '/images/covers/fragments-of-loss.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=1327757472/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Allysin',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/allysin',
    cover: '/images/covers/allysin.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1119227384/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Barely a Chance',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/barely-a-chance',
    cover: '/images/covers/barely-a-chance.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1479601724/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Koume',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/koume',
    cover: '/images/covers/koume.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=1403161770/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Debris Slide',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/debris-slide',
    cover: '/images/covers/debris-slide.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2561265051/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Wish Yourself Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/wish-yourself-away',
    cover: '/images/covers/wish-yourself-away.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2344296227/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'You Turned Away',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/you-turned-away',
    cover: '/images/covers/you-turned-away.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=3937048583/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Field of Being',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/field-of-being',
    cover: '/images/covers/field-of-being.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=459115388/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  },
  {
    name: 'Be There',
    artist: "Tirful",
    url: 'https://tirful.bandcamp.com/track/be-there',
    cover: '/images/covers/be-there.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/track=2251432630/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/',
    lyrics: "",
    syncedLyrics: [],
    durationSeconds: 180
  }
];

const linkIcons = [
  {
    label: "Bandcamp Merch",
    iconSrc: "/images/icons/merch.png",
    href: "https://tirful.bandcamp.com/merch/"
  },
  {
    label: "Spotify",
    iconSrc: "/images/icons/spotify.png",
    href: "https://open.spotify.com/artist/5wh9QhNjDHu546xgz3LqRF"
  },
  {
    label: "Apple Music",
    iconSrc: "/images/icons/apple-music.png",
    href: "https://music.apple.com/artist/tirful/1514930730"
  },
  {
    label: "SoundCloud",
    iconSrc: "/images/icons/soundcloud.png",
    href: "https://soundcloud.com/tirful"
  },
  {
    label: "Instagram",
    iconSrc: "/images/icons/instagram.png",
    href: "https://www.instagram.com/tirful/"
  }
];

const tirfulDescriptionText = [
  "Tirful's roots are in the underground screamo scene, as the vocalist of bands Cassus and Tellus Effluentia.",
  "",
  "He continues this DIY ethos with Tirful, self-recording and releasing all his own music.",
  "",
  "Diagnosed as an adult with autism and ADHD, his lyrical themes often explore loneliness, alienation, and introspection.",
  "",
  "Processing new perspectives on his past while reevaluating the core of his identity has inevitably fed into the songwriting, pushing his music in unexpected and exciting new directions."
].join("\n");

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
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
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

function BootText({ onComplete }) {
  const fullText = [
    "TIRFUL Version 3.10",
    "Copyright TIRFUL 2020-NOW.",
    "",
    "C:\\> DIR",
    "TIRFUL.EXE     PLAYER.DB",
    "WIN31MP.EXE   BANDCAMP.BAT",
    "",
    "C:\\> RUN TIRFUL_PLAYER.BAT",
    "LOADING BANDCAMP PLAYER..."
  ].join("\n");

  const [typedText, setTypedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;

    const typeTimer = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        window.clearInterval(typeTimer);
        setIsDone(true);

        const completeTimer = window.setTimeout(() => {
          onComplete?.();
        }, 900);

        return () => window.clearTimeout(completeTimer);
      }
    }, 28);

    return () => window.clearInterval(typeTimer);
  }, [fullText, onComplete]);

  return (
    <div className="bootText">
      <pre>
        {typedText}
        <span className={isDone ? "blink" : ""}>_</span>
      </pre>
    </div>
  );
}

function SlimBottomPlayer({ release, onClose }) {
  if (!release) return null;

  return (
    <div className="slimPlayerWindow">
      <div className="slimPlayerTitleBar">
        <span className="winPlayerMenuBox" />
        <span className="slimPlayerTitle">{release.name}</span>

        <a
          className="slimOpenLink"
          href={release.url}
          target="_blank"
          rel="noreferrer"
        >
          OPEN
        </a>

        <button
          className="slimCloseButton"
          type="button"
          onClick={onClose}
          aria-label="Close player"
        >
        ☒
        </button>
      </div>

      <div className="slimEmbedWrap">
        <iframe
          className="slimBandcampPlayer"
          title={`for ${release.name}`}
          src={release.embedUrl}
          seamless="seamless"
          allow="autoplay"
        />
      </div>
    </div>
  );
}

function LinkIconGrid() {
  return (
    <nav className="linkIconGrid" aria-label="Tirful links">
      {linkIcons.map((item) => (
        
<a
  className="linkIconButton"
  href={item.href}
  aria-label={`Open Tirful on ${item.label}`}
  title={item.label}
  key={item.label}
>
  <span className="linkIconImageWrap" aria-hidden="true">
    <img
      className="linkIconImage"
      src={item.iconSrc}
      alt=""
      loading="eager"
      draggable="false"
    />
  </span>
</a>

      ))}
    </nav>
  );
}

function TerminalTypeText({ text, speed = 12 }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    setTypedText("");

    let index = 0;
    let timerId;

    function typeNextCharacter() {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index < text.length) {
        timerId = window.setTimeout(typeNextCharacter, speed);
      }
    }

    timerId = window.setTimeout(typeNextCharacter, speed);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [text, speed]);

  return (
    <pre className="terminalTypeText">
      {typedText}
      <span className="blink">_</span>
    </pre>
  );
}


function BandcampHelpPopup({ onClose }) {
  return (
    <div
      className="helpPopupOverlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <section
        className="helpPopupWindow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="helpPopupTitleBar">
          <span>TIRFUL</span>

          <button
            className="helpPopupClose"
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            title="Close"
          >
            ■
          </button>
        </div>

<div className="helpPopupBody">
  <TerminalTypeText text={tirfulDescriptionText} speed={16} />
</div>
      </section>
    </div>
  );
}


function AlbumPage({ activeIndex, onPlayRelease, onOpenHelp }) {
  return (
    <div className="albumPage">
      <div className="albumIntro">
        <p className="albumHeader">C:\&gt; TIRFUL_PLAYER</p>
        <p className="albumSub albumSubWithHelp">
  <span>loads Bandcamp in a bottom window.</span>

  <button
    className="helpIconButton"
    type="button"
    onClick={onOpenHelp}
    aria-label="Show Tirful description"
    title="Help"
  >
    ?
  </button>
</p>
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
                ▶ PLAY
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function TirfulSite() {
  const [showAlbums, setShowAlbums] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [helpOpen, setHelpOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);

  const activeRelease = activeIndex === null ? null : releases[activeIndex];

  function playRelease(index) {
    setActiveIndex(index);
  }

  return (
    <main
  className={`page ${terminalOpen ? "" : "pageTerminalClosed"}`}
  onClick={() => {
    if (!terminalOpen) {
      setTerminalOpen(true);
    }
  }}
>
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

{terminalOpen && (
  <div
    className="terminalStack"
    onClick={(event) => event.stopPropagation()}
  >
    <section className="terminal">
      <div className="top">
        <span>TIRFUL</span>

        <button
          className="terminalCloseButton"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setTerminalOpen(false);
            setHelpOpen(false);
            setActiveIndex(null);
          }}
          aria-label="Close album window"
          title="Close"
        >
          ■
        </button>
      </div>

      <div className="screen">
        {showAlbums ? (
          <AlbumPage
            activeIndex={activeIndex}
            onPlayRelease={playRelease}
            onOpenHelp={() => setHelpOpen(true)}
          />
        ) : (
          <BootText onComplete={() => setShowAlbums(true)} />
        )}
      </div>
    </section>

    <LinkIconGrid />
  </div>
)}

{helpOpen && <BandcampHelpPopup onClose={() => setHelpOpen(false)} />}

      {activeRelease && (
        <SlimBottomPlayer
          release={activeRelease}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </main>
  );
}
