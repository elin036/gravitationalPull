const wave = document.getElementById('wave');
const moon = document.getElementById('moon');
const earth = document.getElementById('earth');
const ring = document.getElementById('ring');

let isMoving = false;
let angle = Math.PI;
let sunNarration = false;
let sunIsVisible = false;
let hasRing = true;

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * window.innerHeight}px`;
  star.style.left = `${Math.random() * window.innerWidth}px`;
  document.body.appendChild(star);
}

for (let i = 0; i < 150; i++) {
  createStar();
}

// Set inital position
document.addEventListener('DOMContentLoaded', () => {
  const hoverItems = document.querySelectorAll('.hover-item');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  hoverItems.forEach(item => {
    item.addEventListener('mouseover', (e) => {
      tooltip.innerText = item.getAttribute('data-name');
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.pageX + 20}px`;
      tooltip.style.top = `${e.pageY - 20}px`;
    });

    item.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.pageX + 20}px`;
      tooltip.style.top = `${e.pageY - 20}px`;
    });

    item.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });
  });
});

window.addEventListener('resize', () => {
  window.location.reload();
});

// Text narration
function readText(textBox, narrationText) {
  const fullText = narrationText.innerText;

  // Split into chunks using . or ;
  const texts = fullText.match(/[^\.;]+[\.;]+/g) || [fullText]; 
  narrationText.innerText = texts[0].trim();

  let currentTextIndex = 0;

  // Voice of the narration
  function speakText(text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
      return speech;
  }

  function narrateNextText() {
    if (currentTextIndex < texts.length) {
        narrationText.innerText = texts[currentTextIndex].trim();
        const speech = speakText(texts[currentTextIndex].trim());
        
        speech.onend = function() {
            currentTextIndex++;
            narrateNextText();
        };
    } 
    else {
        textBox.style.display = 'none';
    }
  }

  //1000 ms = 1 seconds
  setTimeout(() => {
      narrateNextText();
  }, 1500);
}

// Click arrow for sun to appear
document.getElementById('sun-btn').addEventListener('click', function() {
  this.style.display = 'none';
  this.style.opacity = '0';

  sunIsVisible = true;
  const sunWave = document.querySelector('#sun-wave');
  sunWave.style.display = "block";

  const hiddenSun = document.getElementById('hidden-sun');
  hiddenSun.style.opacity = '1';
  hiddenSun.style.visibility = 'visible';

  const sun = document.getElementById('sun');
  sun.classList.remove('slide-out');
  sun.classList.add('slide-in');

  // Only narrate once
  if (!sunNarration) {
    // Stop any on going speech
    window.speechSynthesis.cancel();
    const firstTextBox = document.getElementsByClassName('text-box')[0];
    firstTextBox.style.display = 'none';

    const narrationText = document.getElementsByClassName('narration-text')[1];
    const textBox = document.getElementsByClassName('text-box')[1];
    readText(textBox, narrationText);
    
    sunNarration = true;
  }


});

// Click sun for sun to disappear and arrow to appear
document.getElementById('sun').addEventListener('click', function() {
  this.classList.remove('slide-in');
  this.classList.add('slide-out');
  sunIsVisible = false;
  const sunWave = document.querySelector('#sun-wave');
  sunWave.style.display = "none";

  const sunBtn = document.getElementById('sun-btn');
  
  window.speechSynthesis.cancel();
  const secondTextBox = document.getElementsByClassName('text-box')[1];
  secondTextBox.style.display = 'none';

  setTimeout(function() {
    sunBtn.style.display = 'block'; 
    setTimeout(function() {
      sunBtn.style.opacity = '1';
    }, 10);
  });
});


document.getElementById('start-btn').addEventListener('click', function(event) {
  this.style.display = 'none'; // Hide the ring

  // Check screen width and set hasRing accordingly
  if (window.innerWidth <= 600) {
    hasRing = false; // Set hasRing to false for mobile screens
  }

  // In case the moon is clicked
  event.stopPropagation();
  document.getElementById('earth-image').classList.add('shrinking');

  const hiddenElement = document.getElementById('hidden');
  hiddenElement.style.visibility = 'visible';
  hiddenElement.classList.add('fade-in');

  if (hasRing) {
    positionMoonOnRing(angle);
  }

  if (!sunIsVisible) {
    const sunWave = document.querySelector('#sun-wave');
    sunWave.style.display = "none";
  }

  const narrationText = document.getElementsByClassName('narration-text')[0];
  const textBox = document.getElementsByClassName('text-box')[0];
  readText(textBox, narrationText);
});


// If moon is clicked
document.addEventListener('click', (event) => {
  const MoonPos = moon.getBoundingClientRect();
  if (
    event.clientX >= MoonPos.left &&
    event.clientX <= MoonPos.right &&
    event.clientY >= MoonPos.top &&
    event.clientY <= MoonPos.bottom
  ) {
    isMoving = !isMoving;
  }
});

// Moving the mouse
document.addEventListener('mousemove', (event) => {
  if (isMoving) {
    if (hasRing) {
      const ringPos = ring.getBoundingClientRect();
      const ringRadius = ringPos.width / 2;

      const earthCenterX = ringPos.left + ringRadius;
      const earthCenterY = ringPos.top + ringRadius;

      // Calculate the angle between mouse and Earth's center
      const deltaX = event.pageX - earthCenterX;
      const deltaY = event.pageY - earthCenterY;
      // Convert to radians
      angle = Math.atan2(deltaY, deltaX);

      positionMoonOnRing(angle);
    } 
    else {
      moveMoon(event.pageX, event.pageY);
    }
  }
});

// Doesn't have ring
function moveMoon(mouseX, mouseY) {
  // Moon centered around mouse
  moon.style.left = `${mouseX - moon.offsetWidth / 2}px`;
  moon.style.top = `${mouseY - moon.offsetHeight / 2}px`;

  const earthPos = earth.getBoundingClientRect();
  const earthCenterX = earthPos.left + earthPos.width / 2;
  const earthCenterY = earthPos.top + earthPos.height / 2;

  adjustWave(earthCenterX, earthCenterY, mouseX, mouseY);
}

// Has ring
function positionMoonOnRing(angle) {

  const ringPos = ring.getBoundingClientRect();
  const ringRadius = ringPos.width / 2;

  const earthCenterX = ringPos.left + ringRadius;
  const earthCenterY = ringPos.top + ringRadius;

  const moonX = earthCenterX + ringRadius * Math.cos(angle);
  const moonY = earthCenterY + ringRadius * Math.sin(angle);

  moon.style.left = `${moonX - moon.offsetWidth / 2}px`;
  moon.style.top = `${moonY - moon.offsetHeight / 2}px`;

  adjustWave(earthCenterX, earthCenterY, moonX, moonY);
  
}

function adjustWave(earthCenterX, earthCenterY, moonX, moonY) {
  // Get the screen width to determine responsiveness
  const screenWidth = window.innerWidth;

  // Set responsive values based on screen size
  let maxDistance, minDistance, maxWaveWidth, minWaveWidth;

  if (screenWidth <= 1440) {
    maxDistance = 400;
    minDistance = 100;
    maxWaveWidth = 325;
    minWaveWidth = 200;
  } 
  else {
    maxDistance = 600;
    minDistance = 200;
    maxWaveWidth = 350;
    minWaveWidth = 200;
  }

  const distanceX = moonX - earthCenterX;
  const distanceY = moonY - earthCenterY;
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  const waveWidth = Math.max(minWaveWidth, maxWaveWidth - (distance / maxDistance) * (maxWaveWidth - minWaveWidth));

  wave.style.width = `${waveWidth}px`;
  wave.style.height = `200px`;

  // Makes sure it follows the moonS
  const angleDeg = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
  wave.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
}

/*


*/







