ScrollTrigger.clearScrollMemory('manual');
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.contentWrapper'),
    smooth: true,
    direction: "vertical",
    lerp: "0.09",
    smartphone: {
        smooth: true,
        direction: "vertical",
    },
    tablet: {
        smooth: true,
        direction: "vertical",
    }
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".contentWrapper", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".contentWrapper").style.transform ? "transform" : "fixed",
  fixedMarkers: true,
});

/////////////////////////////////////////
/////////// Normal Animations ///////////
/////////////////////////////////////////

// Hero Animation
var typed = new Typed('#typed', {
    strings: ['Video Games', 'Films', 'Documentary', 'Any Project', 'You'],
    smartBackspace: true,
    typeSpeed: 100,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

// portfolio transition
gsap.fromTo(".photoMe",{width: "10%"},{
    scrollTrigger: {
        trigger: ".photoMe",
        start: "top bottom",
        scroller:".contentWrapper",
        end: "top top",
        scrub: 0.5,
      },
    width: "45%",
});

gsap.to(".followCircle", {
    scrollTrigger: {
        trigger: "#ProjectsWrapper",
        end: "top bottom",
        scroller:".contentWrapper",
        scrub: 1,
      },
    opacity: 0,
});

gsap.to("body", {
    scrollTrigger: {
        trigger: "#ProjectsWrapper",
        start: "top bottom",
        scroller:".contentWrapper",
        end: "top 50%",
        scrub: 1,
      },
    backgroundColor: "black",
});
gsap.to(".starLine", {
    scrollTrigger: {
        trigger: "#ProjectsWrapper",
        start: "top bottom",
        scroller:".contentWrapper",
        end: "top 50%",
        scrub: 1,
      },
    backgroundColor: "white",
});

gsap.to("#ProjectsWrapper", {
    scrollTrigger: {
        trigger: "#ProjectsWrapper",
        start: "top bottom",
        scroller:".contentWrapper",
        end: "center 50%",
        scrub: 0.5,
    },
    backgroundSize: "5.263% 5.53%",
});



let projectsTl = gsap.timeline({
    scrollTrigger: {
        scroller:".contentWrapper",
        scrub: true,
        start: "50% 50%",
        end: "+=7500",
        pin: "#projectsCenter",
        // snap: {
        //     snapTo: 1 / 6,
        //     duration: 0.5,
        //     ease: "power4.In"
        // },
    }
});

projectsTl.fromTo(".artWork",{
    clipPath: "inset(100% 0% 0% 0%)",
},{
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: 0.5,
}),
projectsTl.fromTo(".year",{
    clipPath: "inset(0% 100% 0% 0%)",
},{
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: 0.5,
},"<"),
projectsTl.fromTo(".company",{
    clipPath: "inset(0% 0% 0% 100%)",
},{
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: 0.5,
},"<"),
projectsTl.fromTo(".songs",{
    clipPath: "inset(0% 0% 0% 100%)",
},{
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: 0.5,
},"<");

// Projects Text Fit
var resizeId;
window.addEventListener('resize', function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 400);
});

function doneResizing(){
    fitText();
}

//footer animation
var typed2 = new Typed('#typed2', {
    strings: ['that new album.', 'your newest project.', 'some cool ideas.'],
    smartBackspace: true,
    typeSpeed: 100,
    backSpeed: 30,
    backDelay: 1000,
    loop: true,
});

const email = document.getElementById("email");
let tl = gsap.timeline({
    repeat: -1, 
    yoyo: true
});
tl.fromTo("#leftArrow",{
    left: "-20px",
},{
    left: "-26px",
    duration: 0.5,
    ease: "power1.out"
})
tl.fromTo("#rightArrow",{
    right: "-23px",
},{
    right: "-29px",
    duration: 0.5,
    ease: "power1.out"
},"<")

/////////////////////////////////////////
/////// More Scroll Trigger code ////////
/////////////////////////////////////////
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();