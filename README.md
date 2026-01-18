 # AtmospherMix

[GitHub Repository](https://github.com/RichieG78/atmosphermix.git)

## Website

**[View AtmospherMix Live](https://richieg78.github.io/atmosphermix/**)

---

## Project Goal
AtmospherMix is an interactive ambient sound mixer web application designed to help users create personalized soundscapes for focus, relaxation, or productivity. The application combines multiple ambient sounds (rain, thunder, ocean waves, fireplace, coffee shop ambiance, etc.) with a Pomodoro-style timer, allowing users to save and recall their favorite sound combinations.

The reason for creating a web application inspired by this design and service, was to focus on demonstrating as many different JavaScript interactions through a single page website design. AtmospherMix has no multi-page navigation, all of its features are on one single webpage, while containing multiple interactions to demonstrate all of the JavaScript requirements for this assessment including, DOM Manipulation, storing data in local storage and event listeners.

---

## 1. Project Conceptualization and Planning

### 1.1 Project Concept
AtmospherMix is an interactive ambient sound mixer web application inspired by platforms such as Noisli and myNoise. Its purpose is to allow users to create personalised soundscapes for focus, relaxation, or productivity by mixing multiple ambient sounds together and optionally using a Pomodoro-style timer.

- **9 Ambient Sound Tracks**: Rain, Thunder, Ocean Waves, Waterfall, Coffee Shop, Fireplace, Bird Song, White Noise, and Brown Noise
- **Individual Volume Control**: Each sound has its own volume slider for precise mixing
- **Global Volume Control**: Master volume with mute functionality accessible via hamburger menu on mobile
- **Pomodoro Timer**: 25-minute countdown timer with play/pause/stop and reset functionality
- **Premix Saving System**: Save up to 8 custom sound mixes with localStorage persistence
- **Carousel Navigation**: Browse through saved mixes using left/right arrow controls
- **Responsive Design**: Optimized layouts for desktop (>878px), tablet (768px-878px), and mobile (300px-768px)

The concept aligns with the assignment brief by:
- Focusing on **user-centred interactivity** rather than static content
- Demonstrating a clear, cohesive theme
- Solving a real-world use case (focus and relaxation tools)

### 1.2 Planning and Research
Before development, existing ambient sound applications were researched to analyse:
- Layout patterns (grid-based sound cards, central controls)
- Common features (volume sliders, presets, timers)
- UI simplicity and accessibility
- Websites studied included:

https://www.noisli.com/playlists

https://asoftmurmur.com/

https://mynoise.net/

This research directly influenced the decision to:
- Use a **single-page application (SPA)** structure
- Present sounds as **cards with icons and sliders**
- Include saved mixes (premixes) as a carousel

### 1.3 Sitemap and Wireframes
- A single main page was planned, containing all functionality see: Atmosherix_wireframes.pdf
- Wireframes were created for desktop, tablet, and mobile layouts
- Wireframes defined the placement of:
  - Header and navigation
  - Sound grid
  - Timer
  - Saved mix carousel
  - Hamburger menu on smaller screens

These wireframes guided the final HTML and CSS structure and ensured consistency throughout development.

---

## 2. HTML Structure and Content

### 2.1 Semantic HTML
AtmospherMix uses semantic HTML5 elements to structure content clearly:
- `<header>` for the app title, timer, and global controls
- `<nav>` for navigation and hamburger menu content
- `<main>` for the sound mixer and saved mixes
- `<footer>` for supporting content

This improves readability, accessibility, and maintainability.

### 2.2 Single Page Application Structure
The project is implemented as a **single-page application**, as permitted by the assignment. All interactive sections exist on one page and are shown or updated dynamically using JavaScript rather than page reloads.

### 2.3 Forms and Inputs
HTML form-related elements are used throughout the interface:
- `<input type="range">` elements for individual and global volume control
- A text input for naming saved mixes

These inputs are processed and validated using JavaScript, fulfilling the assignment requirement for form handling.

### 2.4 Accessibility Considerations
- Buttons use `<button>` elements rather than clickable `<div>`s
- ARIA labels are applied to interactive controls
- Alt text is included for icons and images

---

## 3. CSS Styling

### 3.1 Visual Design
CSS is used to create a clean, calming visual identity appropriate for an ambient sound application. This includes:
- A consistent colour palette
- Rounded cards and controls
- Clear visual feedback for active and inactive sounds

### 3.2 Layout Techniques
The project uses a combination of:
- **CSS Grid** for the main page layout and sound card grid
- **Flexbox** for alignment within cards, headers, and carousels

This demonstrates an understanding of modern layout systems.

### 3.3 Responsive Design
Media queries are used to adapt the layout for:
- Desktop
- Tablet
- Mobile

On smaller screens:
- A hamburger menu replaces the full header controls
- Elements such as the timer are repositioned dynamically

### 3.4 Custom UI Components
CSS is used to create and style:
- Custom range sliders
- Hamburger menu animation
- Carousel fade effects

These elements enhance usability and demonstrate attention to UI detail.

---

## 4. JavaScript Interactivity

### 4.1 Overview of Interactivity
JavaScript is central to AtmospherMix and is responsible for:
- Audio playback and mixing
- Timer functionality
- Saving and loading user presets
- Responsive behaviour linked to screen size

This satisfies the requirement to create a dynamic and engaging web project.

### 4.2 Event Handling and DOM Manipulation
The application uses extensive DOM manipulation, including:
- Creating and updating sound cards dynamically
- Toggling play/pause states with visual feedback
- Updating timer text in real time
- Showing and hiding menus and modals

Multiple event listeners respond to user actions such as clicks, input changes, and window resizing.

### 4.3 Audio Control
JavaScript manages multiple audio elements simultaneously:
- Each sound has its own audio instance
- Individual volume sliders adjust audio levels
- A global mute control affects all sounds

This demonstrates practical handling of multimedia through JavaScript.

### 4.4 Form Processing
At least one form interaction is processed using JavaScript:
- Users enter a title when saving a premix
- Input is validated before saving
- Feedback is provided through UI updates

### 4.5 Data Persistence with localStorage
The project uses `localStorage` to:
- Save user-created sound mixes
- Reload mixes on page refresh
- Allow users to delete saved mixes

This shows understanding of client-side data storage and CRUD operations.

---

## 5. Graphics and Interactivity

### 5.1 Graphics
The project includes multiple graphical elements:
- SVG icons for sounds and controls
- Visual indicators for active/inactive states
- Carousel navigation arrows

SVGs are used to ensure scalability and visual clarity.

### 5.2 Interactive Elements
Interactive components include:
- Sound cards with play/pause toggles
- Volume sliders
- Timer controls
- Saved mix carousel
- Hamburger menu

These elements go beyond the minimum interaction requirements and support a distinction-level submission.

---

## 6. Version Control and Hosting

### 6.1 GitHub Version Control
The project is managed using Git and GitHub:
- Regular commits track development progress
- Clear file structure separates HTML, CSS, JavaScript, and assets

This demonstrates understanding of version control concepts.

### 6.2 GitHub Pages Hosting
AtmospherMix is hosted using **GitHub Pages**, fulfilling the assignment requirement that the project be publicly accessible via a URL.

The hosted version reflects the same functionality as the local development version.

---

## 7. Distinction-Level Features Summary

AtmospherMix meets distinction criteria by:
- Demonstrating strong planning through research and wireframes
- Using semantic HTML and responsive CSS effectively
- Implementing complex JavaScript functionality without frameworks
- Managing audio, timers, storage, and UI state
- Providing multiple interactive and graphical elements
- Using GitHub for version control and hosting

---

## 8. Challenges Faced

The main challenge for AtmospherMix was first coming up with a concept that suitably addressed all the required interactions for the assessment. I wanted to ensure I build a website that did not have a complicated site map to cover all of the required interactions. This is why I chose a web application inspired by focus and relaxation services such as Noisli and A Soft Murmur.

Writng JavaScript was the next challenge. Having similar websites to reference helped me to figure out the types of interactions I needed to develop in JavaScript code. I was particularly challenged when creating the Hamburger menu, as I designed the web application in desktop format first and later added the Media Queries for mobile and tablet sizes, this broke a lot of the layout and functionality, particularly the timer, as I had to move this feature from the Header into the Hamburger menu. It took me many iterations to fix it. My learning from this is to start with Mobile design first and then extend the screen sizes later - designing the smaller screen sizes first is much harder, but I feel it would be easier to then adjust the CSS for desktop after it worked in Mobile.


## 9. Conclusion

I am satisified that the design covers all of the required interactions for the assessment and more to merit a distinction level submission.
