const Howl = require('howler').Howl;

class Sounds {

	isTracking = false;

	rooster;
	birds;

	wolf;
	crickets;

	constructor() {
		let soundsPath = 'resources/sounds/';

		this.rooster = new Howl({
			src: soundsPath + 'Rooster-crowing-in-the-morning.mp3'
		});
		this.birds = new Howl({
			src: soundsPath + 'Birds-chirping-in-the-forest.mp3',
			autoplay: true,
			loop: true,
			volume: 0
		});

		this.wolf = new Howl({
			src: soundsPath + 'Wolf-howl.wav'
		});
		this.crickets = new Howl({
			src: soundsPath + 'Crickets.mp3',
			autoplay: true,
			loop: true,
			volume: 0
		});
	}

	start(position) {
		this.isTracking = true;

		if (position < .5) {
			this.rooster.play();
			this.birds.fade(this.birds.volume(), 1, 2000);
		}
		else {
			this.wolf.play();
			this.crickets.fade(this.crickets.volume(), 1, 2000);
		}
	}

	update(position) {
		if (!this.isTracking) {
			return;
		}
		this.birds.volume((position * 1.5) * -1 + 1);
		this.crickets.volume((position * 1.25) - .25);
	}

	stop() {
		this.isTracking = false;
		this.crickets.fade(this.crickets.volume(), 0, 2000);
		this.birds.fade(this.birds.volume(), 0, 2000);
	}
}


export { Sounds as default}