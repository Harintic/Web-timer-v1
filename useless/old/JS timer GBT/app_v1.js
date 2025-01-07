let timer;
let seconds = 0;
console.log("hi")

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTime, 1000);
        console.log(timer)
    }
}

function stopTimer() {
    clearInterval(timer);
    console.log(timer)
    timer = null;
    console.log(timer)
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    document.getElementById('time').textContent = formatTime(seconds);
}

function updateTime() {
    seconds++;
    document.getElementById('time').textContent = formatTime(seconds);
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