const mic_btn = document.querySelector("#mic");
const playback = document.querySelector(".playback");

mic_btn.addEventListener("click", toggleMic); //dont know toggleMic

let can_record = false;
let is_recording = false;

let recorder = null;

let chunks = [];

function setUpAudio() {  //don't know any thing from here
    console.log("Setup");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(setUpStream)
            .catch(err => {
                console.error(err)
            })
    }
}

setUpAudio();

function setUpStream(stream) {
    recorder = new MediaRecorder(stream);  //don't know MediaRecorder
    
    recorder.ondataavailable = e => {  // don't know ondataavailable
        chunks.push(e.data);
    }

    recorder.onstop = e => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        playback.src = audioURL; //don't know any
    }

    can_record = true;
}

function toggleMic() {
    if (!can_record) return;

    is_recording = !is_recording;

    if (is_recording) {
        if (recorder && recorder.state === "inactive") {
            recorder.start();
            mic_btn.classList.add("is-recording");
        }
    } else {
        if (recorder && recorder.state === "recording") {
            recorder.stop();
            mic_btn.classList.remove("is-recording");
        }
    }
}