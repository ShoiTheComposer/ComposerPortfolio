console.clear;
let playerBtn = document.getElementsByClassName('playerBtn')[0];
let playerToggle = false;
let playingAnimation = false;

gsap.set(".playerLine:nth-child(1)", {
    x: -7,
  });
gsap.set(".playerLine:nth-child(2)", {
    x: 7,
  });
gsap.set(".playerLine:nth-child(2)", {
    x: 7,
  });

//Menu Btn Animation
var SoundAnmOntl = gsap.timeline({
  onComplete: () => {
    playingAnimation = false;
  }
});
var SoundAnmOfftl = gsap.timeline({
  onComplete: () => {
    playingAnimation = false;
  }
});

function togglePlayer(){
    if (playingAnimation != true){
        if (playerToggle != true){
        // alert('toggle Menu')
        playingAnimation = true;
        playerToggle = true;
        SoundAnmOntl.to(".audioPlayer", {
            y: "0%",
            ease: "power4.out",
            duration: 1.3,
        });
        SoundAnmOntl.to(".playerLine:nth-child(1)", {
            rotate: "45deg",
            duration: 0.2,
        },"<");
        SoundAnmOntl.to(".playerLine:nth-child(2)", {
            rotate: "-45deg",
            duration: 0.2,
        },"<");
        SoundAnmOntl.to(".playerLine", {
            x: 0,
            duration: 0.2,
        },"<");
        SoundAnmOntl.to(playerBtn, {
            backgroundColor: "white",
            duration: 0.3,
            ease: "power2.out",
        },"<");
        SoundAnmOntl.to(".playsvg", {
            opacity:0,
            duration: 0.1,
        },"<");
        }
        else {
        playingAnimation = true;
        // alert('untoggle Menu');
        playerToggle = false;
        SoundAnmOfftl.to(".audioPlayer", {
            y: "100%",
            ease: "power3.out",
            duration: 0.5,
        });
        SoundAnmOntl.to(".playsvg", {
            opacity:100,
            duration: 0.1,
        },"<");
        SoundAnmOfftl.to(".playerLine:nth-child(1)", {
            rotate: "0deg",
            x: -7,
            duration: 0.25,
            ease: "power1.out",
        },"<");
        SoundAnmOfftl.to(".playerLine:nth-child(2)", {
            rotate: "0deg",
            x: 7,
            duration: 0.2,
            delay: 0.05,
            ease: "power1.out",
        },"<");
        SoundAnmOfftl.to(playerBtn, {
            backgroundColor: "black",
            duration: 0.3,
            ease: "power2.out",
        },"<");
        }
    }
}

playerBtn.addEventListener("click", togglePlayer);

playerBtn.addEventListener("mouseover", function() {
    gsap.to(playerBtn, {
        width: "56px",
        left: "7px",
        bottom: "7px",
        duration: 0.1,
      });
});

playerBtn.addEventListener("mouseleave", function() {
    gsap.to(playerBtn, {
        width: "50px",
        left: "10px",
        bottom: "10px",
        duration: 0.1,
      });
});

/////////////////////////////
// Custom Easy Audio Player /
/////////////////////////////

// Cache references to DOM elements.
document.getElementsByClassName("playPause")[0].addEventListener("click", playMusic);
let playbackSlider = document.getElementsByClassName('durationSlider')[0];
let currentSongId;
let movingTime = false;
let playIcon = document.getElementsByClassName("playerIcon")[0];
let pauseIcon = document.getElementsByClassName("playerIcon")[1];
let playList = document.querySelectorAll(".songs");

// Set Initial Sound
var sound = new Howl({
    src: [""],
    preload: false,
});


// Load Playlist Detect Songs
playList.forEach(function(elem) {
    elem.addEventListener("click", function() {
        gsap.set(".songs", {
            color: "black",
            backgroundColor: "white",
            borderInline: "none",
        });
        gsap.set(elem, {
            color: "gray",
            backgroundColor: "black",
            borderInline: "1px solid gray",
        });

        if(sound._src != elem.firstChild.src){
            changeSongTitle("loading...");
            sound.unload()
            sound = new Howl({
                src: [elem.firstChild.src],
                preload: true,
                html5: true,
                volume: 1,
                onload: function() {
                    playMusic();
                    changeSongTitle(elem.firstChild.src.split('/').slice(0,5)[4]);
                    // toggle Player controls out
                    if (playerToggle != true){
                        togglePlayer();
                    }
                  },
            });
        }
        else {
            if (sound.playing() != true){
                playMusic();
            }
        }
    });
});

// Basic Playing function
function playMusic() {
    if (sound.playing() != true){
        currentSongId = sound.play();
        gsap.set(playIcon, {
            opacity: 0,
        });
        gsap.set(pauseIcon, {
            opacity: 100,
        });
    }
    else{
        sound.pause(currentSongId);
        gsap.set(playIcon, {
            opacity: 100,
        });
        gsap.set(pauseIcon, {
            opacity: 0,
        });
    }
    console.log("playing music ID = " + currentSongId);
}

// Custom Functions
// Time Conversion
var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}
// Change song Title
function changeSongTitle(songname){
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const songTitle = document.getElementsByClassName("songTitle")[0];
    let interval = null;
    let iteration = 0;
    songTitle.innerText = songname;
    console.log(songname)
  
    clearInterval(interval);

    interval = setInterval(() => {
        songTitle.innerText = songTitle.innerText
        .split("")
        .map((letter, index) => {
        if(index < iteration-1) {
            return songname.split("")[index];
        }

        return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
        
        if(iteration > songname.split("").length){ 
            clearInterval(interval);
        }
    
        iteration += 1 / 2;
    }, 30);

}

// Initial Animation
gsap.set(playIcon, {
    opacity: 100,
});
gsap.set(pauseIcon, {
    opacity: 0,
});

// Enable Dragging time
playbackSlider.addEventListener("mousedown", (event) => {
    movingTime = true;
    playbackSlider.addEventListener("mouseup", (event) => {
        sound.seek(playbackSlider.value / 100 * sound.duration());
        movingTime = false;
    });
});

// Update UI
setInterval(function(){ 
    if (movingTime == false){
        playbackSlider.value = sound.seek() / sound.duration() * 100;
    }
    document.getElementsByClassName("OverallTime")[0].innerHTML = toHHMMSS(sound.duration()); 
    document.getElementsByClassName("currentTime")[0].innerHTML = toHHMMSS(sound.seek()); 
    sound.volume(document.getElementsByClassName('volumeSlider')[0].value / 100);
}, 250);
