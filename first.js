// ===== TYPING ANIMATION FOR HERO SECTION =====
// Array of texts to cycle through in the typing animation
const text = ["Full Stack Developer", "AI Learner", "Programmer"];
let i = 0; // Index for current text in the array
let j = 0; // Index for current character being typed
let current = ""; // Current text being displayed
let isDeleting = false; // Flag to check if we're deleting characters

// Main function that handles the typing and deleting animation
function type(){
    current = text[i]; // Get current text from array

    if(!isDeleting){
        // TYPING PHASE: Add characters one by one
        document.getElementById("typing").innerHTML =
        current.substring(0,j++); // Show text up to current character
        if(j > current.length){
            isDeleting = true; // Switch to deleting mode
            setTimeout(type, 1000); // Wait 1 second before deleting
            return;
        }
    } else {
        // DELETING PHASE: Remove characters one by one
        document.getElementById("typing").innerHTML =
        current.substring(0,j--); // Show text up to current character
        if(j < 0){
            isDeleting = false; // Switch back to typing mode
            i = (i + 1) % text.length; // Move to next text or loop back to start
        }
    }
    setTimeout(type, 100); // Call function again after 100ms (typing speed)
}

// Start the typing animation after 1.5 seconds delay
setTimeout(type, 1500);

// ===== TYPING ANIMATION FOR ABOUT SECTION =====
// Array of paragraphs for the about section
const aboutTexts = [
    "Hi, I'm <span>Situ Kumar</span>, a B.Tech ECE student and aspiring Full Stack Developer. I'm passionate about programming, AI, and modern web technologies.",
    "I love building real-world projects, learning new skills, and improving my problem-solving abilities every day."
];
let aboutIndex = 0; // Index for current about paragraph
let aboutCharIndex = 0; // Index for current character in about text

// Function to handle about section typing animation
function typeAbout(){
    const aboutCurrent = aboutTexts[aboutIndex]; // Get current about text

    // Typing phase for about text
    document.getElementById("about-p" + (aboutIndex + 1)).innerHTML =
    aboutCurrent.substring(0, aboutCharIndex++); // Show text up to current character

    if(aboutCharIndex <= aboutCurrent.length){
        setTimeout(typeAbout, 30); // Call function again after 30ms (faster typing)
    } else {
        // Finished typing current paragraph, move to next
        aboutIndex++; // Move to next paragraph
        aboutCharIndex = 0; // Reset character index
        if(aboutIndex < aboutTexts.length){
            setTimeout(typeAbout, 500); // Wait 0.5 seconds before starting next paragraph
        }
        // If all paragraphs are done, stop
    }
}

// Start about typing animation after hero typing finishes (4 second delay)
setTimeout(() => {
    typeAbout();
}, 4000);

// ===== SCROLL ANIMATIONS =====
// Function to add animation class when elements come into view
function animateOnScroll(){
    // Select all elements that should animate on scroll
    const elements = document.querySelectorAll('.about-container, .skills, .projects, .coming-soon, footer');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top; // Distance from top of viewport
        const elementBottom = element.getBoundingClientRect().bottom; // Distance from bottom
        const windowHeight = window.innerHeight; // Height of browser window

        // Check if element is visible in viewport
        if(elementTop < windowHeight - 100 && elementBottom > 0){
            element.classList.add('animate'); // Add animation class
        }
    });
}

// Run animation check when page loads
animateOnScroll();

// Listen for scroll events to trigger animations
window.addEventListener('scroll', animateOnScroll);

// ===== PARTICLES.JS BACKGROUND =====
// Complete configuration for the animated particle background
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#38bdf8"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#38bdf8",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});