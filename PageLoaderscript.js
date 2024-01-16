function fitText(){
    textFit(document.getElementsByClassName("year"), {alignHoriz: true, alignVert: true,detectMultiLine: false,reProcess: true});
    textFit(document.getElementsByClassName('company'), {alignHoriz: true, alignVert: true ,detectMultiLine: false,reProcess: true});
    }
function showCircle(){
    gsap.to(".followCircle",{
        opacity: 100,
        duration:1,
    })
}

document.addEventListener("DOMContentLoaded", function() {
    fitText();
    console.log("Website loaded");
  });

