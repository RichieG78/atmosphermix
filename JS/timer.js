// Simple 25-minute countdown timer
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const timerRoot = document.querySelector('.countdown-timer');
        if (!timerRoot) {
            return;
        }

        // Find the timer display element and exit early if not found
        const timerDisplay = timerRoot.querySelector('.timer-display');
        if (!timerDisplay) {
            return;
        }

        // Find the play-pause-stop button
        const playPauseButton = timerRoot.querySelector('.play-pause-stop');
        const playPauseImg = playPauseButton?.querySelector('img');
        if (!playPauseButton || !playPauseImg) {
            return;
        }

        // Find the reset button
        const resetButton = document.querySelector('.reset-button');
        if (!resetButton) {
            console.error('Reset button not found');
            return;
        }
        console.log('Reset button found:', resetButton);

        // Initialize remaining time to 25 minutes in seconds
        const INITIAL_TIME = 25 * 60; // 25 minutes in seconds
        let remainingSeconds = INITIAL_TIME;
        let isRunning = false; // Timer starts in paused state
        let intervalId = null;

        // Function to format time as MM:SS
        const formatTime = (totalSeconds) => {
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        // Function to update the timer display
        const updateDisplay = () => {
            timerDisplay.textContent = formatTime(remainingSeconds);
        };

        // Function to update button icon based on timer state
        const updateButtonIcon = () => {
            if (isRunning) {
                playPauseImg.src = 'Assets/pause-svgrepo-com.svg';
                playPauseImg.alt = 'Pause icon';
                playPauseButton.setAttribute('aria-label', 'Pause timer');
            } else {
                playPauseImg.src = 'Assets/Play.svg';
                playPauseImg.alt = 'Play icon';
                playPauseButton.setAttribute('aria-label', 'Play timer');
            }
        };

        // Function to start the timer
        const startTimer = () => {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    if (remainingSeconds > 0) {
                        remainingSeconds -= 1;
                        updateDisplay();
                    } else {
                        // Timer reached zero, stop it and stop all sounds
                        stopTimer();
                        stopAllSounds();
                    }
                }, 1000);
            }
        };

        // Function to stop the timer
        const stopTimer = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        // Function to stop all playing sounds
        const stopAllSounds = () => {
            if (window.allAudioInstances && Array.isArray(window.allAudioInstances)) {
                window.allAudioInstances.forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
                console.log('All sounds stopped by timer');
            }
        };

        // Function to reset the timer
        const resetTimer = () => {
            console.log('Reset timer called');
            stopTimer();
            isRunning = false;
            remainingSeconds = INITIAL_TIME;
            updateDisplay();
            updateButtonIcon();
        };

        // Toggle timer play/pause on button click
        playPauseButton.addEventListener('click', () => {
            isRunning = !isRunning;
            
            if (isRunning) {
                startTimer();
            } else {
                stopTimer();
            }
            
            updateButtonIcon();
        });

        // Reset timer on reset button click
        resetButton.addEventListener('click', () => {
            console.log('Reset button clicked');
            resetTimer();
        });

        // Initialize display and button
        updateDisplay();
        updateButtonIcon();
    });
})();
