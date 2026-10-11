/* ================= MOBILE MENU ================= */
const nav=document.getElementById("nav-links");
const menuToggle=document.querySelector(".menu-toggle");

function setMenu(open){
    nav.classList.toggle("open",open);
    menuToggle.setAttribute("aria-expanded",open);
    menuToggle.innerHTML=open?'<i class="fas fa-xmark"></i>':'<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{ if(e.key==="Escape") setMenu(false); });
window.addEventListener("resize",()=>{ if(window.innerWidth>1024) setMenu(false); });

/* ================= SCROLL REVEAL ================= */
const revealEls=document.querySelectorAll(".card, .section-title");

if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },{threshold:0.1});

    revealEls.forEach(el=>{
        el.classList.add("reveal");
        observer.observe(el);
    });
}

/* ================= FOOTER YEAR ================= */
document.querySelectorAll(".year").forEach(el=>el.textContent=new Date().getFullYear());

/* ================= HERO SLIDESHOW ================= */
const slideshow=document.querySelector(".slideshow");

if(slideshow){
    const slides=slideshow.querySelectorAll(".slide");
    let index=0;
    let interval;

    const showSlide=i=>{
        index=(i+slides.length)%slides.length;
        slides.forEach((s,n)=>s.classList.toggle("active",n===index));
    };
    const start=()=>{ clearInterval(interval); interval=setInterval(()=>showSlide(index+1),4000); };

    slideshow.querySelector(".prev").addEventListener("click",()=>showSlide(index-1));
    slideshow.querySelector(".next").addEventListener("click",()=>showSlide(index+1));
    slideshow.addEventListener("mouseenter",()=>clearInterval(interval));
    slideshow.addEventListener("mouseleave",start);
    start();
}

/* ================= HERO TYPING ================= */
const typed=document.querySelector(".typed");

if(typed){
    const roles=[
        "Systems Analyst",
        "Full Stack Developer",
        "Data Scientist",
        "IT Support Specialist",
        "Cloud Engineer",
        "Networking Engineer",
        "Electrical Engineer"
    ];
    let roleIndex=0;
    let charIndex=0;
    let deleting=false;

    (function typeEffect(){
        const word=roles[roleIndex];
        typed.textContent=word.substring(0,charIndex);

        if(!deleting && charIndex===word.length){
            deleting=true;
            return setTimeout(typeEffect,1500);
        }
        if(deleting && charIndex===0){
            deleting=false;
            roleIndex=(roleIndex+1)%roles.length;
        }
        charIndex+=deleting?-1:1;
        setTimeout(typeEffect,deleting?50:110);
    })();
}
