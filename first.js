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
const samePageLinks = document.querySelectorAll('a[href^="#"]');

function scrollToTargetFromHash(hash, updateUrl = true) {
  if (!hash || hash === "#") return;

  const targetSection = document.querySelector(hash);
  if (!targetSection) return;

  const nav = document.querySelector("nav");
  const navOffset = nav ? nav.offsetHeight + 20 : 100;
  const targetTop =
    targetSection.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });

  if (updateUrl) {
    history.replaceState(null, "", hash);
  }
}

samePageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetHash = link.getAttribute("href");

    if (!targetHash || targetHash === "#") return;

    event.preventDefault();

    if (targetHash === "#home" && !welcomeSection?.classList.contains("welcome-hidden")) {
      enterSite();
      setTimeout(() => scrollToTargetFromHash(targetHash), 80);
      return;
    }

    scrollToTargetFromHash(targetHash);
  });
});

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

window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => scrollToTargetFromHash(window.location.hash, false), 120);
  }
});

// ===== FEEDBACK FORM =====
const feedbackForm = document.getElementById("feedbackForm");
const feedbackResponse = document.getElementById("feedbackResponse");
const ratingStatus = document.getElementById("ratingStatus");
const feedbackSubmitButton = feedbackForm?.querySelector(".feedback-submit");
const feedbackNextField = document.getElementById("feedbackNext");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const pageUrl = new URL(window.location.href);
const feedbackSubmissionSucceeded =
  pageUrl.searchParams.get("feedback") === "success";

if (feedbackSubmissionSucceeded) {
  document.body.classList.remove("welcome-active");
  welcomeSection?.classList.add("welcome-hidden");
}

function updateRatingStatus() {
  if (!ratingStatus) return;

  const selectedRating = document.querySelector('input[name="rating"]:checked');

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
  if (feedbackNextField) {
    const successUrl = new URL(window.location.href);
    successUrl.searchParams.delete("feedback");
    successUrl.searchParams.set("feedback", "success");
    successUrl.hash = "feedback";
    feedbackNextField.value = successUrl.toString();
  }

  if (feedbackSubmissionSucceeded && feedbackResponse) {
    feedbackResponse.textContent = "Your response has been received. Thank you.";
    pageUrl.searchParams.delete("feedback");
    history.replaceState(null, "", `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`);
    window.addEventListener("load", () => {
      setTimeout(() => scrollToTargetFromHash("#feedback", false), 120);
    });
  }

  feedbackForm.addEventListener("submit", (event) => {
    const formData = new FormData(feedbackForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const rating = formData.get("rating");

    if (!rating) {
      event.preventDefault();
      if (feedbackResponse) {
        feedbackResponse.textContent = "Please choose a star rating before sending feedback.";
      }
      return;
    }

    if (!email) {
      event.preventDefault();
      if (feedbackResponse) {
        feedbackResponse.textContent = "Please enter your email so I can reply to your feedback.";
      }
      return;
    }

    const safeName = name || "there";

    if (feedbackSubmitButton) {
      feedbackSubmitButton.disabled = true;
    }

    if (feedbackResponse) {
      feedbackResponse.textContent = `Submitting your feedback, ${safeName}...`;
    }

    try {
      localStorage.setItem(
        "portfolioFeedbackDraft",
        JSON.stringify({
          name,
          email,
          rating,
          message: (formData.get("message") || "").toString().trim(),
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch (error) {
      // Ignore storage issues so the form can still submit normally.
    }
  });
}
