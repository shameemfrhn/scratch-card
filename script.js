const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");

// Initialize canvas with image overlay
const init = () => {
  const overlayImage = new Image();
  overlayImage.src = "sblogo.png"; // Replace with your image path or URL
  
  overlayImage.onload = () => {
    // Draw the image onto the canvas
    context.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
  };
};

// Detect if the device is touch-capable
const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

let mouseX = 0;
let mouseY = 0;
let isScratching = false;

// Calculate mouse/touch coordinates
const getCoordinates = (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = (isTouchDevice() ? event.touches[0].clientX : event.clientX) - rect.left;
  mouseY = (isTouchDevice() ? event.touches[0].clientY : event.clientY) - rect.top;
};

// Scratch function to reveal underlying content
const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, 25, 0, Math.PI * 2);
  context.fill();
};

// Event listeners for scratch functionality
canvas.addEventListener(isTouchDevice() ? "touchstart" : "mousedown", (event) => {
  isScratching = true;
  getCoordinates(event);
  scratch(mouseX, mouseY);
});

canvas.addEventListener(isTouchDevice() ? "touchmove" : "mousemove", (event) => {
  if (isScratching) {
    event.preventDefault(); // Prevent scrolling on touch devices
    getCoordinates(event);
    scratch(mouseX, mouseY);
  }
});

canvas.addEventListener(isTouchDevice() ? "touchend" : "mouseup", () => {
  isScratching = false;
});

canvas.addEventListener("mouseleave", () => {
  isScratching = false;
});

// Initialize the canvas overlay with the image when the window loads
window.onload = init;
