## Project Overview
This is a Gravitational Pull Visualization project. This interactive websit demonstrates the gravitational influence of the Moon on Earth's water bodies, showcasing how this pull creates tidal waves. Users can toggle the moon and observe fluctuations in the wave, providing a visual understanding of gravitational forces in action. Additionally, users can toggle the sun to see how it further affects the tides, completing the demonstration of how the sun and moon influences the Earth's tides.

## Figma Design
Link: https://www.figma.com/design/f3kxPi217ZALxlRspqFBRo/Untitled?node-id=0-1&t=PzD2EKgRdBGVil0N-1

The design process began with researching scientific photos and diagrams of tidal waves and gravitational forces to create an accurate and educational layout. Using Figma, the layout was planned to mimic these visuals adding on elements like the interactive buttons and narrative speech.

## Features
    - Animations: I implemented two keyframes shrink and fadeIn. shrink and fadeIn was used at the beginning when the start button is clicked it shrinks the earth image and turns the opacity to 1. I also used three transition. One on the property left on the sun element to help it slide in and out of the screen. The other two on the two waves (moon-wave, and sun-wave) for a smoother change in width and height.
    - Sound Effects: I used speech synthesis to read my text and this let's the user listen to the information instead of reading. It also adds an extra layer of immersion because when you toggle the sun and you hear the audio cue it makes it feel responsive.
    - User-triggered Events: When the user hovers buttons it creates a drop shadow and by clicking the button it either gives you can audio cue or takes you to the info page. User can also over elements and it will show you the name of the element (ex. moon, sun, moon wave, etc). Additionally the user can also freely toggle and move the moon which allows them to visually see what's going on because the moon wave will always face the moonn.
    - Responsive Design: Depending on the screen size the page will move around the buttons. On a larger screen the buttons will be on the left and right but on a smaller screen the buttons will be moved to the top and bottom. The sun will also change from being on the left on biggers screens and the top on smaller screens. The biggest change is that the ring will be removed on smaller screens, whereas on bigger screens the ring will appear.

## Technologies Used
    - Languages: HTML, CSS, JavaScript

## Credits
    - The moonhouse typeface (font) is used It is available for free commercial use under the 1001Fonts Free For Commercial Use License (FFC)
    - Text-to-speech functionality provided by the browser's built-in SpeechSynthesis API.
    - ChatGPT helped create the positionMoonOnRing and adjustWave function. Also helped write the informational paragraphs on info page
    - https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis helped create readText function
    - Learn to UI (https://youtu.be/PX9nJaVOtlc?si=SAovrSWg1EeUqm4D) helped create the arrow button
