// Locate DOM layout elements by their specific ID attributes
const button = document.getElementById('colorBtn');
const colorText = document.getElementById('colorCode');

/**
 * Generates a completely random 6-character HEX color code.
 * Safe-guarded with padStart to prevent invalid shorter string codes.
 */
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// 1. Event listener to update background layout color on button click
button.addEventListener('click', function() {
    const randomColor = generateRandomColor();
    document.body.style.backgroundColor = randomColor;
    colorText.textContent = randomColor;
});

// 2. Event listener for HEX text click: Copies value and runs particle explosion
colorText.addEventListener('click', function(event) {
    const currentHex = colorText.textContent;

    // Use Clipboard API to save text to user's device memory
    navigator.clipboard.writeText(currentHex).then(function() {
        colorText.textContent = "Copied!";
        
        // Revert text string back to the actual HEX code value after 1 second
        setTimeout(function() {
            colorText.textContent = currentHex;
        }, 1000);
    });

    // Run star visual engine matching precise mouse coordinate positions
    createStarExplosion(event.clientX, event.clientY);
});

/**
 * Spawns multiple star particles that shoot outwards from the mouse position
 */
function createStarExplosion(x, y) {
    const numberOfStars = 10; // Total count of star elements spawned per click

    for (let i = 0; i < numberOfStars; i++) {
        // Build a fresh DOM div element container for individual star
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '⭐'; // Text target symbol inside the node ✨

        // Align starting point directly beneath mouse pointer tip
        star.style.left = `${x - 12}px`; 
        star.style.top = `${y - 12}px`;

        document.body.appendChild(star);

        // Compute completely randomized vectors for shooting distribution math (360 degrees)
        const angle = Math.random() * Math.PI * 2; // Random edge in radiants
        const distance = 50 + Math.random() * 100; // Total distance length vector between 50px-150px
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        // Generate dynamic sizes for star variety variance scaling
        const randomScale = 0.5 + Math.random() * 1;

        // Trigger smooth standard CSS transition transforms inside next render frame loop
        requestAnimationFrame(() => {
            star.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${randomScale}) rotate(${Math.random() * 360}deg)`;
            star.style.opacity = '0';
        });

        // Completely clean up and remove the node from system memory to save performance
        setTimeout(() => {
            star.remove();
        }, 800);
    }
}