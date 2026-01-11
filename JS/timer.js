// Simple 25-minute countdown timer
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const timerRoot = document.querySelector('.countdown-timer');
        if (!timerRoot) {
            return;
        }

        const timerDisplay = timerRoot.querySelector('.timer-display');
        if (!timerDisplay) {
            return;
        }

        let remainingSeconds = 25 * 60; // 25 minutes in seconds

        const formatTime = (totalSeconds) => {
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const seconds = (totalSeconds % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };

        const updateDisplay = () => {
            timerDisplay.textContent = formatTime(remainingSeconds);
        };

        updateDisplay();

        setInterval(() => {
            if (remainingSeconds > 0) {
                remainingSeconds -= 1;
                updateDisplay();
            }
        }, 1000);
    });
})();
