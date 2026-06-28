# HexColor Studio 🎨✨

HexColor Studio is a sleek, lightweight, and highly interactive web application designed to generate random HEX color codes. Built using pure vanilla web technologies, this project provides a clean visual aesthetic paired with fun, engaging micro-interactions.

## 🚀 Features

- **Infinite Palette Generation**: Click the button to instantly transition the entire page background through over 16 million unique colors.
- **Robust HEX Engine**: Powered by mathematically precise color generation featuring zero-padding guards to prevent broken or invalid web colors.
- **One-Click Clipboard Sync**: Click directly on the displayed HEX code string to copy it immediately to your clipboard with temporary "Copied!" text feedback.
- **Dynamic Star Particles**: Star animation when clicking on HEX code to copy it. NEW FEATURE TODO: Experience a customized star explosion (`★`) effect bursting directly from your cursor position, dynamically matching the active HEX background color.
- **Modular Architecture**: Clean separation of concerns with isolated HTML structure, dedicated CSS layout styling, and modular JavaScript behavior.
- **Multi-Device Favicon Suite**: Favicon for browser. NEW FEATURE TODO Fully responsive favicon integration supporting modern desktop browsers and Apple iOS home-screen shortcuts.

## ⚙️ Technical Highlights: Asynchronous Clipboard API

Unlike older legacy web methods (like `document.execCommand`), this project implements the modern, promise-based **Asynchronous Clipboard API** (`navigator.clipboard.writeText`).

- **Non-blocking Execution**: Copy operations run asynchronously, ensuring the browser UI never freezes or stutters during interaction.
- **Promise Architecture**: Uses `.then()` and `.catch()` blocks for reliable success feedback handling and robust error logging.
- **Secure Integration**: Aligns with modern browser security standards, requiring active user gestures (clicks) to prevent unauthorized background script access.

## 🛠️ Built With

- **HTML5** - Semantic structure and page layout.
- **CSS3** - Smooth transitions, responsive styling, text-shadowing, and active pressing animations.
- **Vanilla JavaScript** - Core logic, asynchronous clipboard integration, and dynamic DOM manipulation (Particle Engine).

## 📂 Project Structure

```text
hexcolor-studio/
│
├── index.html            # Web page structure & asset mapping
├── style.css             # Layout alignment, tab icon configs, and animations
├── script.js             # Core math engine, copy triggers, and particle logic
└── favicon.ico           # Universal browser shortcut icon
```

## 💻 How to Run Locally

1. Clone or download this repository to your computer.
2. Open the folder in **VS Code**.
3. Install the **Live Server** extension (by Ritwick Dey) via the Extensions tab.
4. Right-click your `index.html` file and choose **"Open with Live Server"**.
