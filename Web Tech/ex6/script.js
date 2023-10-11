const carElement = document.getElementById('car');
const pillarElement = document.getElementById('pillar');
const splashBox = document.getElementById('splashBox');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

let carPosition = 10; // Initial position of the car
let carInterval;

function moveCar() {
  carPosition += 5; // Move the car by 5 pixels
  carElement.style.left = carPosition + 'px';

  // Check if the car reaches the pillar
  if (carPosition + carElement.clientWidth >= pillarElement.offsetLeft) {
    clearInterval(carInterval); // Stop the movement
    splashBox.style.display = 'block'; // Show the splash box
  }

  // Check if the car goes beyond the window width
  if (carPosition > window.innerWidth) {
    clearInterval(carInterval); // Stop the movement
  }
}

startButton.addEventListener('click', () => {
  carInterval = setInterval(moveCar, 100); // Move the car every 100 milliseconds
  splashBox.style.display = 'none'; // Hide the splash box
});

stopButton.addEventListener('click', () => {
  clearInterval(carInterval); // Stop the movement
});

resetButton.addEventListener('click', () => {
  clearInterval(carInterval); // Stop the movement
  carPosition = 10; // Reset car position
  carElement.style.left = carPosition + 'px'; // Set initial position
  splashBox.style.display = 'none'; // Hide the splash box
});
