let countdownInterval;
let repeatNotificationInterval;

document.getElementById('start-timer').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('duration').value);
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }
    
    startCountdown(duration);
});

document.getElementById('show-notification').addEventListener('click', () => {
    delayedNotification(3000); 
});

document.getElementById('repeat-notification').addEventListener('click', () => {
    startRepeatingNotification(5000); 
});

function startCountdown(seconds) {
    clearInterval(countdownInterval); 
    const endTime = Date.now() + seconds * 1000;
    
    countdownInterval = setInterval(() => {
        const remaining = Math.max(0, endTime - Date.now());
        if (remaining === 0) {
            clearInterval(countdownInterval);
            document.getElementById('timer').textContent = '00:00';
            alert('Time\'s up!');
            return;
        }
        
        const minutes = Math.floor((remaining / 1000) / 60);
        const secs = Math.floor((remaining / 1000) % 60);
        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function delayedNotification(delay) {
    setTimeout(() => {
        alert('This is your delayed notification!');
    }, delay);
}

function startRepeatingNotification(interval) {
    clearInterval(repeatNotificationInterval); 
    
    repeatNotificationInterval = setInterval(() => {
        alert('This is a repeating notification!');
    }, interval);
}
