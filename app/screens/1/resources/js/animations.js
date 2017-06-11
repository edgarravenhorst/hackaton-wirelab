
import {TimelineMax, TweenMax, Power2, TimelineLite} from "gsap";

//TweenMax(document.getElementById("clouds"), 1, {})

var circularMotion = function(selector, time, rad, repeat=0){
  let tl = new TimelineMax({ repeat: repeat, repeatDelay: 0, delay: 0 });
  tl.to(selector, time, {
    bezier: {
      type: "quadratic",
      values:[
        { x: 0, y: 0 }, { x: rad, y: 0 }, { x: rad, y: rad },
        { x: rad, y: rad*2 }, { x: 0, y: rad*2 },
        { x: -rad, y: rad*2 }, { x: -rad, y: rad },
        { x: -rad, y: 0 }, { x: 0, y: 0 }],
      autoRotate: false
    },
    ease: Linear.easeNone
  });
}

circularMotion("#clouds1", 4, 30, -1);
circularMotion("#clouds2", 4, -20, -1);
circularMotion("#clouds3", 4, 10, -1);
circularMotion("#plane", 4, 50, -1);
circularMotion("#water1", 3, 10, -1);
circularMotion("#water2", 2, -10, -1);
circularMotion("#water3", 2, 10, -1);
circularMotion("#boat", 3, 10, -1);
circularMotion("#zappelin", 3, 10, -1);

TweenMax.to("#zon", 1, {scaleX:1.4, scaleY:1.4, repeat:-1, yoyo:true, ease: Linear.easeNone});
TweenMax.to("#maan", 5, {scaleX:1.1, scaleY:1.1, repeat:-1, yoyo:true, ease: Linear.easeNone});
