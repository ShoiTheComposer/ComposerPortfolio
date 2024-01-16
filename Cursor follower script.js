//clickable animation
const clickAble = gsap.utils.toArray('.clickAble');
let circleSize = "2rem";
let circleSelectSize = "5rem";

gsap.set(".followCircle", {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(".followCircle", "x", {duration: 0.3, ease: "power3"}),
    yTo = gsap.quickTo(".followCircle", "y", {duration: 0.3, ease: "power3"});
let mousex;
let mousey;

window.addEventListener("mousemove", e => {
    mousex = (e.clientX);
    mousey = (e.clientY);
    let Inarea = false;
    clickAble.forEach(a => {
        if (Math.abs(getOffset(a).left - mousex) < 65 && Math.abs(getOffset(a).top - mousey) < 65)
        {
            xTo((mousex + (getOffset(a).left * 3))/4);
            yTo((mousey + (getOffset(a).top * 3))/4);
            gsap.to(".followCircle", {
                height: circleSelectSize,
            });
            // gsap.to(a, {
            //     mixBlendMode: "saturation",
            //     duration: 0.3,
            // });
            Inarea = true;
        }
        else{
            // gsap.to(a, {
            //     color: "initial",
            //     duration: 0.3,
            // });
        }
    });
    if (Inarea == false)
    {   
        xTo(mousex);
        yTo(mousey);
        gsap.to(".followCircle", {
            height: circleSize,
        });
    }
});

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: (rect.left + (rect.right - rect.left)/2),
        top: (rect.top + (rect.bottom - rect.top)/2)
    };
};