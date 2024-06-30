let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTimer, 1);
        running = true;
        paused = false;
    }
}

function pauseTimer() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
        running = false;
    } else if (paused) {
        running = true;
        paused = false;
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTimer, 1);
    }
}

function resetTimer() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    laps = [];
    updateLaps();
    running = false;
    paused = false;
}

function recordLap() {
    if (running || paused) {
        laps.push(display.innerHTML);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(li);
    });
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML =
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
}
