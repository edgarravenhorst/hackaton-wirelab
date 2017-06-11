const animations = require('./animations').default.animations;
const Sounds = require('./sounds');


let sounds = new Sounds.default();

// Setup configuration for motion tracking
let config = {
  tracking: {
    hostaddr: 'ipmi.wirelab.nl',
    hostport: 4000,
    hostpath: '/secret/noorderhagen',
    method: IPMI.TrackingMethod.TSPS,
    pointerTarget: document.body,
  }
};

// Activate debugmode (leave out to use regular mode)
IPMI.Tools.DEBUG = true;

// Initialize the client framework
let IPMIFramework = new IPMI.Framework(config);

let targetPerson;



function gotoPosition(positionX, positionY) {
  sounds.update(positionX);
  animations.scene.render(positionX, positionY);
}
gotoPosition(0, 0);

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
