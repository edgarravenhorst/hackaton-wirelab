const Parallax = require('parallax-js');
import {TimelineMax, TweenMax, Power2, TimelineLite} from "gsap";

let scene = document.getElementById('scene');
let parallax = new Parallax(scene, {
	scalarX: 2000,
	scalarY: 2,
	originX: 0,
});

window.removeEventListener('mousemove', parallax.onMouseMove);

//TweenMax(document.getElementById("clouds"), 1, {})

let circularMotion = function(selector, time, rad, repeat=0){
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
};

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


let sky = document.getElementById("sky");
let darkness = document.getElementById("darkness");
let clouds1 = document.getElementById("clouds1");
let clouds2 = document.getElementById("clouds2");
let clouds3 = document.getElementById("clouds3");
let solar = document.getElementById("solar");


let animations = {};

animations.logo = {
  showStart: function() {

  }
};

animations.scene = {
  render: function(positionX, positionY) {
    sky.style.opacity = 1.2- positionX*1080/window.innerWidth;
    darkness.style.opacity = -0.3 + positionX*1080/window.innerWidth;
    //clouds1.style.opacity = 0.7- positionX*1080/window.innerWidth;
    //clouds2.style.opacity = 0.7- positionX*1080/window.innerWidth;
    //clouds3.style.opacity = 0.7- positionX*1080/window.innerWidth;
    parallax.inputX = (positionX*1080 - parallax.windowCenterX) / parallax.windowRadiusX;
    parallax.inputY = (positionY*1920 - parallax.windowCenterY) / parallax.windowRadiusY;

    let solarRotation = -positionX*180 + 100;
    TweenMax.to(solar, 1, {rotation:solarRotation});
    //solar.style.transform = "rotate(" + solarRotation + "deg)";

    if (positionX < .05) {

    }
  }
};

export default {animations};