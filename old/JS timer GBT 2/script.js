// script.js

let timerId = 0; // To uniquely identify each timer

// Function to create a new timer element
function createTimerElement(id) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.setAttribute('data-id', id);

    // Timer display
    const timeDisplay = document.createElement('span');
    timeDisplay.textContent = '00:00:00';
    timeDisplay.classList.add('time-display');

    // Timer controls
    const controls = document.createElement('div');
    controls.classList.add('timer-controls');
    
    // Start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.classList.add('start');
    startButton.onclick = () => startTimer(id);

    // Pause button
    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.classList.add('pause');
    pauseButton.onclick = () => pauseTimer(id);

    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('reset');
    resetButton.onclick = () => resetTimer(id);

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.onclick = () => removeTimer(id);

    // Append controls to the timer element
    controls.appendChild(startButton);
    controls.appendChild(pauseButton);
    controls.appendChild(resetButton);
    controls.appendChild(removeButton);
    
    timerElement.appendChild(timeDisplay);
    timerElement.appendChild(controls);

    return timerElement;
}

// Add Timer Button
document.getElementById('addTimerButton').addEventListener('click', () => {
    const newTimerElement = createTimerElement(timerId);
    document.getElementById('timersContainer').appendChild(newTimerElement);
    timers[timerId] = {
        interval: null,
        time: 0,
        element: newTimerElement
    };
    timerId++;
});

const timers = {}; // Object to hold all timers

// Timer Functions
function startTimer(id) {
    if (timers[id].interval) return; // Timer already running
    timers[id].interval = setInterval(() => {
        timers[id].time++;
        updateTimerDisplay(id);
    }, 1000);
}

function pauseTimer(id) {
    clearInterval(timers[id].interval);
    timers[id].interval = null;
}

function resetTimer(id) {
    timers[id].time = 0;
    updateTimerDisplay(id);
    pauseTimer(id);
}

function removeTimer(id) {
    pauseTimer(id); // Pause before removing
    const timerElement = document.querySelector(`.timer[data-id="${id}"]`);
    if (timerElement) {
        timerElement.remove();
    }
    delete timers[id];
}

// Update the timer display
function updateTimerDisplay(id) {
    const time = timers[id].time;
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    const timerElement = timers[id].element;
    const timeDisplay = timerElement.querySelector('.time-display');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}