// script.js

let timerId = 0; // To uniquely identify each timer
let timers = {}; // Object to hold all timers

// Load timers from localStorage when the page is loaded
window.onload = () => {
    loadTimersFromStorage();
};

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
    const id = timerId++;
    const newTimerElement = createTimerElement(id);
    document.getElementById('timersContainer').appendChild(newTimerElement);

    // Add new timer to the timers object
    timers[id] = {
        interval: null,
        time: 0,
        isRunning: false,
        element: newTimerElement
    };

    // Save timers to localStorage
    saveTimersToStorage();
});

// Timer Functions
function startTimer(id) {
    if (timers[id].interval) return; // Timer already running
    timers[id].isRunning = true;
    timers[id].interval = setInterval(() => {
        timers[id].time++;
        updateTimerDisplay(id);
        saveTimersToStorage(); // Save current progress
    }, 1000);

    saveTimersToStorage();
}

function pauseTimer(id) {
    clearInterval(timers[id].interval);
    timers[id].interval = null;
    timers[id].isRunning = false;
    saveTimersToStorage(); // Save current progress
}

function resetTimer(id) {
    timers[id].time = 0;
    updateTimerDisplay(id);
    pauseTimer(id);
    saveTimersToStorage();
}

function removeTimer(id) {
    pauseTimer(id); // Pause before removing
    const timerElement = document.querySelector(`.timer[data-id="${id}"]`);
    if (timerElement) {
        timerElement.remove();
    }
    delete timers[id];
    saveTimersToStorage(); // Save after removing
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

// Save the current state of timers to localStorage
function saveTimersToStorage() {
    const timersData = Object.keys(timers).map(id => ({
        id,
        time: timers[id].time,
        isRunning: timers[id].isRunning
    }));
    localStorage.setItem('timers', JSON.stringify(timersData));
}

// Load the saved timers from localStorage
function loadTimersFromStorage() {
    const savedTimers = JSON.parse(localStorage.getItem('timers'));
    if (savedTimers) {
        savedTimers.forEach(savedTimer => {
            const id = parseInt(savedTimer.id, 10);
            const newTimerElement = createTimerElement(id);
            document.getElementById('timersContainer').appendChild(newTimerElement);

            // Restore the timer's state
            timers[id] = {
                interval: null,
                time: savedTimer.time,
                isRunning: savedTimer.isRunning,
                element: newTimerElement
            };

            updateTimerDisplay(id);

            // If the timer was running, resume it
            if (savedTimer.isRunning) {
                startTimer(id);
            }

            // Ensure timerId is updated to avoid duplicate IDs
            timerId = Math.max(timerId, id + 1);
        });
    }
}