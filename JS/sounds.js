/* Handles ambient sound interactions and global volume control for the AtmospherMix UI.
    Loads and plays ambient sound files (Rain, Thunder, Ocean) when their respective cards are clicked,,
    allows volume adjustment via sliders within each sound card and a slider and mute button for global control. */


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


        /* Repeat similar logic for all the other sound cards below */

        /* Creates the toggle on and off for the Thunder sound */
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

/* Creates the toggle on and off and volume slider for the Ocean Waves sound */
    const oceanCard = document.getElementById('sound3');
        if (!oceanCard) {
            return;
        }

        const oceanAudio = new Audio('Assets/sounds/Ocean.mp3');
        oceanAudio.loop = true;

        const oceanSlider = oceanCard.querySelector('.sound-volume-slider');

        if (oceanSlider) {
            oceanAudio.volume = Number(oceanSlider.value) / 100;

            oceanSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                oceanAudio.volume = sliderValue / 100;
            });

            oceanSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleOceanSound = (event) => {
            if (event.target === oceanSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (oceanAudio.paused) {
                oceanAudio.currentTime = 0;
                oceanAudio.play().catch((error) => {
                    console.error('Unable to play Ocean.mp3', error);
                });
            } else {
                oceanAudio.pause();
            }
        };

    oceanCard.addEventListener('click', toggleOceanSound);

    /* Creates the toggle on and off and volume slider for the Waterfall sound */
    const waterfallCard = document.getElementById('sound4');
        if (!waterfallCard) {
            return;
        }

        const waterfallAudio = new Audio('Assets/sounds/Waterfall.mp3');
        waterfallAudio.loop = true;

        const waterfallSlider = waterfallCard.querySelector('.sound-volume-slider');

        if (waterfallSlider) {
            waterfallAudio.volume = Number(waterfallSlider.value) / 100;

            waterfallSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                waterfallAudio.volume = sliderValue / 100;
            });

            waterfallSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleWaterfallSound = (event) => {
            if (event.target === waterfallSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (waterfallAudio.paused) {
                waterfallAudio.currentTime = 0;
                waterfallAudio.play().catch((error) => {
                    console.error('Unable to play Waterfall.mp3', error);
                });
            } else {
                waterfallAudio.pause();
            }
        };

        waterfallCard.addEventListener('click', toggleWaterfallSound);

/* Creates the toggle on and off and volume slider for the Cafe Environment sound */
    const cafeCard = document.getElementById('sound5');
        if (!cafeCard) {
            return;
        }
        
        const cafeAudio = new Audio('Assets/sounds/CoffeeShop.mp3');
        cafeAudio.loop = true;

        const cafeSlider = cafeCard.querySelector('.sound-volume-slider');
        
        if (cafeSlider) {
            cafeAudio.volume = Number(cafeSlider.value) / 100;

            cafeSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                cafeAudio.volume = sliderValue / 100;
            });

            cafeSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleCafeSound = (event) => {
            if (event.target === cafeSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (cafeAudio.paused) {
                cafeAudio.currentTime = 0;
                cafeAudio.play().catch((error) => {
                    console.error('Unable to play CoffeeShop.mp3', error);
                });
            } else {
                cafeAudio.pause();
            }
        };

        cafeCard.addEventListener('click', toggleCafeSound);

/* Creates the toggle on and off and volume slider for the Fireplace sound */
    const fireplaceCard = document.getElementById('sound6');    
        if (!fireplaceCard) {
            return;
        }

        const fireplaceAudio = new Audio('Assets/sounds/Fireplace.mp3');
        fireplaceAudio.loop = true;

        const fireplaceSlider = fireplaceCard.querySelector('.sound-volume-slider');

        if (fireplaceSlider) {
            fireplaceAudio.volume = Number(fireplaceSlider.value) / 100;

            fireplaceSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                fireplaceAudio.volume = sliderValue / 100;
            });

            fireplaceSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleFireplaceSound = (event) => {
            if (event.target === fireplaceSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (fireplaceAudio.paused) {
                fireplaceAudio.currentTime = 0;
                fireplaceAudio.play().catch((error) => {
                    console.error('Unable to play Fireplace.mp3', error);
                });
            } else {
                fireplaceAudio.pause();
            }
        };
        
        fireplaceCard.addEventListener('click', toggleFireplaceSound);

/* Creates the toggle on and off and volume slider for the Bird Song sound */
    const birdCard = document.getElementById('sound7');    
        if (!birdCard) {
            return;
        }

        const birdAudio = new Audio('Assets/sounds/BirdSong.mp3');
        birdAudio.loop = true;

        const birdSlider = birdCard.querySelector('.sound-volume-slider');

        if (birdSlider) {
            birdAudio.volume = Number(birdSlider.value) / 100;

            birdSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                birdAudio.volume = sliderValue / 100;
            });

            birdSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleBirdSound = (event) => {
            if (event.target === birdSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (birdAudio.paused) {
                birdAudio.currentTime = 0;
                birdAudio.play().catch((error) => {
                    console.error('Unable to play BirdSong.mp3', error);
                });
            } else {
                birdAudio.pause();
            }
        };
        
        birdCard.addEventListener('click', toggleBirdSound);

/* Creates the toggle on and off and volume slider for the White Noise sound */
    const whiteNoiseCard = document.getElementById('sound8');    
        if (!whiteNoiseCard) {
            return;
        }

        const whiteNoiseAudio = new Audio('Assets/sounds/WhiteNoise.mp3');
        whiteNoiseAudio.loop = true;

        const whiteNoiseSlider = whiteNoiseCard.querySelector('.sound-volume-slider');

        if (whiteNoiseSlider) {
            whiteNoiseAudio.volume = Number(whiteNoiseSlider.value) / 100;

            whiteNoiseSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                whiteNoiseAudio.volume = sliderValue / 100;
            });

            whiteNoiseSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleWhiteNoiseSound = (event) => {
            if (event.target === whiteNoiseSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (whiteNoiseAudio.paused) {
                whiteNoiseAudio.currentTime = 0;
                whiteNoiseAudio.play().catch((error) => {
                    console.error('Unable to play WhiteNoise.mp3', error);
                });
            } else {
                whiteNoiseAudio.pause();
            }
        };
        
        whiteNoiseCard.addEventListener('click', toggleWhiteNoiseSound);    

/* Creates the toggle on and off and volume slider for the Brown Noise sound */
    const brownNoiseCard = document.getElementById('sound9');    
        if (!brownNoiseCard) {
            return;
        }

        const brownNoiseAudio = new Audio('Assets/sounds/BrownNoise.mp3');
        brownNoiseAudio.loop = true;

        const brownNoiseSlider = brownNoiseCard.querySelector('.sound-volume-slider');

        if (brownNoiseSlider) {
            brownNoiseAudio.volume = Number(brownNoiseSlider.value) / 100;

            brownNoiseSlider.addEventListener('input', (event) => {
                const sliderValue = Number(event.target.value);
                brownNoiseAudio.volume = sliderValue / 100;
            });

            brownNoiseSlider.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        const toggleBrownNoiseSound = (event) => {
            if (event.target === brownNoiseSlider || event.target.closest('.sound-volume')) {
                return;
            }
            if (brownNoiseAudio.paused) {
                brownNoiseAudio.currentTime = 0;
                brownNoiseAudio.play().catch((error) => {
                    console.error('Unable to play BrownNoise.mp3', error);
                });
            } else {
                brownNoiseAudio.pause();
            }
        };
        
        brownNoiseCard.addEventListener('click', toggleBrownNoiseSound);
    });
})();
