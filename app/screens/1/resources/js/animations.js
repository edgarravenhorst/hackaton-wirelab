const Parallax = require('parallax-js');
const $ = require('jquery');
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

circularMotion("#water1", 3, 10, -1);
circularMotion("#water2", 2, -10, -1);
circularMotion("#water3", 2, 10, -1);
circularMotion("#boat", 3, 10, -1);
circularMotion("#zappelin", 3, 10, -1);

TweenMax.to("#zon", 2, {scaleX:1.5, scaleY:1.5, repeat:-1, yoyo:true, ease: Power2.easeInOut});
TweenMax.to("#maan", 5, {scaleX:1.1, scaleY:1.1, repeat:-1, yoyo:true, ease: Power2.easeInOut});

let logoEl = document.getElementById("logo");
let logo = $(logoEl);

let sky = document.getElementById("sky");
let darkness = document.getElementById("darkness");
let clouds1 = document.getElementById("clouds1");
let clouds2 = document.getElementById("clouds2");
let clouds3 = document.getElementById("clouds3");
let solar = document.getElementById("solar");
let stars = document.getElementById("stars");

let animations = {};

animations.logo = {
  state: null,
  className: null,
  show: function(mode) {
    if (this.state === 'show') {
      return;
    }
    this.state = 'show';

    TweenMax.killChildTweensOf(logo);
    TweenMax.to(logoEl, 2, {y: 500, scaleX:1, scaleY:1, ease: Elastic.easeOut});

    logo.removeClass(this.className);
    this.className = 'logo-' + mode;
    logo.addClass(this.className);
  },
  hide: function() {
    if (this.state === 'hide') {
      return;
    }
    this.state = 'hide';

    TweenMax.killChildTweensOf(logo);
    TweenMax.to(logo, 1, {y:0, scaleX:0.4, scaleY:0.4, ease: Elastic.easeOut});
  }
};

animations.scene = {
  render: function(positionX, positionY) {
    sky.style.opacity = (-1.5 + (positionX*1080/window.innerWidth)) * -1;
    darkness.style.opacity = -1.5 + (positionX*1080/window.innerWidth * 2);
    stars.style.opacity = -1.0 + (positionX*1080/window.innerWidth * 2);
    //clouds1.style.opacity = 0.7- positionX*1080/window.innerWidth;
    //clouds2.style.opacity = 0.7- positionX*1080/window.innerWidth;
    //clouds3.style.opacity = 0.7- positionX*1080/window.innerWidth;
    parallax.inputX = (positionX*1080 - parallax.windowCenterX) / parallax.windowRadiusX;
    parallax.inputY = (positionY*1920 - parallax.windowCenterY) / parallax.windowRadiusY;

    let solarRotation = -positionX*180 + 100;
    TweenMax.to(solar, 1, {rotation:solarRotation});
    //solar.style.transform = "rotate(" + solarRotation + "deg)";

    let logoDayTime = positionX < .05;
    let logoNighttime = positionX > .95;
    if (logoDayTime || logoNighttime) {
	    animations.logo.show(logoDayTime ? 'daytime' : 'nighttime');
    }
    else {
      animations.logo.hide();
    }
  }
};

export default {animations};
