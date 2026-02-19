
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // 1 SCROLL REVEAL
  // ===============================
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, 
  
  {
    threshold: 0.2,
    rootMargin: "0px 0px -60px 0px"
  });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    revealObserver.observe(el);
  });

  // ===============================
  // 2 SCROLL TYPING EFFECT (About Heading)
  // ===============================
  const aboutHeading = document.querySelector("#about h2");

  if (aboutHeading) {
    const text = aboutHeading.textContent;
    aboutHeading.textContent = "";
    aboutHeading.classList.add("typing-cursor");

    let index = 0;

    const typeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeEffect();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    typeObserver.observe(aboutHeading);

    function typeEffect() {
      if (index < text.length) {
        aboutHeading.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
      }
    }
  }

  // ===============================
  // 3 SMOOTH NAVIGATION SCROLL
  // ===============================
  const navLinks = document.querySelectorAll(".sidebar nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // ===============================
  // 4 ACTIVE NAV LINK ON SCROLL
  // ===============================
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active-link");
      }
    });
  });
 
});