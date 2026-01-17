/* Saves favourite premixes of sounds to local storage.
   Allows users to save current sound mix settings and load them later. */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const mixCards = document.querySelectorAll('.mix-card');
        
        // Load saved premixes from localStorage on page load
        loadPremixes();

        // Add click event listeners to each mix card
        mixCards.forEach((card) => {
            card.addEventListener('click', handleMixCardClick);
        });

        function handleMixCardClick(event) {
            const card = event.currentTarget;
            const img = card.querySelector('img');
            
            // If card has a plus icon, allow saving a new premix
            if (img && img.src.includes('Plus.svg')) {
                createInputField(card);
            } else {
                // If card already has a saved premix, load it
                loadPremix(card.id);
            }
        }

        function createInputField(card) {
            // Clear the card content
            card.innerHTML = '';
            
            // Create input field for premix title
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'premix-input';
            input.placeholder = 'Mix name...';
            input.maxLength = 20;
            
            // Style the input
            input.style.border = 'none';
            input.style.background = 'transparent';
            input.style.textAlign = 'center';
            input.style.fontSize = '14px';
            input.style.fontFamily = 'inherit';
            input.style.outline = 'none';
            input.style.width = '90%';
            input.style.color = '#5D688C';
            
            card.appendChild(input);
            input.focus();
            
            // Save on Enter key or when input loses focus
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    savePremix(card, input.value.trim());
                }
            });
            
            input.addEventListener('blur', () => {
                const title = input.value.trim();
                if (title) {
                    savePremix(card, title);
                } else {
                    // Restore plus icon if no title entered
                    restorePlusIcon(card);
                }
            });
        }

        function savePremix(card, title) {
            if (!title) return;
            
            // Get current sound settings
            const soundCards = document.querySelectorAll('.sound-card');
            const soundSettings = [];
            
            soundCards.forEach((soundCard, index) => {
                const slider = soundCard.querySelector('.sound-volume-slider');
                const audio = window.allAudioInstances ? window.allAudioInstances[index] : null;
                
                soundSettings.push({
                    id: soundCard.id,
                    volume: slider ? slider.value : 50,
                    isPlaying: audio ? !audio.paused : false
                });
            });
            
            // Create premix object
            const premix = {
                id: card.id,
                title: title,
                sounds: soundSettings,
                timestamp: Date.now()
            };
            
            // Save to localStorage
            const premixes = getPremixesFromStorage();
            premixes[card.id] = premix;
            localStorage.setItem('atmosphereMixPremixes', JSON.stringify(premixes));
            
            // Update card display
            updateCardDisplay(card, title);
        }

        function updateCardDisplay(card, title) {
            card.innerHTML = '';
            
            const titleElement = document.createElement('div');
            titleElement.className = 'premix-title';
            titleElement.textContent = title;
            titleElement.style.fontSize = '14px';
            titleElement.style.fontWeight = '500';
            titleElement.style.color = '#5D688C';
            titleElement.style.textAlign = 'center';
            titleElement.style.fontFamily = 'inherit';
            titleElement.style.cursor = 'pointer';
            
            card.appendChild(titleElement);
        }

        function loadPremix(cardId) {
            const premixes = getPremixesFromStorage();
            const premix = premixes[cardId];
            
            if (!premix) return;
            
            // Stop all currently playing sounds
            if (window.allAudioInstances) {
                window.allAudioInstances.forEach(audio => audio.pause());
            }
            
            // Apply saved sound settings
            premix.sounds.forEach((soundSetting) => {
                const soundCard = document.getElementById(soundSetting.id);
                if (!soundCard) return;
                
                const slider = soundCard.querySelector('.sound-volume-slider');
                if (slider) {
                    slider.value = soundSetting.volume;
                    // Trigger input event to update audio volume
                    slider.dispatchEvent(new Event('input'));
                }
                
                // Play sound if it was playing when saved
                if (soundSetting.isPlaying) {
                    soundCard.click();
                }
            });
            
            console.log(`Loaded premix: ${premix.title}`);
        }

        function loadPremixes() {
            const premixes = getPremixesFromStorage();
            
            Object.keys(premixes).forEach((cardId) => {
                const card = document.getElementById(cardId);
                const premix = premixes[cardId];
                
                if (card && premix) {
                    updateCardDisplay(card, premix.title);
                }
            });
        }

        function restorePlusIcon(card) {
            card.innerHTML = '<img src="Assets/Plus.svg" alt="Mix card icon">';
        }

        function getPremixesFromStorage() {
            const stored = localStorage.getItem('atmosphereMixPremixes');
            return stored ? JSON.parse(stored) : {};
        }
        
        // Add context menu for deleting saved premixes (right-click or long-press)
        mixCards.forEach((card) => {
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const premixes = getPremixesFromStorage();
                
                if (premixes[card.id]) {
                    const confirmDelete = confirm(`Delete premix "${premixes[card.id].title}"?`);
                    if (confirmDelete) {
                        delete premixes[card.id];
                        localStorage.setItem('atmosphereMixPremixes', JSON.stringify(premixes));
                        restorePlusIcon(card);
                    }
                }
            });
        });
    });
})();
