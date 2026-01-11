// Handles ambient sound interactions for the AtmospherMix UI

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const rainCard = document.getElementById('sound1');
        if (!rainCard) {
            return;
        }
        /* Returns either the matching DOM node or null when no match exists. 
        If rainCard is 'falsy' the function exits early with return. 
        Defensive pattern that prevents subsequent code from dereferencing an undefined element and 
        throwing runtime errors, keeping the script resilient when markup and script fall out of sync. */

        const rainAudio = new Audio('Assets/sounds/Rain.mp3');
        /* instantiates the Web Audio Audio object with the Rain.mp3 file located under sounds. 
        The resulting rainAudio reference encapsulates browser-managed playback controls—play, pause, looping, current time, and volume,
        letting the script drive the ambient rain sound programmatically instead of relying on markup-based <audio> elements. */

        rainAudio.loop = true; // keeps ambience running once started

        const rainSlider = rainCard.querySelector('.sound-volume-slider');
        /* Searches inside rainCard for the first descendant element matching the 
        .sound-volume-slider selector and stores it in rainSlider. 
        By scoping the query to the card node rather than the entire document, the script 
        pairs each sound card with its own slider, even when multiple sliders exist on the page. */

        if (rainSlider) {
            rainAudio.volume = Number(rainSlider.value) / 100;
        /* Initializes the rainAudio volume based on the slider's current value, 
        converting from a 0-100 scale to 0.0-1.0. */

            rainSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                rainAudio.volume = sliderValue / 100;
            });
        /* Listens for input events on the slider to adjust the rainAudio volume in real-time 
        as the user moves the slider thumb. */

            rainSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        /* Prevents click events on the slider from bubbling up to the rainCard,
        which would inadvertently toggle playback when the user is just trying to adjust volume. */
        }

        const toggleRainSound = (event) => {
            if (event.target === rainSlider || event.target.closest('.sound-volume')) {
                return;
            }
            /* Ignores clicks on the slider or its container to avoid toggling playback 
            unintentionally. */

            if (rainAudio.paused) {
                rainAudio.currentTime = 0;
                rainAudio.play().catch((error) => {
                    console.error('Unable to play Rain.mp3', error);
                });
            } else {
                rainAudio.pause();
            }
            /* Toggles playback of the rain sound when the rainCard is clicked,
            resetting to the start if beginning playback again. 
            Catches and logs any playback errors */
        };
        /* Closing brace for toggleRainSound function */

        rainCard.addEventListener('click', toggleRainSound); 
        /* Binds the toggleRainSound function to click events on the rainCard,
        enabling user interaction to start and stop the ambient rain sound. */
    });
})();
