/* =========================================================
   JAIVI NAVRATRI — CINEMATIC SCRIPT
========================================================= */

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");
const experience = document.getElementById("experience");

const music = document.getElementById("music");

const diyas = document.querySelectorAll(".memory-diya");
const memoryText = document.getElementById("memoryText");
const progressBar = document.getElementById("progressBar");
const continueButton = document.getElementById("continueButton");

const revealMemories = document.getElementById("revealMemories");
const finalMemories = document.getElementById("finalMemories");


/* =========================================================
   INTRO
========================================================= */

const introLines = [
    "Do you remember?",
    "Something feels different this Navratri…",
    "Because someone is missing."
];

let introIndex = 0;


function showIntro() {

    introText.style.opacity = "0";
    introText.style.transform = "translateY(15px)";

    setTimeout(() => {

        introText.textContent = introLines[introIndex];

        introText.style.opacity = "1";
        introText.style.transform = "translateY(0)";

        setTimeout(() => {

            introText.style.opacity = "0";
            introText.style.transform = "translateY(-15px)";

            setTimeout(() => {

                introIndex++;

                if (introIndex < introLines.length) {

                    showIntro();

                } else {

                    enterExperience();

                }

            }, 900);

        }, 3000);

    }, 700);
}


/* =========================================================
   ENTER EXPERIENCE
========================================================= */

function enterExperience() {

    intro.style.opacity = "0";
    intro.style.transform = "scale(1.04)";

    setTimeout(() => {

        intro.classList.add("hidden");

        experience.classList.remove("hidden");

        startMusic();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 1400);
}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

    music.volume = 0.45;

    music.play().catch(() => {

        /*
           Some browsers block autoplay.

           The website still works normally.
           Music can start after the first interaction.
        */

        document.addEventListener(
            "click",
            unlockMusic,
            { once: true }
        );

    });

}


function unlockMusic() {

    music.volume = 0.45;

    music.play().catch(() => {});

}


/* =========================================================
   MOUSE PARALLAX
========================================================= */

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 2;


    document.querySelectorAll(".mandala").forEach(
        (mandala, index) => {

            const amount = index === 0 ? 12 : -10;

            mandala.style.marginLeft =
                `${x * amount}px`;

            mandala.style.marginTop =
                `${y * amount}px`;

        }
    );


    document.querySelectorAll(".bg-diya").forEach(
        (diya, index) => {

            const amount = 3 + index * 0.7;

            diya.style.marginLeft =
                `${x * amount}px`;

            diya.style.marginTop =
                `${y * amount}px`;

        }
    );

});


/* =========================================================
   DIYA MEMORY GAME
========================================================= */

let litCount = 0;


diyas.forEach((diya) => {

    diya.addEventListener("click", () => {

        if (diya.classList.contains("lit")) {
            return;
        }


        diya.classList.add("lit");

        litCount++;


        const message =
            diya.getAttribute("data-memory");

        memoryText.innerHTML =
            `<span>${message}</span>`;


        progressBar.style.width =
            `${(litCount / diyas.length) * 100}%`;


        createSparkBurst(diya);


        if (litCount === diyas.length) {

            setTimeout(() => {

                memoryText.innerHTML =
                    `<span>All the memories are lit. 🪔</span>`;

                continueButton.classList.remove("hidden");

                createBigLightBurst();

            }, 800);

        }

    });

});


/* =========================================================
   SPARK BURST
========================================================= */

function createSparkBurst(element) {

    const rect =
        element.getBoundingClientRect();


    for (let i = 0; i < 12; i++) {

        const spark =
            document.createElement("span");

        spark.style.position = "fixed";

        spark.style.left =
            `${rect.left + rect.width / 2}px`;

        spark.style.top =
            `${rect.top + rect.height / 2}px`;

        spark.style.width = "4px";
        spark.style.height = "4px";

        spark.style.borderRadius = "50%";

        spark.style.background = "#ffd27d";

        spark.style.boxShadow =
            "0 0 12px #ffb347";

        spark.style.pointerEvents = "none";

        spark.style.zIndex = "999";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            30 + Math.random() * 70;


        document.body.appendChild(spark);


        spark.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        ) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 700 + Math.random() * 300,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        setTimeout(() => {

            spark.remove();

        }, 1100);

    }

}


/* =========================================================
   BIG LIGHT BURST
========================================================= */

function createBigLightBurst() {

    const burst =
        document.createElement("div");

    burst.style.position = "fixed";
    burst.style.left = "50%";
    burst.style.top = "50%";

    burst.style.width = "20px";
    burst.style.height = "20px";

    burst.style.borderRadius = "50%";

    burst.style.background = "#ffd98b";

    burst.style.boxShadow =
        "0 0 30px #ffbd5c, 0 0 100px #ff7a18";

    burst.style.transform =
        "translate(-50%, -50%)";

    burst.style.pointerEvents = "none";

    burst.style.zIndex = "1000";

    document.body.appendChild(burst);


    burst.animate(
        [
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: 1
            },
            {
                transform:
                    "translate(-50%, -50%) scale(35)",
                opacity: 0
            }
        ],
        {
            duration: 1200,
            easing: "ease-out"
        }
    );


    setTimeout(() => {

        burst.remove();

    }, 1300);

}


/* =========================================================
   CONTINUE AFTER GAME
========================================================= */

continueButton.addEventListener("click", () => {

    const nextSection =
        document.querySelector(".memory-game + .memory");

    if (nextSection) {

        nextSection.scrollIntoView({
            behavior: "smooth"
        });

    }

    music.volume = 0.5;

});


/* =========================================================
   SCROLL REVEAL SYSTEM
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".memory-content, .game-content, .reveal-content, .distance-content, .final-content"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.2
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});


/* =========================================================
   PHOTO PARALLAX ON SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    const photos =
        document.querySelectorAll(
            ".cinematic-memory img"
        );


    photos.forEach((photo) => {

        const rect =
            photo.parentElement.getBoundingClientRect();

        const center =
            window.innerHeight / 2;

        const distance =
            rect.top + rect.height / 2 - center;

        const movement =
            distance * -0.025;


        photo.style.transform =
            `scale(1.12) translateY(${movement}px)`;

    });

});


/* =========================================================
   JAIVI REVEAL EFFECT
========================================================= */

const jaiviSection =
    document.querySelector(".jaivi-reveal");

const jaiviName =
    document.querySelector(".reveal-content h1");


if (jaiviSection && jaiviName) {

    const jaiviObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        jaiviName.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "scale(.7) translateY(30px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "scale(1.08) translateY(0)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "scale(1) translateY(0)"
                                }
                            ],
                            {
                                duration: 1600,
                                easing:
                                    "cubic-bezier(.16,1,.3,1)",
                                fill: "forwards"
                            }
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    jaiviObserver.observe(jaiviSection);

}


/* =========================================================
   FINAL MEMORY REVEAL
========================================================= */

revealMemories.addEventListener("click", () => {

    finalMemories.classList.remove("hidden");


    setTimeout(() => {

        finalMemories.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);


    music.volume = 0.65;


    explodeFinalPhotos();

});


/* =========================================================
   FINAL PHOTO EXPLOSION
========================================================= */

function explodeFinalPhotos() {

    const cards =
        document.querySelectorAll(".photo-card");


    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "scale(.6) translateY(100px) rotate(0deg)";


        setTimeout(() => {

            card.style.opacity = "1";


            if (index === 0) {

                card.style.transform =
                    "rotate(-8deg) translateY(0)";

            }

            if (index === 1) {

                card.style.transform =
                    "translateX(-50%) rotate(1deg)";

            }

            if (index === 2) {

                card.style.transform =
                    "rotate(8deg) translateY(0)";

            }

        }, 300 + index * 300);

    });

}


/* =========================================================
   FINAL PHOTO HOVER
========================================================= */

document.querySelectorAll(".photo-card").forEach(
    (card) => {

        card.addEventListener("mouseenter", () => {

            music.volume = 0.7;

        });

        card.addEventListener("mouseleave", () => {

            music.volume = 0.6;

        });

    }
);


/* =========================================================
   RANDOM FLOATING SPARKS
========================================================= */

function createAmbientSpark() {

    const spark =
        document.createElement("div");

    spark.style.position = "fixed";

    spark.style.left =
        `${Math.random() * 100}vw`;

    spark.style.bottom = "-10px";

    const size =
        2 + Math.random() * 3;

    spark.style.width =
        `${size}px`;

    spark.style.height =
        `${size}px`;

    spark.style.borderRadius = "50%";

    spark.style.background =
        "#ffd58c";

    spark.style.boxShadow =
        "0 0 10px rgba(255,180,70,.8)";

    spark.style.pointerEvents = "none";

    spark.style.zIndex = "4";


    document.body.appendChild(spark);


    const duration =
        5000 + Math.random() * 5000;


    spark.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 0
            },
            {
                transform:
                    `translateY(-${window.innerHeight * 1.1}px)`,
                opacity: .8
            },
            {
                transform:
                    `translateY(-${window.innerHeight * 1.2}px)`,
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );


    setTimeout(() => {

        spark.remove();

    }, duration + 100);

}


setInterval(
    createAmbientSpark,
    700
);


/* =========================================================
   PAGE START
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        showIntro();

    }, 1000);

});


/* =========================================================
   JAIVI CINEMATIC UPGRADE — falling petals + atmosphere
========================================================= */
(function(){
  const layer=document.createElement('div');
  layer.className='jx-petal-layer';
  layer.setAttribute('aria-hidden','true');
  document.body.appendChild(layer);

  const colors=['','green','purple'];
  const petals=[];
  const COUNT=30;

  function makePetal(i){
    const p=document.createElement('span');
    p.className='jx-petal '+colors[Math.floor(Math.random()*colors.length)];
    const size=7+Math.random()*10;
    p.style.width=size+'px';
    p.style.height=(size*1.45)+'px';
    layer.appendChild(p);
    return {
      el:p,
      x:Math.random()*innerWidth,
      y:-Math.random()*innerHeight,
      speed:.35+Math.random()*1.15,
      drift:(Math.random()-.5)*.7,
      sway:20+Math.random()*50,
      phase:Math.random()*Math.PI*2,
      rot:Math.random()*360,
      spin:(Math.random()-.5)*2.2,
      opacity:.35+Math.random()*.5,
      scale:.65+Math.random()*.75,
      offset:i
    };
  }
  for(let i=0;i<COUNT;i++)petals.push(makePetal(i));

  let last=performance.now();
  function animate(now){
    const dt=Math.min(32,now-last)/16.67; last=now;
    for(const p of petals){
      p.y+=p.speed*dt;
      p.x+=p.drift*dt+Math.sin(now*.001+p.phase)*.35*dt;
      p.rot+=p.spin*dt;
      if(p.y>innerHeight+30){
        p.y=-30-Math.random()*120;
        p.x=Math.random()*innerWidth;
      }
      if(p.x<-30)p.x=innerWidth+20;
      if(p.x>innerWidth+30)p.x=-20;
      p.el.style.transform=`translate3d(${p.x}px,${p.y}px,0) rotate(${p.rot}deg) scale(${p.scale})`;
      p.el.style.opacity=p.opacity;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Add a small burst of petals whenever a diya is lit.
  document.addEventListener('click',e=>{
    const diya=e.target.closest('.memory-diya');
    if(!diya)return;
    const r=diya.getBoundingClientRect();
    for(let i=0;i<12;i++){
      const s=document.createElement('span');
      s.className='jx-petal';
      const size=5+Math.random()*6;
      s.style.width=size+'px';s.style.height=size*1.4+'px';
      s.style.left=r.left+r.width/2+'px';s.style.top=r.top+r.height/2+'px';
      s.style.position='fixed';s.style.zIndex='20';s.style.opacity='.9';
      layer.appendChild(s);
      const dx=(Math.random()-.5)*150,dy=(Math.random()-.5)*150-30;
      s.animate([
        {transform:'translate(-50%,-50%) scale(.3) rotate(0deg)',opacity:1},
        {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${Math.random()*240-120}deg)`,opacity:0}
      ],{duration:850+Math.random()*500,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(()=>s.remove());
    }
  });

  // Slightly richer scroll depth for memory images.
  const memories=[...document.querySelectorAll('.cinematic-memory')];
  function depth(){
    const vh=innerHeight;
    memories.forEach(sec=>{
      const img=sec.querySelector('.memory-image, img');
      if(!img)return;
      const r=sec.getBoundingClientRect();
      const center=r.top+r.height/2;
      const amount=Math.max(-1,Math.min(1,(center-vh/2)/(vh*1.2)));
      img.style.setProperty('--jx-depth',amount.toFixed(3));
    });
  }
  addEventListener('scroll',depth,{passive:true});
  addEventListener('resize',depth,{passive:true});
  depth();
})();

/* =========================================================
   JAIVI 2.0 — INTERACTIVE EXPERIENCE LAYER
========================================================= */
(() => {
  const body = document.body;

  // UI shell
  const ui = document.createElement('div');
  ui.id = 'jx-ui';
  ui.innerHTML = '<div id="jx-progress"></div><div id="jx-cursor"></div><div id="jx-cursor-dot"></div>';
  body.appendChild(ui);

  const progress = document.getElementById('jx-progress');
  const cursor = document.getElementById('jx-cursor');
  const dot = document.getElementById('jx-cursor-dot');

  // Scroll progress feels like a cinematic journey rather than a page.
  function updateProgress(){
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
  }
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress);
  updateProgress();

  // Premium cursor energy on desktop.
  if(innerWidth > 700){
    let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,dx=mx,dy=my;
    addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    function cursorLoop(){
      cx += (mx-cx)*.16; cy += (my-cy)*.16;
      dx += (mx-dx)*.35; dy += (my-dy)*.35;
      cursor.style.left=cx+'px'; cursor.style.top=cy+'px';
      dot.style.left=dx+'px'; dot.style.top=dy+'px';
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();

    document.querySelectorAll('a,button,.memory-diya,.photo-card,.giant-diya').forEach(el=>{
      el.addEventListener('mouseenter',()=>body.classList.add('jx-cursor-hot'));
      el.addEventListener('mouseleave',()=>body.classList.remove('jx-cursor-hot'));
    });
  }

  // Click ripples everywhere — but skip typing/selecting.
  addEventListener('click', e => {
    if(e.target.closest('input,textarea,select')) return;
    const r=document.createElement('span');
    r.className='jx-ripple';
    r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px';
    body.appendChild(r);
    setTimeout(()=>r.remove(),850);
  });

  // Section name HUD.
  const chip=document.createElement('div');
  chip.className='jx-section-chip';
  body.appendChild(chip);
  const names = [
    ['.hero','THE NIGHT'],
    ['.memory:nth-of-type(1)','MEMORY 01'],
    ['.memory-game','THE MEMORIES'],
    ['.jaivi-reveal','JAIVI'],
    ['.distance','DISTANCE'],
    ['.final','THE LAST PAGE']
  ];
  const sectionObs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        chip.textContent=en.target.dataset.jxName || '';
        chip.classList.add('show');
      }
    });
  },{threshold:.45});
  names.forEach(([sel,name])=>{
    const el=document.querySelector(sel);
    if(el){el.dataset.jxName=name;sectionObs.observe(el)}
  });

  // 3D tilt on memory cards/images based on pointer position.
  document.querySelectorAll('.cinematic-memory').forEach(section=>{
    section.addEventListener('mousemove', e=>{
      if(innerWidth<700)return;
      const r=section.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      section.style.transform=`perspective(1200px) rotateX(${(-y*1.8).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg)`;
      section.classList.add('jx-active');
    });
    section.addEventListener('mouseleave',()=>{
      section.style.transform='';
      section.classList.remove('jx-active');
    });
  });

  // When the nine diyas are complete, create a glowing constellation linking them.
  const game=document.querySelector('.memory-game');
  const gameDiyas=[...document.querySelectorAll('.memory-diya')];
  let constellationDone=false;
  function tryConstellation(){
    if(constellationDone || gameDiyas.length<2 || !gameDiyas.every(d=>d.classList.contains('lit'))) return;
    constellationDone=true;
    const layer=document.createElement('div'); layer.className='jx-constellation';
    document.body.appendChild(layer);
    const pts=gameDiyas.map(d=>{const r=d.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}});
    pts.forEach((p,i)=>{
      const s=document.createElement('i');s.className='jx-constellation-star';s.style.left=p.x-4+'px';s.style.top=p.y-4+'px';s.style.animationDelay=i*.08+'s';layer.appendChild(s);
    });
    pts.forEach((p,i)=>{
      if(i===pts.length-1)return;
      const q=pts[i+1], dx=q.x-p.x, dy=q.y-p.y, len=Math.hypot(dx,dy);
      const line=document.createElement('span');line.className='jx-constellation-line';
      line.style.left=p.x+'px';line.style.top=p.y+'px';line.style.width=len+'px';line.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;layer.appendChild(line);
    });
    layer.classList.add('show');
    const secret=document.createElement('div');secret.className='jx-secret';secret.textContent='9 memories • one circle • still connected';body.appendChild(secret);secret.classList.add('show');
    setTimeout(()=>layer.classList.remove('show'),5000);
    setTimeout(()=>layer.remove(),5800);
  }
  gameDiyas.forEach(d=>new MutationObserver(tryConstellation).observe(d,{attributes:true,attributeFilter:['class']}));

  // Secret interaction: click the big background diya 7 times.
  let secretClicks=0,secretTimer;
  document.querySelectorAll('.bg-diya').forEach(d=>d.addEventListener('click',()=>{
    secretClicks++; clearTimeout(secretTimer); secretTimer=setTimeout(()=>secretClicks=0,2200);
    if(secretClicks===7){
      secretClicks=0;
      const s=document.createElement('div');s.className='jx-secret';s.textContent='you found the hidden diya ✨';body.appendChild(s);s.classList.add('show');
      for(let i=0;i<18;i++){
        const p=document.createElement('span');p.className='jx-petal';p.style.position='fixed';p.style.left='50%';p.style.top='50%';p.style.zIndex='10061';p.style.animation='none';body.appendChild(p);
        const a=Math.random()*Math.PI*2,dist=80+Math.random()*220;
        p.animate([{transform:'translate(-50%,-50%) scale(.2)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*dist}px),calc(-50% + ${Math.sin(a)*dist}px)) scale(1)`,opacity:0}],{duration:1000+Math.random()*500,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(()=>p.remove());
      }
    }
  }));

  // Gentle parallax for the background on scroll.
  const bg=document.getElementById('background');
  addEventListener('scroll',()=>{if(bg) bg.style.transform=`translate3d(0,${scrollY*.025}px,0)`},{passive:true});
})();


/* =========================================================
   BEAUTY SCANNER — CAMERA MINI GAME
   ========================================================= */
(() => {
  const scanBtn = document.getElementById("beautyScanBtn");
  const video = document.getElementById("beautyVideo");
  const panel = document.getElementById("beautyScannerPanel");
  const status = document.getElementById("beautyStatus");
  const result = document.getElementById("beautyResult");
  const permission = document.getElementById("beautyPermission");
  if (!scanBtn || !video || !panel) return;

  let stream = null, timer = null, scanning = false;
  const setStatus = (t) => status.textContent = t;

  function stopCamera(){
    if(stream){ stream.getTracks().forEach(t => t.stop()); stream = null; }
    video.srcObject = null;
    panel.classList.remove("active");
  }

  async function detectFace(){
    // We do not classify gender. The joke triggers when a face is detected.
    if (!("FaceDetector" in window) || video.readyState < 2) return true;
    try{
      const detector = new FaceDetector({fastMode:true,maxDetectedFaces:1});
      return (await detector.detect(video)).length > 0;
    }catch(e){ return true; }
  }

  async function runScan(){
    let attempts = 0;
    const tick = async () => {
      if(!scanning) return;
      attempts++;
      const found = await detectFace();
      setStatus(found ? (attempts < 4 ? "Face detected • analyzing…" : "Beauty levels rising…") : "Move into the frame…");
      if((found && attempts >= 6) || attempts >= 12) return finishScan();
      timer = setTimeout(tick, 600);
    };
    tick();
  }

  function finishScan(){
    scanning = false;
    clearTimeout(timer);
    setStatus("⚠ SYSTEM OVERLOAD ⚠");
    panel.classList.add("overload");
    result.innerHTML = '<strong>BEAUTY CANNOT BE DETECTED</strong><small>Scanner crashed. This much beauty is beyond the hardware. 😂✨</small>';
    document.body.classList.add("beauty-chaos");
    setTimeout(() => document.body.classList.remove("beauty-chaos"), 1200);
    setTimeout(() => {
      stopCamera();
      panel.classList.remove("overload");
      scanBtn.disabled = false;
      scanBtn.textContent = "📷 SCAN AGAIN";
    }, 2200);
  }

  function showError(err){
    permission.classList.remove("hidden");
    setStatus("Camera permission not granted");
    let msg = "Allow camera access and press START SCAN again.";
    if(err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError"){
      msg = "Click the 🔒 icon beside the URL → Camera → Allow, then reload the page.";
    } else if(err?.name === "NotFoundError"){
      msg = "No camera was found on this device.";
    } else if(location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1"){
      msg = "Run this through VS Code Live Server or use your HTTPS GitHub Pages link.";
    }
    result.innerHTML = `<strong>CAMERA BLOCKED</strong><small>${msg}</small>`;
    scanning = false;
    scanBtn.disabled = false;
    scanBtn.textContent = "📷 START SCAN";
  }

  async function startScan(){
    if(scanning) return;
    scanning = true;
    clearTimeout(timer);
    result.innerHTML = "";
    permission.classList.add("hidden");
    scanBtn.disabled = true;
    scanBtn.textContent = "🔍 SCANNING…";
    panel.classList.remove("overload");

    if(!navigator.mediaDevices?.getUserMedia){
      showError({name:"UnsupportedCamera"});
      return;
    }

    try{
      setStatus("Requesting camera access…");
      stream = await navigator.mediaDevices.getUserMedia({
        video:{facingMode:"user",width:{ideal:720},height:{ideal:720}},
        audio:false
      });
      video.srcObject = stream;
      await video.play();
      panel.classList.add("active");
      setStatus("Camera online • searching for a face…");
      result.innerHTML = "<small>Hold still… calibrating the scanner.</small>";
      runScan();
    }catch(err){
      console.error(err);
      stopCamera();
      showError(err);
    }
  }

  scanBtn.addEventListener("click", startScan);
  window.addEventListener("beforeunload", stopCamera);
})();
