const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin: "-35% 0px -55% 0px"});
sections.forEach(s => sectionObserver.observe(s));

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

document.querySelectorAll(".video-card").forEach(card => {
  card.addEventListener("click", () => {
    const src = card.dataset.video;
    if (!src) return;
    modalVideo.src = src;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalVideo.play().catch(() => {});
  });
});

document.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", () => {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    document.querySelector("[data-close]")?.click();
  }
});
