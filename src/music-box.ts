import { AudioPlayer } from "./audio-player";
import { BufferLoader } from "./buffer-loader";
import { ViewService } from "./view-service";

const audioPlayer = new AudioPlayer();

const finishedLoading = (bufferList: Array<any>) => {
  console.log("Finished loading audio files", bufferList, audioPlayer);
  audioPlayer.init(bufferList);
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas) {
    const view = new ViewService(canvas, audioPlayer);
    canvas?.addEventListener("mousedown", view.handleClick.bind(view), false);
    setInterval(view.updateDisplay.bind(view), view.frameRate);
    console.log("Music Box is ready to play!", canvas, view);
  }
};

window.onload = () => {
  const button = document.querySelector<HTMLButtonElement>("#start");
  button?.addEventListener("click", () => {
    console.log("Starting Music Box");
    try {
      const bufferLoader = new BufferLoader(
        audioPlayer.audioContext,
        [
          "A4.mp3",
          "A5.mp3",
          "C4.mp3",
          "C5.mp3",
          "D4.mp3",
          "D5.mp3",
          "E4.mp3",
          "E5.mp3",
          "G4.mp3",
          "G5.mp3",
        ],
        finishedLoading
      );

      bufferLoader.load();
    } catch (error) {
      console.error("Error starting Music Box", error);
    }
  });
};
