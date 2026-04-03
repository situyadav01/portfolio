// ===== TYPING ANIMATION FOR ABOUT SECTION =====
// Array of paragraphs for the about section
const aboutTexts = [
  "I'm <span>Situ Kumar</span>, a passionate Full Stack Developer and AI enthusiast from GEC West Champaran. With a background in Electronics & Communication, I bridge hardware knowledge with modern web development to create innovative solutions.",
  "My journey is driven by curiosity and a passion for building scalable applications. I specialize in the MERN stack (MongoDB, Express, React, Node.js) and am continuously expanding my expertise in AI/ML technologies. I believe in clean code, user-centered design, and solving real-world problems through technology.",
];
let aboutIndex = 0; // Index for current about paragraph
let aboutCharIndex = 0; // Index for current character in about text

// Function to handle about section typing animation
function typeAbout() {
  const aboutCurrent = aboutTexts[aboutIndex]; // Get current about text

  // Typing phase for about text
  document.getElementById("about-p" + (aboutIndex + 1)).innerHTML =
    aboutCurrent.substring(0, aboutCharIndex++); // Show text up to current character

  if (aboutCharIndex <= aboutCurrent.length) {
    setTimeout(typeAbout, 30); // Call function again after 30ms (faster typing)
  } else {
    // Finished typing current paragraph, move to next
    aboutIndex++; // Move to next paragraph
    aboutCharIndex = 0; // Reset character index
    if (aboutIndex < aboutTexts.length) {
      setTimeout(typeAbout, 500); // Wait 0.5 seconds before starting next paragraph
    }
    // If all paragraphs are done, stop
  }
}

// Start about typing animation after hero typing finishes (4 second delay)
setTimeout(() => {
  typeAbout();
}, 4000);

// Hide the welcome section after entering the site once.
const welcomeSection = document.getElementById("welcome");
const welcomeButton = document.querySelector(".welcome-btn");
const homeSection = document.getElementById("home");

if (welcomeButton && welcomeSection && homeSection) {
  welcomeButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 90,
        startVelocity: 28,
        origin: { y: 0.55 },
        scalar: 0.9,
        colors: ["#38bdf8", "#06b6d4", "#f97316", "#facc15", "#f472b6"],
      });
    }

    setTimeout(() => {
      welcomeSection.classList.add("welcome-hidden");
      homeSection.scrollIntoView({ behavior: "smooth" });
    }, 700);
  });
}

// ===== SCROLL ANIMATIONS =====
// Function to add animation class when elements come into view
function animateOnScroll() {
  // Select all elements that should animate on scroll
  const elements = document.querySelectorAll(
    ".about-container, .skills, .projects, .coming-soon, footer",
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top; // Distance from top of viewport
    const elementBottom = element.getBoundingClientRect().bottom; // Distance from bottom
    const windowHeight = window.innerHeight; // Height of browser window

    // Check if element is visible in viewport
    if (elementTop < windowHeight - 100 && elementBottom > 0) {
      element.classList.add("animate"); // Add animation class
    }
  });
}

// Run animation check when page loads
animateOnScroll();

// Listen for scroll events to trigger animations
window.addEventListener("scroll", animateOnScroll);
