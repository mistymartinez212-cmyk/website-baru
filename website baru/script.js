// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll reveal animation
const sections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// script.js

// Fungsi untuk cek apakah elemen terlihat di viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - 100) && // 100px buffer
    rect.bottom >= 0
  );
}

// Fungsi untuk menambahkan class "visible"
function revealOnScroll() {
  const sections = document.querySelectorAll(".fade-section");
  sections.forEach((section) => {
    if (isInViewport(section)) {
      section.classList.add("visible");
    }
  });
}

// Jalankan saat scroll & load pertama
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

