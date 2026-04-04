// ===== HERO TYPING ANIMATION =====
const typingTarget = document.getElementById("typing");
const typingTexts = [
  "Full Stack Developer",
  "AI Learner",
  "Programmer",
];
let typingTextIndex = 0;
let typingCharIndex = 0;
let isDeletingText = false;

function typeHeroText() {
  if (!typingTarget) return;

  const currentText = typingTexts[typingTextIndex];

  if (isDeletingText) {
    typingCharIndex--;
  } else {
    typingCharIndex++;
  }

  typingTarget.textContent = currentText.substring(0, typingCharIndex);

  let nextDelay = isDeletingText ? 70 : 110;

  if (!isDeletingText && typingCharIndex === currentText.length) {
    nextDelay = 1400;
    isDeletingText = true;
  } else if (isDeletingText && typingCharIndex === 0) {
    isDeletingText = false;
    typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
    nextDelay = 450;
  }

  setTimeout(typeHeroText, nextDelay);
}

typeHeroText();

// ===== ABOUT SECTION CONTENT =====
const aboutTexts = [
  "I'm <span>Situ Kumar</span>, a passionate Full Stack Developer and AI enthusiast from GEC West Champaran. With a background in Electronics & Communication, I bridge hardware knowledge with modern web development to create innovative solutions.",
  "My journey is driven by curiosity and a passion for building scalable applications.  I am continuously expanding my expertise in AI/ML technologies. I believe in clean code, user-centered design, and solving real-world problems through technology.",
];

function renderAboutSection() {
  const aboutParagraphOne = document.getElementById("about-p1");
  const aboutParagraphTwo = document.getElementById("about-p2");

  if (aboutParagraphOne) {
    aboutParagraphOne.innerHTML = aboutTexts[0];
  }

  if (aboutParagraphTwo) {
    aboutParagraphTwo.innerHTML = aboutTexts[1];
  }
}

renderAboutSection();

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
  requestAnimationFrame(() => {
    welcomeSection.classList.add("welcome-exiting");
    scrollToHomeSafely();
  });

  setTimeout(() => {
    welcomeSection.classList.remove("welcome-exiting");
    welcomeSection.classList.add("welcome-hidden");
    isEnteringSite = false;
  }, 1150);
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

// ===== FEEDBACK FORM =====
const feedbackForm = document.getElementById("feedbackForm");
const feedbackResponse = document.getElementById("feedbackResponse");
const ratingStatus = document.getElementById("ratingStatus");
const ratingInputs = document.querySelectorAll('input[name="portfolioRating"]');

function updateRatingStatus() {
  if (!ratingStatus) return;

  const selectedRating = document.querySelector(
    'input[name="portfolioRating"]:checked',
  );

  if (!selectedRating) {
    ratingStatus.textContent = "No rating selected yet.";
    return;
  }

  ratingStatus.textContent = `You selected ${selectedRating.value} out of 5 stars.`;
}

ratingInputs.forEach((input) => {
  input.addEventListener("change", updateRatingStatus);
});

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const name = (formData.get("feedbackName") || "").toString().trim();
    const message = (formData.get("feedbackMessage") || "").toString().trim();
    const rating = formData.get("portfolioRating");

    if (!rating) {
      if (feedbackResponse) {
        feedbackResponse.textContent = "Please choose a star rating before sending feedback.";
      }
      return;
    }

    const safeName = name || "there";
    const messageSummary =
      message.length > 0
        ? " Your response has been noted for future improvements."
        : " Thanks for rating the portfolio.";

    if (feedbackResponse) {
      feedbackResponse.textContent = `Thank you, ${safeName}. You rated this portfolio ${rating}/5.${messageSummary}`;
    }

    try {
      localStorage.setItem(
        "portfolioFeedbackDraft",
        JSON.stringify({
          name,
          rating,
          message,
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch (error) {
      // Ignore storage issues so the UI still works normally.
    }

    feedbackForm.reset();
    updateRatingStatus();
  });
}
