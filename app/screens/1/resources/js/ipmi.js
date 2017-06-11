const Parallax = require('parallax-js');
const Sounds = require('./sounds');

let scene = document.getElementById('scene');
let parallax = new Parallax(scene, {
  scalarX: 2000,
  scalarY: 2,
  originX: 0,
})

window.removeEventListener('mousemove', parallax.onMouseMove);

let sounds = new Sounds.default();

// Setup configuration for motion tracking
let config = {
  tracking: {
    hostaddr: 'ipmi.wirelab.nl',
    hostport: 4000,
    hostpath: '/secret/noorderhagen',
    method: IPMI.TrackingMethod.Mouse,
    pointerTarget: document.body,
  }
};

// Activate debugmode (leave out to use regular mode)
IPMI.Tools.DEBUG = true;

// Initialize the client framework
let IPMIFramework = new IPMI.Framework(config);

let sky = document.getElementById("sky");
let darkness = document.getElementById("darkness");
let clouds1 = document.getElementById("clouds1");
let clouds2 = document.getElementById("clouds2");
let clouds3 = document.getElementById("clouds3");
let solar = document.getElementById("solar");

let targetPerson;

function gotoPosition(positionX, positionY) {
	sounds.update(positionX);

	sky.style.opacity = 1.2- positionX*1080/window.innerWidth;
	darkness.style.opacity = -0.3 + positionX*1080/window.innerWidth;
	clouds1.style.opacity = 0.7- positionX*1080/window.innerWidth;
	clouds2.style.opacity = 0.7- positionX*1080/window.innerWidth;
	clouds3.style.opacity = 0.7- positionX*1080/window.innerWidth;
	parallax.inputX = (positionX*1080 - parallax.windowCenterX) / parallax.windowRadiusX;
	parallax.inputY = (positionY*1920 - parallax.windowCenterY) / parallax.windowRadiusY;

	let solarRotation = -positionX*180 + 100;
	TweenMax.to(solar, 1, {rotation:solarRotation});
	//solar.style.transform = "rotate(" + solarRotation + "deg)";
}
gotoPosition(0);

// Example signal bindings
IPMIFramework.Tracking.SceneUpdatedSignal.add(function(scene) {
  //console.log(scene)
    //parallax.inputX = (e.clientX - parallax.windowCenterX) / parallax.windowRadiusX
    //parallax.inputY = (e.clientY - parallax.windowCenterY) / parallax.windowRadiusY
});

IPMIFramework.Tracking.PersonEnteredSignal.add(function(person) {
  // Handle logic to be executed when a person enters the scene
  console.log("person_entered", person);
});
IPMIFramework.Tracking.PersonUpdatedSignal.add(function(person) {
  let centroidX = person.centroid.x;
  let centroidY = person.centroid.y;

  if (!targetPerson) {
	  targetPerson = person;
	  sounds.start(centroidX);
  }
  if (targetPerson.id !== person.id) {
    return;
  }

  gotoPosition(centroidX, centroidY);
});
IPMIFramework.Tracking.PersonLeftSignal.add(function(person) {
  // Handle logic to be executed when a person leaves the scene
  console.log("person_left", person);

  if (targetPerson.id === person.id) {
    targetPerson = null;
    sounds.stop();
  }
});
