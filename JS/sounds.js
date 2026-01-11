// Handles ambient sound interactions for the AtmospherMix UI
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const rainCard = document.getElementById('sound1');
        if (!rainCard) {
            return;
        }

        const rainAudio = new Audio('Assets/sounds/Rain.mp3');
        rainAudio.loop = true; // keep the ambience running once started

        const rainSlider = rainCard.querySelector('.sound-volume-slider');

        if (rainSlider) {
            rainAudio.volume = Number(rainSlider.value) / 100;

            rainSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                rainAudio.volume = sliderValue / 100;
            });

            rainSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleRainSound = (event) => {
            if (event.target === rainSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (rainAudio.paused) {
                rainAudio.currentTime = 0;
                rainAudio.play().catch((error) => {
                    console.error('Unable to play Rain.mp3', error);
                });
            } else {
                rainAudio.pause();
            }
        };

        rainCard.addEventListener('click', toggleRainSound);

        const thunderCard = document.getElementById('sound2');
        if (!thunderCard) {
            return;
        }

        const thunderAudio = new Audio('Assets/sounds/Thunder.mp3');
        thunderAudio.loop = true;

        const thunderSlider = thunderCard.querySelector('.sound-volume-slider');

        if (thunderSlider) {
            thunderAudio.volume = Number(thunderSlider.value) / 100;

            thunderSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                thunderAudio.volume = sliderValue / 100;
            });

            thunderSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleThunderSound = (event) => {
            if (event.target === thunderSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (thunderAudio.paused) {
                thunderAudio.currentTime = 0;
                thunderAudio.play().catch((error) => {
                    console.error('Unable to play Thunder.mp3', error);
                });
            } else {
                thunderAudio.pause();
            }
        };

        thunderCard.addEventListener('click', toggleThunderSound);
    });
})();
