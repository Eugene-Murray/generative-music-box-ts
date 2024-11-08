export class BufferLoader {
    context: AudioContext;
    urlList: string[];
    onload: Function;
    bufferList: AudioBuffer[];
    loadCount = 0;

    constructor(context: AudioContext, urlList: string[], callback: Function) {
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }

    loadBuffer(url: string, index: number) {
        console.log("loadBuffer", url, index);
        // Load buffer asynchronously
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        console.log("Loading " + url);
        request.send();
        request.onload = () => {
            console.log("Loaded ", request.response);
            // Asynchronously decode the audio file data in request.response
            this.context.decodeAudioData(
                request.response,
                (buffer) => {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    this.bufferList[index] = buffer;

                    if (++this.loadCount == this.urlList.length) {
                        this.onload(this.bufferList);
                    }
                },
                (error) => {
                    console.error('decodeAudioData error', error);
                }
            );
        };
        request.onerror = (error) => {
            console.error('BufferLoader XHR error', error);
        };
    }

    load = () => {
        for (var i = 0; i < this.urlList.length; ++i) {
            this.loadBuffer(this.urlList[i], i);
        }
    };
}