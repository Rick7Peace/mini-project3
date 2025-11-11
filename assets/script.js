// 🎮 Tetris Deluxe v8.1 — Reliable SFX + Safe Rotations (edge kick) + all v8.0 features
document.addEventListener("DOMContentLoaded", () => {
  /* ==== DOM ==== */
  const grid = document.querySelector("#grid");
  const scoreEl = document.querySelector("#score");
  const highScoreEl = document.querySelector("#high-score");
  const levelEl = document.querySelector("#level");
  const badgeEl = document.querySelector("#player-badge");
  const lbList = document.querySelector("#leaderboard-list");
  const nextGrid = document.querySelector("#next-grid");
  const visitCounterEl = document.querySelector("#visit-counter");

 // === Global Visitor Counter (CountAPI Mirror + Fade-in) ===
 const NAMESPACE = "tetris-deluxe-v8"; // customize your namespace
 setTimeout(() => {
   fetch(`https://api.countapi.store/hit/${NAMESPACE}/visits?nocache=${Date.now()}`)
     .then(res => res.json())
     .then(data => {
       visitCounterEl.textContent = data.value.toLocaleString(); // formatted number
       visitCounterEl.classList.add("loaded"); // trigger fade-in
     })
     .catch(err => {
       console.error("Visitor counter failed:", err);
       visitCounterEl.textContent = "Offline";
     });
 }, 500);
 
  const startBtn = document.querySelector("#start-button");
  const pauseBtn = document.querySelector("#pause-button");
  const quitBtn = document.querySelector("#quit-button");
  const resetScoresBtn = document.querySelector("#reset-scores");
  const diffSelect = document.querySelector("#difficulty");
  const themeToggle = document.querySelector("#theme-toggle");
  const musicBtn = document.querySelector("#music-button");

  // Audio tags (we’ll read their <source> URLs)
  const bgMusic   = document.querySelector("#bg-music");
  const lvlSound  = document.querySelector("#level-up-sound");
  const landSound = document.querySelector("#land-sound");
  const clearSound= document.querySelector("#clear-sound");
  const pulseSound= document.querySelector("#pulse-sound");

  // Controls
  const leftBtn = document.querySelector("#left-btn"),
        rightBtn= document.querySelector("#right-btn"),
        rotateBtn=document.querySelector("#rotate-btn"),
        downBtn  =document.querySelector("#down-btn");

  // Audio UI
  const musicMute = document.querySelector("#music-mute");
  const sfxMute   = document.querySelector("#sfx-mute");
  const musicVol  = document.querySelector("#music-volume");
  const sfxVol    = document.querySelector("#sfx-volume");

  /* ==== Popup Helper ==== */
  const popup = document.createElement("div");
  popup.id = "popup-msg";
  document.body.appendChild(popup);
  function showPopup(msg, ms=3000) {
    popup.textContent = msg;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), ms);
  }

  /* ==== Sound Manager (WebAudio-first with fallback) ==== */
  const Sound = (() => {
    let audioCtx = null;
    let unlocked = false;
    const buffers = new Map(); // name -> AudioBuffer
    const urls = new Map();    // name -> URL

    // Persisted settings
    let sfxVolume = parseFloat(localStorage.getItem("tetrisSfxVol") || "1");
    let musicVolume = parseFloat(localStorage.getItem("tetrisMusicVol") || "0.8");
    let sfxMuted = localStorage.getItem("tetrisSfxMute") === "1";
    let musicMuted = localStorage.getItem("tetrisMusicMute") === "1";

    // Wire UI (if present)
    if (musicVol) musicVol.value = musicVolume;
    if (sfxVol) sfxVol.value = sfxVolume;
    if (musicMute) musicMute.checked = musicMuted;
    if (sfxMute) sfxMute.checked = sfxMuted;
    bgMusic.volume = musicMuted ? 0 : musicVolume;

    function setUrl(name, el) {
      const src = el?.querySelector("source")?.src || el?.src || "";
      if (src) urls.set(name, src);
    }
    setUrl("level", lvlSound);
    setUrl("land", landSound);
    setUrl("clear", clearSound);
    setUrl("pulse", pulseSound);

    function ensureCtx() {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
      }
      return audioCtx;
    }

    async function load(name) {
      if (buffers.has(name)) return buffers.get(name);
      const url = urls.get(name);
      if (!url) return null;
      const ctx = ensureCtx();
      if (!ctx) return null;
      const res = await fetch(url, { cache: "force-cache" });
      const arr = await res.arrayBuffer();
      const buf = await ctx.decodeAudioData(arr);
      buffers.set(name, buf);
      return buf;
    }

    function unlockOnGesture() {
      if (unlocked) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const resume = () => {
        ctx.resume?.();
        unlocked = true;
        document.removeEventListener("pointerdown", resume);
        document.removeEventListener("keydown", resume);
        document.removeEventListener("touchstart", resume, { passive:true });
      };
      document.addEventListener("pointerdown", resume);
      document.addEventListener("keydown", resume);
      document.addEventListener("touchstart", resume, { passive:true });
    }
    // Begin listening right away
    unlockOnGesture();

    async function play(name, { rate=1, vol=1, delay=0 } = {}) {
      if (sfxMuted) return;
      const v = Math.max(0, Math.min(1, vol * sfxVolume));
      const ctx = ensureCtx();

      const doWebAudio = async () => {
        try {
          const buf = await load(name);
          if (!buf) return;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.playbackRate.value = rate;
          const gain = ctx.createGain();
          gain.gain.value = v;
          src.connect(gain).connect(ctx.destination);
          src.start(ctx.currentTime + delay/1000);
        } catch (err) {
          // fallback below
          doHtmlAudio();
        }
      };

      const doHtmlAudio = () => {
        // Try using an <audio> element clone from a known tag if available
        let baseEl = null;
        if (name==="level") baseEl = lvlSound;
        else if (name==="land") baseEl = landSound;
        else if (name==="clear") baseEl = clearSound;
        else if (name==="pulse") baseEl = pulseSound;

        if (!baseEl) return;
        setTimeout(() => {
          try {
            const c = baseEl.cloneNode(true);
            c.volume = v;
            c.playbackRate = rate;
            c.currentTime = 0;
            document.body.appendChild(c);
            const p = c.play();
            if (p && typeof p.catch==="function") p.catch(()=>{});
            c.addEventListener("ended", () => c.remove());
          } catch {}
        }, delay);
      };

      if (ctx && unlocked) doWebAudio();
      else doHtmlAudio();
    }

    function resumeCtx() {
      const ctx = ensureCtx();
      if (ctx && ctx.state === "suspended") ctx.resume();
      unlocked = true;
    }

    // Public surface
    return {
      play,
      resumeCtx,
      get sfxMuted(){ return sfxMuted; },
      set sfxMuted(v){ sfxMuted = !!v; localStorage.setItem("tetrisSfxMute", v? "1":"0"); },
      get musicMuted(){ return musicMuted; },
      set musicMuted(v){ musicMuted = !!v; localStorage.setItem("tetrisMusicMute", v? "1":"0"); bgMusic.volume = v?0:musicVolume; if(v) bgMusic.pause(); },
      get sfxVolume(){ return sfxVolume; },
      set sfxVolume(v){ sfxVolume = Math.max(0,Math.min(1, +v||0)); localStorage.setItem("tetrisSfxVol", String(sfxVolume)); },
      get musicVolume(){ return musicVolume; },
      set musicVolume(v){ musicVolume = Math.max(0,Math.min(1, +v||0)); localStorage.setItem("tetrisMusicVol", String(musicVolume)); if(!musicMuted) bgMusic.volume = musicVolume; },
    };
  })();

  /* ==== Setup ==== */
  const W=10,H=20,CELLS=W*H;
  for(let i=0;i<CELLS;i++){
    const d=document.createElement("div");d.className="square";grid.appendChild(d);
  }
  const squares=[...document.querySelectorAll("#grid .square")];
  const colors=["color-l","color-z","color-t","color-o","color-i"];

  // next preview grid 4x4
  const NEXT_W=4,NEXT_H=4,NEXT_CELLS=NEXT_W*NEXT_H;
  if (nextGrid) for(let i=0;i<NEXT_CELLS;i++){ const d=document.createElement("div"); d.className="square"; nextGrid.appendChild(d); }
  const nextSquares = nextGrid ? [...nextGrid.querySelectorAll(".square")] : [];

  let score=0, level=1, baseSpeed=700, speed=700, isPaused=false, isPlaying=false, isFreezing=false, timer=null, saveTimer=null;
  let currentPos=4,currentRot=0;
  let playerName="",leaderboard=JSON.parse(localStorage.getItem("tetrisLeaderboard")||"[]");
  let pbMap=JSON.parse(localStorage.getItem("tetrisPB")||"{}");

  /* ==== Shapes ==== */
  const L=[[1,W+1,W*2+1,2],[W,W+1,W+2,W*2+2],[1,W+1,W*2+1,W*2],[W,W*2,W*2+1,W*2+2]];
  const Z=[[0,W,W+1,W*2+1],[W+1,W+2,W*2,W*2+1]];
  const T=[[1,W,W+1,W+2],[1,W+1,W+2,W*2+1],[W,W+1,W+2,W*2+1],[1,W,W+1,W*2+1]];
  const O=[[0,1,W,W+1]];
  const I=[[1,W+1,W*2+1,W*3+1],[W,W+1,W+2,W+3]];
  const SHAPES=[L,Z,T,O,I];
  const NEXT_SHAPES = {
    0: [[1,NEXT_W+1,NEXT_W*2+1,2]],
    1: [[0,NEXT_W,NEXT_W+1,NEXT_W*2+1]],
    2: [[1,0+NEXT_W,1+NEXT_W,2+NEXT_W]],
    3: [[0,1,NEXT_W,NEXT_W+1]],
    4: [[1,1+NEXT_W,1+NEXT_W*2,1+NEXT_W*3]]
  };

  let typeIdx=Math.floor(Math.random()*SHAPES.length);
  let nextTypeIdx=Math.floor(Math.random()*SHAPES.length);
  let current=SHAPES[typeIdx][0],currentColor=colors[typeIdx];

  /* ==== Draw helpers ==== */
  const draw=()=> current.forEach(i=>squares[currentPos+i].classList.add("tetromino",currentColor,"active"));
  const undraw=()=> current.forEach(i=>squares[currentPos+i].classList.remove("tetromino",currentColor,"active"));
  const drawPreview = ()=>{
    if(!nextSquares.length) return;
    nextSquares.forEach(s=>s.className="square");
    const shape = NEXT_SHAPES[nextTypeIdx][0];
    shape.forEach(i=> nextSquares[i]?.classList.add(colors[nextTypeIdx]));
  };

  /* ==== Collision helpers ==== */
  const inBounds = (p)=> p>=0 && p<CELLS;
  const colOf    = (p)=> p%W;
  const canPlace = (basePos, shapeCells) =>
    shapeCells.every(i=>{
      const p = basePos + i;
      return inBounds(p) && !squares[p].classList.contains("taken") && colOf(p)>=0 && colOf(p)<W;
    });

  const canMove=(off)=> current.every(i=>{
    const from=currentPos+i,to=from+off;
    if(!inBounds(to)) return false;
    if(off===-1 && colOf(from)===0) return false;
    if(off===1  && colOf(from)===W-1) return false;
    return !squares[to].classList.contains("taken");
  });
  const canDown=()=>canMove(W);

  /* ==== Movement ==== */
  function moveDown(){
    if(isPaused||!timer||isFreezing)return;
    if(canDown()){ undraw(); currentPos+=W; draw(); }
    else freeze();
  }
  const moveLeft =()=>{ if(!isPaused&&timer&&!isFreezing&&canMove(-1)){ undraw(); currentPos--; draw(); Sound.play("pulse",{vol:.35, rate:1.1}); } };
  const moveRight=()=>{ if(!isPaused&&timer&&!isFreezing&&canMove(1)){  undraw(); currentPos++; draw(); Sound.play("pulse",{vol:.35, rate:1.1}); } };

  // ✅ Safe rotation with simple wall-kicks; never leaves artifacts
  function rotate(){
    if(isPaused||!timer||isFreezing) return;
    const set = SHAPES[typeIdx];
    const nextRot = (currentRot+1) % set.length;
    const candidate = set[nextRot];

    // Kick attempts (left/right)
    const kicks = [0, -1, +1, -2, +2];
    undraw(); // always undraw first to avoid left-behind cells

    let placed = false;
    for (const k of kicks) {
      const newBase = currentPos + k;
      // Ensure no wrapping between columns due to kicks
      const violatesEdge = candidate.some(i=>{
        const p = newBase + i;
        if(!inBounds(p)) return true;
        // disallow wrapping across left/right walls
        const origCol = colOf(currentPos + i);
        const newCol  = colOf(p);
        return Math.abs(origCol - newCol) > 3; // defensive guard
      });
      if (violatesEdge) continue;

      if (canPlace(newBase, candidate)) {
        currentRot = nextRot;
        current    = candidate;
        currentPos = newBase;
        placed = true;
        break;
      }
    }

    // redraw either the rotated or original shape
    if (!placed) {
      // fallback — restore original state
      // (no-op: current/currentPos unchanged)
    }
    draw();
    if (placed) Sound.play("pulse",{vol:.5, rate:1.25});
  }

  function hardDrop(){
    if(isPaused||!timer||isFreezing)return;
    undraw();
    while (canDown()) currentPos+=W;
    draw();
    freeze();
    Sound.play("pulse",{vol:.6, rate:1.35});
  }

  /* ==== Freeze + Spawn ==== */
  function freeze(){
    if(isFreezing)return; isFreezing=true;
    current.forEach(i=>squares[currentPos+i].classList.add("taken"));
    current.forEach(i=>squares[currentPos+i].classList.remove("active"));
    draw();
    Sound.play("land",{vol:.9, rate:1, delay:60});
    stopLoop();
    saveState();
    setTimeout(()=>{
      handleLines(()=>{
        typeIdx = nextTypeIdx;
        nextTypeIdx = Math.floor(Math.random()*SHAPES.length);
        currentRot=0; current=SHAPES[typeIdx][0]; currentColor=colors[typeIdx]; currentPos=4;
        drawPreview();
        if(current.some(i=>squares[currentPos+i].classList.contains("taken"))){ gameOver(); return; }
        draw(); isFreezing=false; startLoop();
      });
    },150);
  }

  /* ==== Line Clear + Leveling ==== */
  function recalcLevel(){
    const lvl = Math.floor(score/50)+1;
    if (lvl !== level) {
      level = lvl;
      levelEl.textContent = level;
      document.body.classList.add("level-up");
      setTimeout(()=>document.body.classList.remove("level-up"), 650);
      Sound.play("level",{vol:.9});
    }
    const diff = Number(diffSelect.value||1);
    const diffBase = diff===1?700:diff===2?450:300;
    baseSpeed = diffBase;
    speed = Math.max(120, diffBase - (level-1)*60);
    restartLoop();
    bgMusic.playbackRate = Math.min(1.5, 1 + (level-1)*0.05);
  }

  function handleLines(cb){
    const fullRows=[];
    for(let r=0;r<H;r++){
      const row=[...Array(W)].map((_,j)=>r*W+j);
      if(row.every(x=>squares[x].classList.contains("taken")))fullRows.push(row);
    }
    if(!fullRows.length){ cb(); return; }

    fullRows.flat().forEach(x=>squares[x].classList.add("clear-anim"));
    const lines=fullRows.length;

    // multi-chime
    Sound.play("clear",{delay:120});
    if(lines>=2){
      Sound.play("clear",{rate:1.2,delay:220});
      Sound.play("clear",{rate:1.35,delay:320});
      if(lines>=4) Sound.play("clear",{rate:1.5,delay:420});
    }

    setTimeout(()=>{
      fullRows.forEach(r=>{
        r.forEach(x=>squares[x].classList.remove("taken","tetromino","clear-anim",...colors));
        const removed=squares.splice(r[0],W); squares.unshift(...removed);
      });
      squares.forEach(c=>grid.appendChild(c));
      score += lines*10; scoreEl.textContent = score;
      recalcLevel();
      if(squares.every(s=>s.classList.contains("taken"))){
        grid.classList.add("grid-flash");
        Sound.play("pulse");
        setTimeout(()=>grid.classList.remove("grid-flash"),500);
      }
      saveState();
      cb();
    },300);
  }

  /* ==== Loop ==== */
  const startLoop =()=>{ if(!timer) timer=setInterval(moveDown,speed); if(!saveTimer) saveTimer=setInterval(saveState, 1000); };
  const stopLoop  =()=>{ clearInterval(timer); timer=null; clearInterval(saveTimer); saveTimer=null; };
  const restartLoop=()=>{ if(timer){ clearInterval(timer); timer=setInterval(moveDown,speed); } };

  /* ==== Game Over / Reset ==== */
  function updatePB(){
    if(!playerName) return;
    const best = pbMap[playerName] || 0;
    if (score > best) {
      pbMap[playerName] = score;
      localStorage.setItem("tetrisPB", JSON.stringify(pbMap));
      showPopup(`👑 New Personal Best: ${score}!`);
    }
    highScoreEl.textContent = pbMap[playerName] || 0;
  }

  function gameOver(){
    stopLoop(); isFreezing=false; bgMusic.pause();
    showPopup("💀 Game Over!");
    const added = saveScore();
    renderLB();
    updatePB();
    showPopup(`✅ ${added.name} scored ${added.score}!`);
    clearState();
    reset();
  }

  function reset(){
    score=0; scoreEl.textContent=0; level=1; levelEl.textContent=1;
    squares.forEach(s=>s.classList.remove("tetromino","taken","clear-anim","grid-flash","active",...colors));
    currentPos=4; currentRot=0;
    drawPreview();
  }

  /* ==== Leaderboard ==== */
  function saveScore(){
    const entry={name:playerName||"Anonymous",score,date:new Date().toLocaleDateString()};
    leaderboard.push(entry);
    leaderboard.sort((a,b)=>b.score-a.score);
    leaderboard=leaderboard.slice(0,10);
    localStorage.setItem("tetrisLeaderboard",JSON.stringify(leaderboard));
    return entry;
  }
  function renderLB(){
    lbList.innerHTML="";
    leaderboard.forEach((p,i)=>{
      const li=document.createElement("li");
      li.textContent=`${i+1}. ${p.name} — ${p.score}`;
      lbList.appendChild(li);
    });
    highScoreEl.textContent = playerName ? (pbMap[playerName]||0) : 0;
  }

  /* ==== Badge ==== */
  const diffLabel=()=>({1:"Easy",2:"Medium",3:"Hard"}[diffSelect.value]);
  const updateBadge=()=>badgeEl.textContent=`👤 Player: ${playerName||"—"} — Level: ${diffLabel()}`;

  renderLB(); updateBadge(); drawPreview();

/* ==== Keyboard ==== */
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft"){ e.preventDefault(); moveLeft(); }
  if(e.key==="ArrowRight"){ e.preventDefault(); moveRight(); }
  if(e.key==="ArrowUp"){ e.preventDefault(); rotate(); }
  if(e.key==="ArrowDown"){ e.preventDefault(); moveDown(); }
  if(e.code==="Space"){ e.preventDefault(); hardDrop(); }
});  /* ==== Buttons ==== */
  leftBtn.onclick=moveLeft; rightBtn.onclick=moveRight; rotateBtn.onclick=rotate; downBtn.onclick=moveDown;

  /* ==== Touch + Haptics ==== */
  let tStartX=0, tStartY=0, tStartT=0;
  function haptic(ms){ if (navigator.vibrate) try { navigator.vibrate(ms); } catch{} }
  grid.addEventListener("touchstart", (e)=>{
    const t=e.changedTouches[0]; tStartX=t.clientX; tStartY=t.clientY; tStartT=Date.now();
  }, {passive:true});
  grid.addEventListener("touchend", (e)=>{
    const t=e.changedTouches[0];
    const dx=t.clientX - tStartX, dy=t.clientY - tStartY;
    const dt=Date.now()-tStartT;
    const AX=Math.abs(dx), AY=Math.abs(dy), TH=24;

    if (AX<TH && AY<TH && dt<250){ hardDrop(); haptic(30); return; }
    if (AX>AY){
      if (dx>TH) { moveRight(); haptic(10); }
      else if (dx<-TH) { moveLeft(); haptic(10); }
    } else {
      if (dy<-TH) { rotate(); haptic(12); }
      else if (dy>TH) { moveDown(); haptic(10); }
    }
  }, {passive:true});

  /* ==== Save / Restore ==== */
  function serializeGrid(){
    return squares.map(s=>{
      if(s.classList.contains("taken")){
        for (const c of colors) if (s.classList.contains(c)) return c;
        return "taken";
      }
      return "";
    });
  }
  function deserializeGrid(arr){
    squares.forEach((s,i)=>{
      s.className="square";
      const tag=arr[i];
      if (!tag) return;
      s.classList.add("taken");
      if(tag!=="taken") s.classList.add(tag);
    });
  }
  function saveState(){
    if(!isPlaying) return;
    const state = {
      score, level, speed, baseSpeed,
      currentPos, currentRot, typeIdx, nextTypeIdx,
      diff: Number(diffSelect.value||1),
      grid: serializeGrid(),
      name: playerName
    };
    localStorage.setItem("tetrisSave", JSON.stringify(state));
  }
  function clearState(){ localStorage.removeItem("tetrisSave"); }
  function tryRestore(){
    const raw = localStorage.getItem("tetrisSave");
    if(!raw) return false;
    try{
      const s=JSON.parse(raw);
      score=s.score||0; scoreEl.textContent=score;
      level=s.level||1; levelEl.textContent=level;
      baseSpeed=s.baseSpeed||700; speed=s.speed||baseSpeed;
      currentPos=s.currentPos??4; currentRot=s.currentRot??0;
      typeIdx=s.typeIdx??Math.floor(Math.random()*SHAPES.length);
      nextTypeIdx=s.nextTypeIdx??Math.floor(Math.random()*SHAPES.length);
      if (s.diff) { diffSelect.value=String(s.diff); }
      deserializeGrid(s.grid||[]);
      current = SHAPES[typeIdx][currentRot];
      currentColor = colors[typeIdx];
      draw(); drawPreview();
      if (s.name) playerName=s.name;
      updateBadge();
      highScoreEl.textContent = playerName ? (pbMap[playerName]||0) : 0;
      showPopup("🔄 Restored previous game (press ▶️ Start to continue)");
      return true;
    }catch{ return false; }
  }
  tryRestore();

  /* ==== UI ==== */
  startBtn.onclick = () => {
    const lastName = localStorage.getItem("tetrisPlayerName") || playerName || "";
    const input = prompt("Enter your name:", lastName || "Player 1");
    playerName = (input || "Anonymous").trim();
    localStorage.setItem("tetrisPlayerName", playerName);
    updateBadge();
    highScoreEl.textContent = pbMap[playerName] || 0;

    if (!timer) {
      if (!current || !current.length) {
        typeIdx=Math.floor(Math.random()*SHAPES.length);
        nextTypeIdx=Math.floor(Math.random()*SHAPES.length);
        currentRot=0; current=SHAPES[typeIdx][0]; currentColor=colors[typeIdx]; currentPos=4;
        drawPreview();
      }
      draw();
      isPlaying = true;
      recalcLevel();
      startLoop();

      if (!Sound.musicMuted && bgMusic.paused) bgMusic.play();
      // ensure WebAudio is active after this user gesture
      Sound.resumeCtx();

      showPopup(`🎮 Welcome, ${playerName}!`);
    }
  };

  pauseBtn.onclick=()=>{
    if(!isPlaying) return;
    isPaused=!isPaused;
    if(isPaused){ stopLoop(); bgMusic.pause(); showPopup("⏸️ Paused"); }
    else{ startLoop(); if(!Sound.musicMuted) bgMusic.play(); showPopup("▶️ Resumed"); }
  };
  quitBtn.onclick =()=>{
    stopLoop(); bgMusic.pause(); isPlaying=false; isPaused=false; isFreezing=false;
    clearState();
    reset();
    showPopup("❌ Game Quit");
  };
  resetScoresBtn.onclick=()=>{
    localStorage.removeItem("tetrisLeaderboard"); leaderboard=[]; renderLB(); showPopup("🔁 Scores Reset");
  };
  diffSelect.onchange=()=>{ recalcLevel(); updateBadge(); showPopup(`⚙️ Difficulty: ${diffLabel()}`); };
  themeToggle.onclick =()=>{ document.body.classList.toggle("dark"); showPopup("🌗 Theme Toggled"); };
  musicBtn.onclick   =()=>{ if (bgMusic.paused){ if(!Sound.musicMuted){ bgMusic.play(); showPopup("🎵 Music On"); } } else { bgMusic.pause(); showPopup("🔇 Music Off"); } };

  // Audio UI bindings
  musicMute?.addEventListener("change", ()=>{
    Sound.musicMuted = musicMute.checked;
  });
  sfxMute?.addEventListener("change", ()=>{
    Sound.sfxMuted = sfxMute.checked;
  });
  musicVol?.addEventListener("input", ()=>{
    Sound.musicVolume = parseFloat(musicVol.value||"0.8");
  });
  sfxVol?.addEventListener("input", ()=>{
    Sound.sfxVolume = parseFloat(sfxVol.value||"1");
  });
});
