document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Hamburger Navigation
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when any link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInside && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  // 3. Active Navigation State on Scroll
  const sections = document.querySelectorAll("section[id]");
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      const link = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  };

  window.addEventListener("scroll", handleScrollSpy);

  // 4. Testimonials Carousel
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot-indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  };

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideIndex = parseInt(e.target.getAttribute("data-index"), 10);
        showSlide(slideIndex);
      });
    });

    // Auto-advance carousel every 6 seconds
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }
});