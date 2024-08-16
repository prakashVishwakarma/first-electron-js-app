let counter = 0;
let interval;

// Function to start the timer
function startTimer() {
    clearInterval(interval); // Clear any existing interval
    interval = setInterval(() => {
        counter++;
        document.getElementById('timer').innerText = `Active time: ${counter} seconds`;
    }, 1000); // Update every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(interval);
    document.getElementById('timer').innerText = `Inactive. Total active time: ${counter} seconds`;
}

// Set up listeners for messages from the main process
window.electronAPI.on('timer-start', () => {
    startTimer();
});

window.electronAPI.on('timer-stop', () => {
    stopTimer();
});
