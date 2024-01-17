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
function isMobile() {
    var width = window.innerWidth;
    if (width < 640) {
        return true;
    }
    else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fitText();
});

// Resize Detection
var changeDevice = isMobile();
var resizeId;
window.addEventListener('resize', function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 400);
});

function doneResizing(){
    if(changeDevice != isMobile())
    {
        window.location.reload();
    }
    fitText();
}
