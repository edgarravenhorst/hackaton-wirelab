const Parallax = require('parallax-js');

var scene = document.getElementById('scene')
var parallax = new Parallax(scene, {
  scalarX: 2000,
  scalarY: 2,
  originX: 0,
})

window.removeEventListener('mousemove', parallax.onMouseMove)

// Setup configuration for motion tracking
var config = {
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
var IPMIFramework = new IPMI.Framework(config);

var sky = document.getElementById("sky");
var darkness = document.getElementById("darkness");
var clouds1 = document.getElementById("clouds1");
var clouds2 = document.getElementById("clouds2");
var clouds3 = document.getElementById("clouds3");
var solar = document.getElementById("solar");

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
  console.log(person.centroid.x)
  sky.style.opacity = 1.2- person.centroid.x*1080/window.innerWidth;
  darkness.style.opacity = -0.3 + person.centroid.x*1080/window.innerWidth;
  clouds1.style.opacity = 0.7- person.centroid.x*1080/window.innerWidth;
  clouds2.style.opacity = 0.7- person.centroid.x*1080/window.innerWidth;
  clouds3.style.opacity = 0.7- person.centroid.x*1080/window.innerWidth;
  parallax.inputX = (person.centroid.x*1080 - parallax.windowCenterX) / parallax.windowRadiusX
  parallax.inputY = (person.centroid.y*1920 - parallax.windowCenterY) / parallax.windowRadiusY

  var solarRotation = -person.centroid.x*180 + 100;
  TweenMax.to(solar, 1, {rotation:solarRotation});
  //solar.style.transform = "rotate(" + solarRotation + "deg)";

  // Handle logic to be executed when a person moves within the scene
});
IPMIFramework.Tracking.PersonLeftSignal.add(function(person) {
  // Handle logic to be executed when a person leaves the scene
  console.log("person_left", person);
});
