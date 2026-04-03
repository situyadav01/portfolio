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
  const target = document.getElementById("about-p" + (aboutIndex + 1));
  if (!target) return;

  // Typing phase for about text
  target.innerHTML = aboutCurrent.substring(0, aboutCharIndex++); // Show text up to current character

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
let isEnteringSite = false;

function scrollToHomeSafely() {
  if (!homeSection) return;
  try {
    homeSection.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    homeSection.scrollIntoView();
  }
}

function enterSite() {
  if (!welcomeSection || !homeSection || isEnteringSite) return;
  isEnteringSite = true;

  document.body.classList.remove("welcome-active");
  welcomeSection.classList.add("welcome-exiting");
  scrollToHomeSafely();

  // Start raining after smooth scroll begins.
  setTimeout(() => {
    if (typeof confetti === "function") {
      const end = Date.now() + 2000;

      (function rainConfetti() {
        confetti({
          particleCount: 10,
          angle: 90,
          spread: 180,
          startVelocity: 22,
          ticks: 170,
          origin: { x: Math.random(), y: -0.08 },
          scalar: 0.9,
          colors: [
            "#38bdf8",
            "#06b6d4",
            "#f97316",
            "#facc15",
            "#a855f7",
            "#22c55e",
            "#fb7185",
          ],
        });

        if (Date.now() < end) {
          requestAnimationFrame(rainConfetti);
        }
      })();
    }
  }, 450);

  setTimeout(() => {
    welcomeSection.classList.remove("welcome-exiting");
    welcomeSection.classList.add("welcome-hidden");
    isEnteringSite = false;
  }, 760);
}

if (welcomeButton) {
  welcomeButton.addEventListener("click", (event) => {
    event.preventDefault();
    enterSite();
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

// ===== NAV HIGHLIGHT + BACK TO TOP =====
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
const trackedSections = document.querySelectorAll("section[id], footer[id]");
const backToTopButton = document.getElementById("backToTop");

function updateActiveNavLink() {
  let currentId = "";
  const scrollPosition = window.scrollY + 160;

  trackedSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

function toggleBackToTop() {
  if (!backToTopButton) return;
  backToTopButton.classList.toggle("show", window.scrollY > 360);
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

updateActiveNavLink();
toggleBackToTop();
window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("scroll", toggleBackToTop);

// ===== ROCKET LAUNCH TO PROJECTS =====
const launchProjectsBtn = document.getElementById("launchProjectsBtn");
const projectsSection = document.getElementById("projects");
let rocketIsLaunching = false;

function createFuelParticle(x, y) {
  const fuel = document.createElement("span");
  fuel.className = "rocket-fuel";
  fuel.style.left = `${x}px`;
  fuel.style.top = `${y}px`;
  document.body.appendChild(fuel);

  const offsetX = (Math.random() - 0.5) * 24;
  const offsetY = 30 + Math.random() * 36;
  const scale = 0.3 + Math.random() * 0.7;

  fuel.animate(
    [
      { transform: "translate(-50%, -50%) scale(1)", opacity: 0.95 },
      {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        opacity: 0,
      },
    ],
    {
      duration: 650,
      easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      fill: "forwards",
    },
  );

  setTimeout(() => fuel.remove(), 700);
}

function launchRocket(event) {
  event.preventDefault();
  if (rocketIsLaunching || !projectsSection) return;

  rocketIsLaunching = true;
  const rect = launchProjectsBtn.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const endX = window.innerWidth + 120;
  const endY = -120;
  const duration = 1450;

  const rocket = document.createElement("div");
  rocket.className = "rocket-launch";
  rocket.innerHTML = '<i class="fas fa-rocket"></i>';
  rocket.style.left = `${startX}px`;
  rocket.style.top = `${startY}px`;
  rocket.style.transform = "translate(-50%, -50%) rotate(-40deg)";
  document.body.appendChild(rocket);

  let startTime = null;
  let lastFuelAt = 0;

  function animateRocket(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const currentX = startX + (endX - startX) * eased;
    const currentY = startY + (endY - startY) * eased;

    rocket.style.left = `${currentX}px`;
    rocket.style.top = `${currentY}px`;
    rocket.style.transform = `translate(-50%, -50%) rotate(${-42 + eased * 28}deg) scale(${1 + eased * 0.12})`;

    if (timestamp - lastFuelAt > 35) {
      createFuelParticle(currentX - 14, currentY + 14);
      lastFuelAt = timestamp;
    }

    if (progress < 1) {
      requestAnimationFrame(animateRocket);
      return;
    }

    setTimeout(() => rocket.remove(), 120);
    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      rocketIsLaunching = false;
    }, 300);
  }

  requestAnimationFrame(animateRocket);
}

if (launchProjectsBtn) {
  launchProjectsBtn.addEventListener("click", launchRocket);
}
