(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("[data-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("open")) return;
      const target = e.target;
      const isInside = menu.contains(target) || toggle.contains(target);
      if (!isInside) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Contact form (frontend only) -> mailto fallback
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  function setStatus(msg, ok = true) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = ok ? "#0f7a3d" : "#b42318";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const subject = String(fd.get("subject") || "").trim();
      const message = String(fd.get("message") || "").trim();

      if (!name || !email || !subject || !message) {
        setStatus("Lütfen zorunlu alanları doldurun.", false);
        return;
      }

      // Basit email kontrolü
      const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!mailOk) {
        setStatus("Lütfen geçerli bir e-posta adresi girin.", false);
        return;
      }

      // mailto (backend yoksa en garanti yöntem)
      const to = "info@abdulsamet.av.tr"; // burayı kendi mailinizle değiştirin
      const body =
        `Ad Soyad: ${name}\n` +
        `E-posta: ${email}\n` +
        `Telefon: ${phone}\n\n` +
        `Mesaj:\n${message}\n`;

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setStatus("Hazır. E-posta uygulamanız açılıyor...");
      window.location.href = mailto;
      form.reset();
    });
  }
})();

