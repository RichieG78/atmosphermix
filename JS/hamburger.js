// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const volumeControl = document.querySelector('.global-volume-control');
        const timerSection = document.querySelector('.timer-section');
    const header = document.querySelector('header');

    // Use matchMedia to match CSS breakpoint exactly
    const mobileQuery = window.matchMedia('(max-width: 878px)');

    function moveTimerToMenu() {
        if (mobileQuery.matches && timerSection && volumeControl) {
            // Move timer into menu for mobile
            if (!volumeControl.contains(timerSection)) {
                volumeControl.insertBefore(timerSection, volumeControl.firstChild);
            }
        } else if (!mobileQuery.matches && timerSection && header && hamburgerMenu) {
            // Move timer back to header for desktop (after hamburger menu)
            if (volumeControl.contains(timerSection)) {
                hamburgerMenu.insertAdjacentElement('afterend', timerSection);
            }
        }
    }

    // Move timer on page load
    moveTimerToMenu();

    // Move timer on window resize using matchMedia listener
    mobileQuery.addListener(moveTimerToMenu);
    // Also keep regular resize listener for older browsers
    window.addEventListener('resize', moveTimerToMenu);

    if (hamburgerMenu && volumeControl) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            volumeControl.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = volumeControl.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);

            if (!isClickInsideMenu && !isClickOnHamburger && volumeControl.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                volumeControl.classList.remove('active');
            }
        });
    }
});
