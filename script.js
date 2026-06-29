// Locate DOM layout elements by their specific ID attributes
const button = document.getElementById('colorBtn');
const colorText = document.getElementById('colorCode');
const likeButton = document.getElementById('likeBtn');
const likedPaletteContainer = document.getElementById('likedPalette');

// Initializing saved colors array by loading from localStorage , or creating an empty array if none exists
let savedColors = JSON.parse(localStorage.getItem('hexColorStudioPalette')) || [];

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

// Creating and displaying a bubble
function renderColorBubble(colorValue) {
    // Creating the main color circle container
    const colorBubble = document.createElement('div');
    colorBubble.className = 'palette-circle';
    colorBubble.style.backgroundColor = colorValue;
    colorBubble.title = colorValue; 

    // Creating the inner delete cross element
    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';

    // Click on a saved bubble to apply that background color again
    colorBubble.addEventListener('click', function() {
        document.body.style.backgroundColor = colorValue;
        colorText.textContent = colorValue;
    });

    // Core individual deletion logic
    deleteBtn.addEventListener('click', function(event) {
        /* 
           Crucial: Stop the click event from bubbling up to the colorBubble.
           Without this, clicking the 'X' would also trigger the bubble's click 
           and accidentally change the page background to the color that are being deleted!
        */
       event.stopPropagation();
       // Filter out this specific color code from the runtime array
       savedColors = savedColors.filter(function(color) {
        return color !== colorValue;
       });

       // Saving the freshly filtered, shortened array back to the hard drive
       localStorage.setItem('hexColorStudioPalette', JSON.stringify(savedColors));

       // Physically strip this element completely off the webpage DOM layout
       colorBubble.remove();
    });
    
    // Nest the delete button inside the bubble, then mount the bubble to the dashboard
    colorBubble.appendChild(deleteBtn);
    likedPaletteContainer.appendChild(colorBubble);
}

// Handle liking colors
likeButton.addEventListener('click', function() {
    const activeColor = colorText.textContent;

    // Check for duplicates before saving
    if (!savedColors.includes(activeColor)) {
        savedColors.push(activeColor); 
        
        // Save to the computer's hard drive
        localStorage.setItem('hexColorStudioPalette', JSON.stringify(savedColors));
        
        // Use reusable function to draw it on the screen
        renderColorBubble(activeColor);
    }
});


// Load and display previously saved colors when the page loads
savedColors.forEach(function(color) {
    renderColorBubble(color);
}) ;

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