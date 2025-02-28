let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");
const body = document.body;
const container = document.querySelector(".container");

function startStopwatch() {
    if (!running) {
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = "Pause";
        startStopBtn.classList.add("running");
        body.classList.add("running");
        container.classList.add("running");
    } else {
        clearInterval(timer);
        startStopBtn.textContent = "Start";
        startStopBtn.classList.remove("running");
        body.classList.remove("running");
        container.classList.remove("running");
    }
    running = !running;
}

function updateTime() {
    milliseconds++;
    if (milliseconds == 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById("milliseconds").textContent = formatTime(milliseconds);
    document.getElementById("seconds").textContent = formatTime(seconds);
    document.getElementById("minutes").textContent = formatTime(minutes);
}

function resetStopwatch() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    running = false;
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("running");
    body.classList.remove("running");
    container.classList.remove("running");
    document.getElementById("milliseconds").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    lapsContainer.innerHTML = "";
}

function recordLap() {
    if (running) {
        let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapItem.style.animation = "fadeIn 0.5s forwards";
        lapsContainer.appendChild(lapItem);
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
