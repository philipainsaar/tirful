import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";
const fallbackCover = "/images/logo.png";

/* All provided Bandcamp embed URLs are filled in. Add lyrics, durationSeconds, or syncedLyrics next. */

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

function SynthwaveGrid(){const r=useRef(null);useFrame(({clock})=>{if(r.current)r.current.position.z=(clock.elapsedTime*1.2)%2});return <group position={[0,-2.2,-2]}><gridHelper ref={r} args={[70,70,"#00ccff","#004cff"]}/></group>}
function NeonOrb(){const r=useRef(null);useFrame(({clock})=>{if(!r.current)return;const p=1+Math.sin(clock.elapsedTime*1.7)*.055;r.current.scale.set(p,p,p);r.current.rotation.y=clock.elapsedTime*.35;r.current.rotation.x=Math.sin(clock.elapsedTime*.35)*.18});return <group ref={r} position={[0,-.08,-5.7]}><mesh><sphereGeometry args={[3.9,48,48]}/><meshStandardMaterial color="#0077ff" emissive="#00bbff" emissiveIntensity={2.8} transparent opacity={.14} depthWrite={false} blending={THREE.AdditiveBlending}/></mesh><mesh><sphereGeometry args={[4,32,32]}/><meshBasicMaterial color="#00ccff" wireframe transparent opacity={.2} depthWrite={false}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[4.55,.025,12,160]}/><meshBasicMaterial color="#9ff4ff" transparent opacity={.24} depthWrite={false}/></mesh></group>}
function ThreeBackground(){return <Canvas gl={{alpha:true,antialias:true}} onCreated={({gl})=>gl.setClearColor(0x000000,0)} camera={{position:[0,2.4,6.4],fov:64}}><ambientLight intensity={.38}/><pointLight position={[0,4,2]} intensity={5} color="#00ccff"/><pointLight position={[-4,1,-2]} intensity={2} color="#004cff"/><NeonOrb/><SynthwaveGrid/></Canvas>}
function BootText(){return <div className="bootText"><p>Microsoft MS-DOS Version 3.10</p><p>Copyright Microsoft Corp 1981-1985.</p><br/><p>C:\&gt; DIR</p><p>TIRFUL.EXE&nbsp;&nbsp;&nbsp;&nbsp; PLAYER.DB</p><p>WIN31MP.EXE&nbsp;&nbsp; LYRICS.SCR</p><br/><p>C:\&gt; RUN WIN31MP</p><p>LOADING WINDOWS 3.1 MEDIA PLAYER...</p><p className="blink">_</p></div>}
function usePlaybackClock(release,running,resetKey){const [elapsed,setElapsed]=useState(0);const start=useRef(0),saved=useRef(0);useEffect(()=>{setElapsed(0);saved.current=0;start.current=performance.now()},[resetKey,release]);useEffect(()=>{if(!running){saved.current=elapsed;return}start.current=performance.now()-saved.current*1000;let f;function tick(){const n=(performance.now()-start.current)/1000;setElapsed(Math.min(n,release.durationSeconds||180));f=requestAnimationFrame(tick)}tick();return()=>cancelAnimationFrame(f)},[running,release]);return elapsed}
function formatTime(s){s=Math.max(0,Math.floor(s||0));return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}
function LyricsWindow({release,elapsed,onClose,onRestart}){const ref=useRef(null);const synced=release.syncedLyrics&&release.syncedLyrics.length>0;const txt=release.lyrics?.trim();const active=synced?release.syncedLyrics.reduce((a,l,i)=>elapsed>=l.time?i:a,0):0;useEffect(()=>{const el=ref.current;if(!el)return;if(synced){const line=el.querySelector(`[data-line="${active}"]`);if(line)line.scrollIntoView({block:"center",behavior:"smooth"});return}const dur=Math.max(release.durationSeconds||180,1);el.scrollTop=(el.scrollHeight-el.clientHeight)*Math.min(elapsed/dur,1)},[elapsed,release,synced,active]);return <div className="lyricsWindow"><div className="lyricsTitleBar"><span>LYRICS.SCR - {release.name}</span><button type="button" onClick={onRestart}>↺</button><button type="button" onClick={onClose}>×</button></div><div className="lyricsMeta"><span>TIME {formatTime(elapsed)}</span><span>DURATION {formatTime(release.durationSeconds||180)}</span></div><div className="lyricsScroller" ref={ref}>{synced?release.syncedLyrics.map((l,i)=><p key={`${l.time}-${l.text}`} data-line={i} className={i===active?"activeLyricLine":""}>{l.text}</p>):txt?txt.split("\n").map((l,i)=><p key={`${i}-${l}`}>{l||"\u00a0"}</p>):<p className="emptyLyrics">NO LYRICS ADDED. PASTE LYRICS INTO release.lyrics OR ADD syncedLyrics.</p>}</div></div>}
function FloatingWin31Player({release,currentIndex,total,minimized,onPrevious,onNext,onClose,onMinimize,onRestore}){const [pos,setPos]=useState({x:18,y:62});const [showLyrics,setShowLyrics]=useState(false);const [running,setRunning]=useState(false);const [reset,setReset]=useState(0);const drag=useRef({});const elapsed=usePlaybackClock(release,running,reset);useEffect(()=>{setRunning(false);setShowLyrics(false);setReset(v=>v+1)},[release]);function startDrag(e){e.preventDefault();drag.current={active:true,startX:e.clientX,startY:e.clientY,baseX:pos.x,baseY:pos.y};window.addEventListener('pointermove',moveDrag);window.addEventListener('pointerup',stopDrag)}function moveDrag(e){if(!drag.current.active)return;setPos({x:Math.max(4,Math.min(drag.current.baseX+e.clientX-drag.current.startX,360)),y:Math.max(4,Math.min(drag.current.baseY+e.clientY-drag.current.startY,360))})}function stopDrag(){drag.current.active=false;window.removeEventListener('pointermove',moveDrag);window.removeEventListener('pointerup',stopDrag)}function sync(){setReset(v=>v+1);setRunning(true)}useEffect(()=>()=>{window.removeEventListener('pointermove',moveDrag);window.removeEventListener('pointerup',stopDrag)},[]);if(minimized)return <button className="minimizedPlayer" type="button" onClick={onRestore}>▣ MEDIA PLAYER - {release.name}</button>;return <><div className="floatingWinPlayer" style={{left:`${pos.x}px`,top:`${pos.y}px`}}><div className="winPlayerTitleBar" onPointerDown={startDrag}><span className="winPlayerMenuBox"/><span className="winPlayerTitle">Windows 3.1 Media Player - TIRFUL.WAV</span><button className="winPlayerControlButton" type="button" onPointerDown={e=>e.stopPropagation()} onClick={onMinimize}>_</button><button className="winPlayerControlButton" type="button" onPointerDown={e=>e.stopPropagation()} onClick={onClose}>×</button></div><div className="winPlayerBody"><a className="winPlayerArt" href={release.url} target="_blank" rel="noreferrer"><img src={release.cover} alt={`${release.name} cover`}/></a><div className="winPlayerPanel"><div className="winPlayerDisplay"><p className="winPlayerNow">NOW PLAYING</p><p className="winPlayerTrack">{release.name}</p><p className="winPlayerArtist">{release.artist}</p><p className="winPlayerCounter">{String(currentIndex+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</p></div><div className="fakeProgress"><span style={{width:`${Math.min((elapsed/(release.durationSeconds||180))*100,100)}%`}}/></div><div className="winPlayerControls"><button type="button" onClick={onPrevious}>◀ PREV</button><button type="button" onClick={()=>setRunning(v=>!v)}>{running?"❚❚ PAUSE":"▶ PLAY"}</button><button type="button" onClick={onNext}>NEXT ▶</button><button type="button" onClick={()=>setShowLyrics(v=>!v)}>LYRICS</button><button type="button" onClick={sync}>↺ SYNC</button><a href={release.url} target="_blank" rel="noreferrer">OPEN</a></div><div className="winPlayerEmbed"><iframe className="bandcampPlayer" title={`Bandcamp player for ${release.name}`} src={release.embedUrl} seamless="seamless" allow="autoplay"/></div></div></div></div>{showLyrics&&<LyricsWindow release={release} elapsed={elapsed} onRestart={sync} onClose={()=>setShowLyrics(false)}/>}</>}
function AlbumPage(){const [activeIndex,setActiveIndex]=useState(null);const [minimized,setMinimized]=useState(false);const active=activeIndex===null?null:releases[activeIndex];function prev(){setActiveIndex(c=>c===null?releases.length-1:(c-1+releases.length)%releases.length);setMinimized(false)}function next(){setActiveIndex(c=>c===null?0:(c+1)%releases.length);setMinimized(false)}return <div className="albumPage"><div className="albumIntro"><p className="albumHeader">C:\&gt; TIRFUL_PLAYER</p><p className="albumSub">PLAY opens Win 3.1 Media Player. LYRICS scrolls by duration or timestamps.</p></div><div className="playerStage">{active&&<FloatingWin31Player release={active} currentIndex={activeIndex} total={releases.length} minimized={minimized} onPrevious={prev} onNext={next} onMinimize={()=>setMinimized(true)} onRestore={()=>setMinimized(false)} onClose={()=>{setActiveIndex(null);setMinimized(false)}}/>}<div className="albumGrid">{releases.map((release,index)=><article className={`albumCard ${activeIndex===index?"activeAlbumCard":""}`} key={release.url}><a className="coverLink" href={release.url} target="_blank" rel="noreferrer"><img src={release.cover} alt={`${release.name} cover`}/></a><div className="albumCardFooter"><p className="albumName">{release.name}</p><button className="playButton" type="button" onClick={()=>{setActiveIndex(index);setMinimized(false)}}>PLAY</button></div></article>)}</div></div></div>}
export default function App(){const [showAlbums,setShowAlbums]=useState(false);useEffect(()=>{const t=setTimeout(()=>setShowAlbums(true),1000);return()=>clearTimeout(t)},[]);return <main className="page"><div className="imageBackground" style={{backgroundImage:`url(${backgroundImage})`}}/><div className="threeLayer"><ThreeBackground/></div><header className="logoWrap"><img src={logoImage} alt="Tirful logo" className="topLogo"/><div className="logoGlitchScratch"><span/><span/><span/></div></header><section className="terminal"><div className="top"><span>MICROSOFT DOS 3.1</span><span>■</span></div><div className="screen">{showAlbums?<AlbumPage/>:<BootText/>}</div></section></main>}
