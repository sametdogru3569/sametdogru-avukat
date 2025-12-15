// =========================
// Abdul Samet Law - Scripts
// File: script.js
// =========================

(function () {
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  const yearEl = document.getElementById("year");
  const toTop = document.querySelector(".toTop");
  const form = document.getElementById("contactForm");
  const formOk = document.getElementById("formOk");

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on link click (mobile)
    navList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navList.classList.contains("is-open")) return;
      const isInside = navList.contains(e.target) || navToggle.contains(e.target);
      if (!isInside) {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("is-visible");
          io.unobserve(ent.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Back-to-top visibility
  const onScroll = () => {
    if (!toTop) return;
    const show = window.scrollY > 600;
    toTop.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Counter animation (hero stats)
  const counters = document.querySelectorAll("[data-count]");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        const el = ent.target;
        const raw = el.getAttribute("data-count") || "0";
        const target = parseInt(raw, 10);
        if (!Number.isFinite(target)) return;

        const isPercent = (el.textContent || "").includes("%");
        const hasPlus = (el.textContent || "").includes("+");

        let start = 0;
        const dur = 900;
        const t0 = performance.now();

        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const val = Math.round(start + (target - start) * p);
          el.textContent = isPercent ? `%${val}` : `${val}${hasPlus ? "+" : ""}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterIO.observe(c));

  // Contact form (frontend demo)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formOk) formOk.hidden = false;
      form.reset();
      setTimeout(() => {
        if (formOk) formOk.hidden = true;
      }, 3500);
    });
  }
})();

