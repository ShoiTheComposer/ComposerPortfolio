let toggleBtn = document.getElementsByClassName('toggleBtn')[0];
let headerToggle = false;
let lockMenuAnimation = false;
let links = document.querySelectorAll(".link");

gsap.set(".toggleBtnLine:nth-child(1)", {
    x: -7,
  });
gsap.set(".toggleBtnLine:nth-child(3)", {
    x: 7,
  });

//Menu Btn Animation
var MenuAnmOntl = gsap.timeline({
  onComplete: () => {
    lockMenuAnimation = false;
  }
});
var MenuAnmOfftl = gsap.timeline({
  onComplete: () => {
    lockMenuAnimation = false;
  }
});

toggleBtn.addEventListener("click", function(){
  // console.log(lockMenuAnimation)
  if (lockMenuAnimation != true){
    toggleMenu();
  }
});

function toggleMenu() {
  if (headerToggle != true){
    // alert('toggle Menu')
    lockMenuAnimation = true;
    headerToggle = true;
    MenuAnmOntl.to(".headerContainer", {
      y: "0%",
      ease: "power4.out",
      duration: 1.3,
    });
    MenuAnmOntl.to(".toggleBtnLine:nth-child(2)", {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
    },"<");
    MenuAnmOntl.to(".toggleBtnLine:nth-child(1)", {
      rotate: "45deg",
      duration: 0.2,
    },"<");
    MenuAnmOntl.to(".toggleBtnLine:nth-child(3)", {
      rotate: "-45deg",
      duration: 0.2,
    },"<");
    MenuAnmOntl.to(".toggleBtnLine", {
      backgroundColor: "black",
      x: 0,
      duration: 0.2,
    },"<");
    MenuAnmOntl.to(toggleBtn, {
      backgroundColor: "white",
      duration: 0.3,
      ease: "power2.out",
    },"<");
    MenuAnmOntl.from(".headerContainer > *", {
      y: "-10px",
      opacity: 0,
      ease: "power2.out",
    },"-=1");
    MenuAnmOntl.from(".link", {
      y: "-10px",
      opacity: 0,
      ease: "power2.out",
      stagger: 0.15,
    },"-=1");
  }
  else {
    lockMenuAnimation = true;
    // alert('untoggle Menu');
    headerToggle = false;
    MenuAnmOfftl.to(".headerContainer", {
      y: "-100%",
      ease: "power3.out",
      duration: 0.5,
    });

    MenuAnmOfftl.to(".toggleBtnLine:nth-child(2)", {
      opacity: "100%",
      duration: 0.3,
      delay: 0.1,
      ease: "power1.out",
    },"<");
    MenuAnmOfftl.to(".toggleBtnLine:nth-child(1)", {
      rotate: "0deg",
      x: -7,
      duration: 0.25,
      ease: "power1.out",
    },"<");
    MenuAnmOfftl.to(".toggleBtnLine:nth-child(3)", {
      rotate: "0deg",
      x: 7,
      duration: 0.2,
      delay: 0.05,
      ease: "power1.out",
    },"<");
    MenuAnmOfftl.to(".toggleBtnLine", {
      backgroundColor: "white",
      duration: 0.2,
    },"<");
    MenuAnmOfftl.to(toggleBtn, {
      backgroundColor: "black",
      duration: 0.3,
      ease: "power2.out",
    },"<");
  }
}

toggleBtn.addEventListener("mouseover", function() {
  gsap.to(toggleBtn, {
      width: "56px",
      right: "7px",
      top: "7px",
      duration: 0.1,
    });
});

toggleBtn.addEventListener("mouseleave", function() {
    gsap.to(toggleBtn, {
        width: "50px",
        right: "10px",
        top: "10px",
        duration: 0.1,
      });
});

// Scroll to
links[0].addEventListener("click", () => {
  var tl = gsap.timeline({});
  tl.add(function(){toggleMenu()},">");
  tl.set("#cover", {right: "auto",left: 0});
  tl.to("#cover", {width: "100vw",ease:"power2.out",duration: 0.4});
  tl.add(function(){locoScroll.scrollTo(0, {duration: "0"})})
  tl.set("#cover", {right: 0,left: "auto"});
  tl.to("#cover", {delay:0.2, width: "0vw",ease:"power2.out",duration: 0.4});
});
links[1].addEventListener("click", () => {
  var tl = gsap.timeline({});
  tl.add(function(){toggleMenu()},">");
  tl.set("#cover", {right: "auto",left: 0});
  tl.to("#cover", {width: "100vw",ease:"power2.out",duration: 0.4});
  tl.add(function(){locoScroll.scrollTo("#aboutWrapper", {duration: "0", offset: "-50"})})
  tl.set("#cover", {right: 0,left: "auto"});
  tl.to("#cover", {delay:0.2, width: "0vw",ease:"power2.out",duration: 0.4});
});
links[2].addEventListener("click", () => {
  var tl = gsap.timeline({});
  tl.add(function(){toggleMenu()},">");
  tl.set("#cover", {right: "auto",left: 0});
  tl.to("#cover", {width: "100vw",ease:"power2.out",duration: 0.4});
  tl.add(function(){locoScroll.scrollTo("#projectsCenter", {duration: "0", offset: "-210"})})
  tl.set("#cover", {right: 0,left: "auto"});
  tl.to("#cover", {delay:0.2, width: "0vw",ease:"power2.out",duration: 0.4});
});
links[3].addEventListener("click", () => {
  var tl = gsap.timeline({});
  tl.add(function(){toggleMenu()},">");
  tl.set("#cover", {right: "auto",left: 0});
  tl.to("#cover", {width: "100vw",ease:"power2.out",duration: 0.4});
  tl.add(function(){locoScroll.scrollTo("#ContactWrapper", {duration: "0"})})
  tl.set("#cover", {right: 0,left: "auto"});
  tl.to("#cover", {delay:0.2, width: "0vw",ease:"power2.out",duration: 0.4});
});