import { AudioPlayer } from "./audio-player";

export class ViewService {
	canvas: HTMLCanvasElement;
	clicks: Array<any> = [];
	frameRate: number = 1000 / 30;
	loopRate: number = 4000;
	maxRadius: number = 80;
	audioPlayer: AudioPlayer;

	constructor(canvas: HTMLCanvasElement, audioPlayer: AudioPlayer) {
		this.canvas = canvas;
		this.audioPlayer = audioPlayer;
	}

	handleClick(event: any): void {
		var x = event.offsetX;
		var y = event.offsetY;
		var pos = this.clicks.push({x: x, y: y, radius: 0});
		this.audioPlayer.play(x%10);

		setInterval(() => {
			this.clicks[pos-1].radius = 0; 
			this.audioPlayer.play(x%10); 
		}, this.loopRate);
	}

	updateDisplay(): void {
		const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (context) {
			context.fillStyle = 'black';
			context?.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
		
		for (var i = 0; i < this.clicks.length; i++) {
			var circle = this.clicks[i];
			if (circle.radius > this.maxRadius) continue;
			circle.radius += 1;
	
			var alpha = .7;
			if (circle.radius > (this.maxRadius - 15)) {
				alpha = (this.maxRadius - circle.radius) / 10;
			}
			this.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
		}
	}

	drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number): void {
		context.beginPath();
		context.arc(x, y, radius, 0, 2*Math.PI);
		context.fillStyle = "rgba(" + x%256 + ", " + y%256  + ", " + (x * y % 256)+ " ," + alpha + ")";
		context.fill();
	};
}
