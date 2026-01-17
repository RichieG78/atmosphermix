/* Saves favourite premixes of sounds to local storage.
   Allows users to save current sound mix settings and load them later. */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const mixCards = document.querySelectorAll('.mix-card');
        const mixCardSection = document.querySelector('.mix-card-section');
        const cardButtons = new Map(); // Track buttons for each card
        let activePremixId = null; // Track which premix is currently playing
        let currentScrollIndex = 0; // Track current position in carousel
        const cardsPerView = 4; // Number of cards visible at once
        const totalCards = mixCards.length;
        
        // Wrap each card in a container div for vertical layout
        mixCards.forEach((card) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'mix-card-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.alignItems = 'center';
            wrapper.style.flexShrink = '0';
            card.parentNode.insertBefore(wrapper, card);
            wrapper.appendChild(card);
        });
        
        // Load saved premixes from localStorage on page load
        loadPremixes();

        // Add click event listeners to each mix card
        mixCards.forEach((card) => {
            card.addEventListener('click', handleMixCardClick);
        });

        // Arrow navigation for carousel
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                if (currentScrollIndex > 0) {
                    currentScrollIndex--;
                    scrollToIndex(currentScrollIndex);
                }
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                if (currentScrollIndex < totalCards - cardsPerView) {
                    currentScrollIndex++;
                    scrollToIndex(currentScrollIndex);
                }
            });
        }

        function scrollToIndex(index) {
            const wrappers = document.querySelectorAll('.mix-card-wrapper');
            if (wrappers[index]) {
                // Calculate scroll position based on card width + gap
                const cardWidth = 120; // width of mix-card
                const gap = 20; // gap between cards
                const scrollPosition = index * (cardWidth + gap);
                
                mixCardSection.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }

        function handleMixCardClick(event) {
            const card = event.currentTarget;
            const img = card.querySelector('img');
            
            // If card has a plus icon, allow saving a new premix
            if (img && img.src.includes('Plus.svg')) {
                createInputField(card);
            } else {
                // If card already has a saved premix, toggle play/stop
                if (activePremixId === card.id) {
                    // Stop the currently playing premix
                    stopAllSounds();
                    activePremixId = null;
                } else {
                    // Load and play the premix
                    loadPremix(card.id);
                    activePremixId = card.id;
                }
            }
        }

        function stopAllSounds() {
            if (window.allAudioInstances) {
                window.allAudioInstances.forEach(audio => audio.pause());
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
            input.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', 'ヒラギノ丸ゴ Pro', 'Rounded M+ 1c', 'Rounded Mplus 1c', 'UD デジタル 教科書体 NK-R', 'UD Digital 教科書体 NK-R', 'Noto Sans CJK JP', 'Noto Sans Japanese', sans-serif";
            input.style.outline = 'none';
            input.style.width = '90%';
            input.style.color = '#5D688C';
            
            card.appendChild(input);
            input.focus();
            
            // Create and show Save button
            createSaveButton(card, input);
            
            // Save on Enter key
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const title = input.value.trim();
                    if (title) {
                        savePremix(card, title);
                    }
                }
            });
            
            // Prevent blur from immediately restoring plus icon
            input.addEventListener('blur', (e) => {
                // Only restore if clicking outside both input and save button
                setTimeout(() => {
                    const button = cardButtons.get(card.id);
                    if (!input.parentElement && !button) {
                        restorePlusIcon(card);
                    }
                }, 100);
            });
        }

        function createSaveButton(card, input) {
            // Remove any existing button for this card
            const existingButton = cardButtons.get(card.id);
            if (existingButton) {
                existingButton.remove();
            }
            
            // Create Save button
            const saveButton = document.createElement('button');
            saveButton.className = 'premix-action-button';
            saveButton.textContent = 'Save';
            saveButton.type = 'button';
            
            // Style like reset and mute buttons
            saveButton.style.padding = '4px 8px';
            saveButton.style.border = 'none';
            saveButton.style.borderRadius = '10px';
            saveButton.style.backgroundColor = '#F2B9AC';
            saveButton.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', 'ヒラギノ丸ゴ Pro', 'Rounded M+ 1c', 'Rounded Mplus 1c', 'UD デジタル 教科書体 NK-R', 'UD Digital 教科書体 NK-R', 'Noto Sans CJK JP', 'Noto Sans Japanese', sans-serif";
            saveButton.style.fontWeight = '500';
            saveButton.style.cursor = 'pointer';
            saveButton.style.marginTop = '5px';
            
            // Store reference to card
            saveButton.dataset.cardId = card.id;
            
            // Save button click handler
            saveButton.addEventListener('click', () => {
                const title = input.value.trim();
                if (title) {
                    savePremix(card, title);
                    // Change button to Clear
                    saveButton.textContent = 'Clear';
                    saveButton.onclick = () => showClearPrompt(card, saveButton);
                }
            });
            
            // Insert button directly underneath the card in the wrapper
            const wrapper = card.parentElement;
            wrapper.appendChild(saveButton);
            cardButtons.set(card.id, saveButton);
        }

        function showClearPrompt(card, button) {
            const premixes = getPremixesFromStorage();
            const premix = premixes[card.id];
            
            if (!premix) return;
            
            // Create custom modal prompt
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '1000';
            
            const modal = document.createElement('div');
            modal.style.backgroundColor = '#F2B9AC';
            modal.style.borderRadius = '20px';
            modal.style.padding = '30px';
            modal.style.maxWidth = '400px';
            modal.style.textAlign = 'center';
            modal.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            
            const message = document.createElement('p');
            message.textContent = `Are you sure you want to delete "${premix.title}"?`;
            message.style.marginBottom = '20px';
            message.style.color = '#5D688C';
            message.style.fontSize = '16px';
            message.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', sans-serif";
            
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.justifyContent = 'center';
            
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.style.padding = '8px 20px';
            cancelButton.style.border = 'none';
            cancelButton.style.borderRadius = '20px';
            cancelButton.style.backgroundColor = '#fff';
            cancelButton.style.color = '#5D688C';
            cancelButton.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', sans-serif";
            cancelButton.style.fontWeight = '500';
            cancelButton.style.cursor = 'pointer';
            
            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.style.padding = '8px 20px';
            yesButton.style.border = 'none';
            yesButton.style.borderRadius = '20px';
            yesButton.style.backgroundColor = '#5D688C';
            yesButton.style.color = '#fff';
            yesButton.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', sans-serif";
            yesButton.style.fontWeight = '500';
            yesButton.style.cursor = 'pointer';
            
            // Cancel handler
            cancelButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            
            // Yes handler - delete the premix
            yesButton.addEventListener('click', () => {
                delete premixes[card.id];
                localStorage.setItem('atmosphereMixPremixes', JSON.stringify(premixes));
                restorePlusIcon(card);
                
                // Remove button
                if (button) {
                    button.remove();
                    cardButtons.delete(card.id);
                }
                
                document.body.removeChild(overlay);
            });
            
            buttonContainer.appendChild(cancelButton);
            buttonContainer.appendChild(yesButton);
            modal.appendChild(message);
            modal.appendChild(buttonContainer);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
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
            titleElement.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', sans-serif";
            titleElement.style.cursor = 'pointer';
            
            card.appendChild(titleElement);
            
            // Create or update Clear button for this card
            createClearButton(card);
        }

        function createClearButton(card) {
            // Remove existing button if any
            const existingButton = cardButtons.get(card.id);
            if (existingButton) {
                existingButton.remove();
            }
            
            // Create Clear button
            const clearButton = document.createElement('button');
            clearButton.className = 'premix-action-button';
            clearButton.textContent = 'Clear';
            clearButton.type = 'button';
            
            // Style like reset and mute buttons
            clearButton.style.padding = '4px 8px';
            clearButton.style.border = 'none';
            clearButton.style.borderRadius = '10px';
            clearButton.style.backgroundColor = '#F2B9AC';
            clearButton.style.fontFamily = "'ヒラギノ丸ゴ ProN', 'Hiragino Maru Gothic Pro', 'ヒラギノ丸ゴ Pro', 'Rounded M+ 1c', 'Rounded Mplus 1c', 'UD デジタル 教科書体 NK-R', 'UD Digital 教科書体 NK-R', 'Noto Sans CJK JP', 'Noto Sans Japanese', sans-serif";
            clearButton.style.fontWeight = '500';
            clearButton.style.cursor = 'pointer';
            clearButton.style.marginTop = '5px';
            
            // Store reference to card
            clearButton.dataset.cardId = card.id;
            
            // Clear button click handler
            clearButton.onclick = () => showClearPrompt(card, clearButton);
            
            // Insert button directly underneath the card in the wrapper
            const wrapper = card.parentElement;
            wrapper.appendChild(clearButton);
            cardButtons.set(card.id, clearButton);
        }

        function loadPremix(cardId) {
            const premixes = getPremixesFromStorage();
            const premix = premixes[cardId];
            
            if (!premix) return;
            
            // Stop all currently playing sounds
            stopAllSounds();
            
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
            
            // Remove button for this card if it exists
            const button = cardButtons.get(card.id);
            if (button) {
                button.remove();
                cardButtons.delete(card.id);
            }
        }

        function getPremixesFromStorage() {
            const stored = localStorage.getItem('atmosphereMixPremixes');
            return stored ? JSON.parse(stored) : {};
        }
    });
})();
