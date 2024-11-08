export class AudioPlayer {
	bufferList: Array<any> = [];
	audioContext = new AudioContext();
	gainNode: GainNode = this.audioContext.createGain();

	init(bufferList: Array<any>) {
		this.bufferList = bufferList;
		this.gainNode.gain.value = 1;
		this.gainNode.connect(this.audioContext.destination);
	}

	play(i: number) {
		var sound = this.audioContext.createBufferSource();
		sound.connect(this.gainNode);
		sound.buffer = this.bufferList[i];
		sound.start(0);
		sound.stop(this.audioContext.currentTime + 18);
	}
};
