const smoothScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
smoothScroll ()

var a = document.querySelector("#main");
var b = document.querySelector("#cursor");
var c = document.querySelector("#hero");
var about = document.querySelector("#about");

c.addEventListener("mouseenter", function () {
    gsap.to(b, {
        opacity: 1,
        scale: 1
    })
})
c.addEventListener("mouseleave", function () {
    gsap.to(b, {
        opacity: 0,
        scale: 0
    })
})

about.addEventListener("mouseenter", function () {
    gsap.to(b, {
        opacity: 1,
        scale: 1
    })
})


function mousefollower() {
    a.addEventListener("mousemove", function (dets) {

        gsap.to(b, {
            left: dets.x - 10,
            top: dets.y
        })
    })
}

var tl = gsap.timeline();

function firstpageAnim() {
    tl.from("#nav", {
        y: 10,
        duration: 1.5,
        delay: .5,
        opacity: 0,
        ease: Expo.easeInOut
    })
       tl.to(".bounding h1,.bounding h5", {
            y: 0,
            duration: 1.5,
            stagger: .3,
            delay: -1,
            ease: Expo.easeInOut
        })
       tl.from("#herofooter", {
            y: 100,
            duration: 1.5,
            delay: -1,
            opacity: 0,
            ease: Expo.easeInOut,
        })
}

gsap.to("#about, #hero",{
    color: "#000",
    backgroundColor:"#F3D7CA",
    scrollTrigger : {
        scroller : "#main",
        trigger : "#text-about",
        start: "top 90%",
        end: "top 60%",
        // markers: true,
        scrub: 2
    }
})

var timer = 600; // 10 minutes in seconds
var display = document.getElementById('timer');

function startTimer() {
  var minutes, seconds;
  var interval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
  }, 1000);
}

var think = document.querySelector("#think button");

think.addEventListener("mouseenter",function (e) {
    gsap.to("#footer video",{
        opacity: 1
    })
})


think.addEventListener("mouseleave",function (e) {
    gsap.to("#footer video",{
        opacity: 0
    })
})

var spani = document.querySelector("#spani");

setTimeout(() => {
    gsap.to("#login",{
        display: "initial"
    })
}, 10000);

spani.addEventListener("click",function () {
    gsap.to("#login",{
        display: "none"
    })
})

startTimer();
firstpageAnim();
mousefollower();