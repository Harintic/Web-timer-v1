let timer;  // value null by default 
let seconds = 0;

// Load the timer state from localStorage if available
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("timerSeconds")) {
        seconds = parseInt(localStorage.getItem("timerSeconds"), 10);
        document.getElementById('time').textContent = formatTime(seconds);
    }

    if (localStorage.getItem("timerRunning") === "true") {
        startTimer();
    }
});

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTime, 1000);
        localStorage.setItem("timerRunning", "true");
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    localStorage.setItem("timerRunning", "false");
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    document.getElementById('time').textContent = formatTime(seconds);
    localStorage.removeItem("timerSeconds");
    localStorage.setItem("timerRunning", "false");
}

function updateTime() {
    seconds++;
    document.getElementById('time').textContent = formatTime(seconds);
    localStorage.setItem("timerSeconds", seconds);
}

function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}
