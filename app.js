/* ==========================
   CYBER NEKO LITE
========================== */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

const pet = document.getElementById("pet");
const neko = document.getElementById("neko");
const chat = document.getElementById("chat");
const mood = document.getElementById("mood");

let w,h;

function resize(){

    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;

}

window.addEventListener("resize",resize);

resize();

/* ==========================
        STARS
========================== */

const stars=[];

for(let i=0;i<220;i++){

    stars.push({

        x:Math.random()*w,

        y:Math.random()*h,

        r:Math.random()*2+.5,

        s:Math.random()*0.5+.15,

        a:Math.random()

    });

}

/* ==========================
        DRAW
========================== */

function render(){

    ctx.clearRect(0,0,w,h);

    let g=

    ctx.createLinearGradient(

        0,

        0,

        0,

        h

    );

    g.addColorStop(0,"#0b1830");
    g.addColorStop(.5,"#08111f");
    g.addColorStop(1,"#020817");

    ctx.fillStyle=g;

    ctx.fillRect(0,0,w,h);

    stars.forEach(s=>{

        s.y+=s.s;

        if(s.y>h){

            s.y=0;

            s.x=Math.random()*w;

        }

        ctx.globalAlpha=.3+

        Math.sin(Date.now()*0.001+s.a)*.5;

        ctx.fillStyle="#7be7ff";

        ctx.beginPath();

        ctx.arc(

            s.x,

            s.y,

            s.r,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

    ctx.globalAlpha=1;

    requestAnimationFrame(render);

}

render();

/* ==========================
        FLOAT
========================== */

let time=0;

function floatPet(){

    time+=0.03;

    const y=Math.sin(time)*10;

    pet.style.marginTop=y+"px";

    requestAnimationFrame(floatPet);

}

floatPet();

/* ==========================
      FOLLOW MOUSE
========================== */

window.addEventListener("mousemove",e=>{

    const rect=

    neko.getBoundingClientRect();

    const cx=

    rect.left+

    rect.width/2;

    const cy=

    rect.top+

    rect.height/2;

    let dx=e.clientX-cx;

    dx=Math.max(

        -25,

        Math.min(

            25,

            dx/12

        )

    );

    neko.style.transform=

    `translateX(${dx}px)`;

});

/* ==========================
      DRAG
========================== */

let drag=false;

let ox=0;

let oy=0;

neko.addEventListener("mousedown",e=>{

    drag=true;

    const r=

    pet.getBoundingClientRect();

    ox=e.clientX-r.left;

    oy=e.clientY-r.top;

    neko.style.cursor="grabbing";

});

window.addEventListener("mouseup",()=>{

    drag=false;

    neko.style.cursor="grab";

});

window.addEventListener("mousemove",e=>{

    if(!drag)return;

    pet.style.left=

    e.clientX-ox+"px";

    pet.style.top=

    e.clientY-oy+"px";

    pet.style.transform="none";

});

/* ==========================
        CHAT
========================== */

const texts=[

"Xin chào 💙",

"Chủ đang học à? 📚",

"Đừng quên nghỉ ngơi nhé 🌸",

"Cyber Neko luôn ở đây ✨",

"Cố lên nha 😊"

];

function speak(){

    chat.textContent=

    texts[

        Math.floor(

            Math.random()*texts.length

        )

    ];

}

setInterval(

    speak,

    6000

);

/* ==========================
      CLICK
========================== */

neko.addEventListener(

"click",

()=>{

    mood.textContent="Happy 😆";

    speak();

}

);
/*==============================
      HEART EFFECT
==============================*/

function spawnHeart(x,y){

    const h=document.createElement("div");

    h.className="heart";

    h.innerHTML="💙";

    h.style.left=x+"px";

    h.style.top=y+"px";

    document.body.appendChild(h);

    setTimeout(()=>{

        h.remove();

    },1200);

}

/*==============================
     MAGIC PARTICLE
==============================*/

function magicBurst(x,y){

    for(let i=0;i<15;i++){

        const p=document.createElement("div");

        p.className="magic";

        p.style.left=

        x+(Math.random()-0.5)*60+"px";

        p.style.top=

        y+(Math.random()-0.5)*60+"px";

        document.body.appendChild(p);

        const dx=(Math.random()-0.5)*120;
        const dy=(Math.random()-0.5)*120;

        p.animate([

        {

        transform:"translate(0,0) scale(.3)",

        opacity:1

        },

        {

        transform:`translate(${dx}px,${dy}px) scale(2)`,

        opacity:0

        }

        ],{

        duration:900,

        easing:"ease-out"

        });

        setTimeout(()=>p.remove(),900);

    }

}

/*==============================
      CLICK
==============================*/

neko.addEventListener("click",e=>{

    const r=neko.getBoundingClientRect();

    spawnHeart(

        r.left+r.width/2,

        r.top+20

    );

    magicBurst(

        r.left+r.width/2,

        r.top+r.height/2

    );

});

/*==============================
      SLEEP
==============================*/

let idle;

function wake(){

    clearTimeout(idle);

    mood.textContent="Happy 😊";

    chat.textContent="Đang chơi với chủ nè 💙";

    idle=setTimeout(()=>{

        mood.textContent="Sleep 😴";

        chat.textContent="Zzz...";

        neko.style.filter=

        "grayscale(.2) brightness(.85) drop-shadow(0 0 25px cyan)";

    },15000);

    neko.style.filter=

    "drop-shadow(0 0 20px cyan)";

}

["mousemove","click","mousedown"].forEach(e=>{

    window.addEventListener(e,wake);

});

wake();
/*=========================
       BLINK
=========================*/

function blink(){

    neko.classList.add("blink");

    setTimeout(()=>{

        neko.classList.remove("blink");

    },180);

}

setInterval(

()=>{

blink();

},

2500+Math.random()*2500

);

/*=========================
      AUTO WALK
=========================*/

let targetX=window.innerWidth/2;
let targetY=window.innerHeight/2;

let posX=window.innerWidth/2;
let posY=window.innerHeight/2;

function petAI(){

    const dx=targetX-posX;
    const dy=targetY-posY;

    posX+=dx*.025;
    posY+=dy*.025;

    pet.style.left=posX+"px";
    pet.style.top=posY+"px";

    if(Math.abs(dx)>3){

        neko.style.transform=

        dx>0?

        "scaleX(1)":

        "scaleX(-1)";

        neko.classList.add("walk");

    }

    else{

        neko.classList.remove("walk");

    }

    requestAnimationFrame(petAI);

}

petAI();

/*=========================
    RANDOM TARGET
=========================*/

setInterval(()=>{

    targetX=

    100+

    Math.random()*

    (window.innerWidth-200);

    targetY=

    120+

    Math.random()*

    (window.innerHeight-250);

},5000);

/*=========================
    FOLLOW CURSOR
=========================*/

window.addEventListener("mousemove",e=>{

    targetX=e.clientX;
    targetY=e.clientY;

});

/*=========================
      DOUBLE CLICK
=========================*/

neko.addEventListener("dblclick",()=>{

    mood.textContent="Excited 🤩";

    chat.textContent="Yayyyyy!! 💙✨";

    for(let i=0;i<8;i++){

        setTimeout(()=>{

            spawnHeart(

                posX+Math.random()*120-60,

                posY+Math.random()*60

            );

        },i*120);

    }

});