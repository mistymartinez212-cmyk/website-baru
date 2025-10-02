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


// === GLOBAL TETRIS PARTICLE BACKGROUND (Optimized) ===
const canvasParticles = document.getElementById("tetrisParticles");
if (canvasParticles) {
  const ctx = canvasParticles.getContext("2d");

  function resizeCanvas() {
    canvasParticles.width = window.innerWidth;
    canvasParticles.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const colors = ["#FF00CC", "#00FFFF", "#FF8E0D", "#00FF72", "#F538FF"];

  // Jumlah partikel sesuai device
  let particleCount = 50;
  if (window.innerWidth < 768) particleCount = 25;   // Mobile → lebih sedikit
  if (window.innerWidth > 1600) particleCount = 70;  // Monitor besar → lebih banyak

  function randomBlock() {
    const size = 20 + Math.random() * 30;
    return {
      x: Math.random() * canvasParticles.width,
      y: Math.random() * canvasParticles.height,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.5 + Math.random() * 1.2,
      angle: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.02,
    };
  }

  const blocks = Array.from({ length: particleCount }, randomBlock);

  function drawBlocks() {
    ctx.clearRect(0, 0, canvasParticles.width, canvasParticles.height);

    blocks.forEach((b) => {
      ctx.save();
      ctx.translate(b.x + b.size / 2, b.y + b.size / 2);
      ctx.rotate(b.angle);
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size);
      ctx.restore();

      // Update posisi
      b.y += b.speed;
      b.angle += b.rotation;

      if (b.y > canvasParticles.height + b.size) {
        b.y = -b.size;
        b.x = Math.random() * canvasParticles.width;
      }
    });

    requestAnimationFrame(drawBlocks);
  }

  drawBlocks();
}


document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-section");

  const appearOptions = {
    threshold: 0.2 // 20% elemen harus terlihat
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // hanya muncul sekali
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
