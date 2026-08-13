// ACCsite — interactions: theme toggle, interactive nav, mobile menu,
// header scroll state, kinetic hero, video reel, reveal-on-scroll

const THEME_KEY = "accsite-theme";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initNavPill();
  initHeaderScroll();
  initReel();
  initReelModal();
  initReveal();
  initDomainCardVideos();
  initConfigurator();
  initContactPrefill();
});

/* ---------- Theme: Noir / Smarald ---------- */
function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "noir" || stored === "emerald") root.setAttribute("data-theme", stored);

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "emerald" ? "emerald" : "noir";
      const next = current === "emerald" ? "noir" : "emerald";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      btn.setAttribute("aria-pressed", next === "emerald" ? "true" : "false");
    });
  });
}

/* ---------- Mobile nav: open/close, focus, scroll lock, Escape ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", () => {
    const open = nav.classList.contains("is-open");
    if (open) closeNav();
    else openNav();
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && nav.classList.contains("is-open")) closeNav();
  });
}

/* ---------- Desktop nav: sliding pill highlights hover/active link ---------- */
function initNavPill() {
  const nav = document.querySelector(".main-nav");
  const pill = document.querySelector("[data-nav-pill]");
  if (!nav || !pill) return;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  const links = Array.from(nav.querySelectorAll("a:not(.main-nav-cta)"));

  function moveTo(link) {
    if (!link) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.width = link.offsetWidth + "px";
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
    pill.style.opacity = "1";
  }

  const active = links.find((l) => l.classList.contains("active"));
  moveTo(active);

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => moveTo(link));
    link.addEventListener("focus", () => moveTo(link));
  });
  nav.addEventListener("mouseleave", () => moveTo(active));
  nav.addEventListener("focusout", (e) => {
    if (!nav.contains(e.relatedTarget)) moveTo(active);
  });
  window.addEventListener("resize", () => moveTo(nav.querySelector("a:hover") || active));
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => io.observe(item));
}

/* ---------- Reel: the six category videos, in continuous motion ----------
   The strip scrolls via a pure-CSS animation (runs off the main thread).
   JS only decides which of the (doubled, for a seamless loop) tiles should
   actually be decoding video at any moment — playing all 12 at once would
   be wasteful, so each tile's video loads and plays only while its tile is
   near the viewport, and pauses again once it scrolls away. */
function initReel() {
  const tiles = document.querySelectorAll(".reel-tile[data-video]");
  if (!tiles.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.isIntersecting) {
          if (!video.currentSrc) video.load();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "200px" }
  );
  tiles.forEach((tile) => io.observe(tile));
}

/* ---------- Reel tile modal: tap/click a tile for a bigger view ---------- */
function initReelModal() {
  const modal = document.querySelector("[data-reel-modal]");
  const tiles = document.querySelectorAll(".reel-tile[data-video]");
  if (!modal || !tiles.length) return;

  const video = modal.querySelector("[data-reel-modal-video]");
  const tag = modal.querySelector("[data-reel-modal-tag]");
  const title = modal.querySelector("[data-reel-modal-title]");
  const desc = modal.querySelector("[data-reel-modal-desc]");
  const configureLink = modal.querySelector("[data-reel-modal-configure]");
  let lastFocused = null;

  function open(tile) {
    const source = document.createElement("source");
    source.src = tile.dataset.video;
    source.type = "video/mp4";
    video.innerHTML = "";
    video.appendChild(source);
    video.load();
    video.play().catch(() => {});

    tag.textContent = tile.dataset.tag || "";
    title.textContent = tile.dataset.title || "";
    desc.textContent = tile.dataset.desc || "";
    if (configureLink && tile.dataset.title) {
      configureLink.href = `configurator.html?tip=${encodeURIComponent(tile.dataset.title)}`;
    }

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".reel-modal-close").focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    video.pause();
    video.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  }

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => open(tile));
    if (tile.hasAttribute("aria-hidden")) return;
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(tile);
      }
    });
  });

  modal.querySelectorAll("[data-reel-modal-close]").forEach((el) => {
    el.addEventListener("click", close);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });
}

/* ---------- Portfolio domain cards: play video on hover (desktop) ---------- */
function initDomainCardVideos() {
  const cards = document.querySelectorAll(".domain-card[data-hover-play]");
  cards.forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;
    card.addEventListener("mouseenter", () => video.play().catch(() => {}));
    card.addEventListener("mouseleave", () => video.pause());
  });
}

/* ---------- Configurator: build a package, see a live estimate ----------
   Prices below are placeholders — edit the data-price / data-price-monthly
   attributes in configurator.html to match ACCsite's real pricing. */
function initConfigurator() {
  const form = document.querySelector("[data-config-form]");
  if (!form) return;

  const summaryList = document.querySelector("[data-config-summary-list]");
  const totalEl = document.querySelector("[data-config-total]");
  const monthlyWrap = document.querySelector("[data-config-monthly]");
  const monthlyEl = document.querySelector("[data-config-monthly-value]");
  const waBtn = document.querySelector("[data-config-whatsapp]");
  const contactBtn = document.querySelector("[data-config-contact]");
  const steppers = document.querySelectorAll("[data-config-stepper]");

  const categoryBanner = document.querySelector("[data-config-category-banner]");
  const category = new URLSearchParams(window.location.search).get("tip");
  if (categoryBanner && category) {
    categoryBanner.hidden = false;
    categoryBanner.querySelector("[data-config-category-value]").textContent = category;
  }

  steppers.forEach((stepper) => {
    const valueEl = stepper.querySelector("[data-stepper-value]");
    const min = Number(stepper.dataset.min || 0);
    const max = Number(stepper.dataset.max || 99);
    stepper.querySelectorAll(".stepper-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const delta = Number(btn.dataset.step);
        const next = Math.min(max, Math.max(min, Number(valueEl.textContent) + delta));
        valueEl.textContent = next;
        update();
      });
    });
  });

  form.addEventListener("change", update);

  function collect() {
    const items = [];
    let total = 0;
    let monthly = 0;

    form.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').forEach((input) => {
      const price = Number(input.dataset.price || 0);
      const priceMonthly = Number(input.dataset.priceMonthly || 0);
      const label = input.dataset.label || input.closest(".config-option")?.querySelector("strong")?.textContent || "";
      if (!label) return;
      items.push({ label, price, priceMonthly });
      total += price;
      monthly += priceMonthly;
    });

    steppers.forEach((stepper) => {
      const count = Number(stepper.querySelector("[data-stepper-value]").textContent);
      if (count <= 0) return;
      const price = count * Number(stepper.dataset.pricePer || 0);
      items.push({ label: `${stepper.dataset.label || "Extra"}: ${count}`, price, priceMonthly: 0 });
      total += price;
    });

    return { items, total, monthly };
  }

  function buildMessage(items, total, monthly) {
    const lines = ["Bună! Vreau o ofertă pentru un pachet ACCsite:"];
    if (category) lines.push(`Domeniu: ${category}`);
    items.forEach((item) => {
      const priceLabel = item.priceMonthly ? `${item.priceMonthly} RON/lună` : item.price ? `${item.price} RON` : "inclus";
      lines.push(`• ${item.label} — ${priceLabel}`);
    });
    lines.push(`Total estimativ: ${total} RON${monthly ? ` + ${monthly} RON/lună` : ""}`);
    return lines.join("\n");
  }

  function update() {
    const { items, total, monthly } = collect();

    summaryList.innerHTML = items.length
      ? items
          .map((item) => {
            const priceLabel = item.priceMonthly ? `${item.priceMonthly} RON/lună` : item.price ? `${item.price} RON` : "inclus";
            return `<li><span>${item.label}</span><span>${priceLabel}</span></li>`;
          })
          .join("")
      : '<li class="config-summary-empty">Alege opțiunile de mai sus pentru a vedea pachetul tău</li>';

    totalEl.textContent = `${total} RON`;
    if (monthly > 0) {
      monthlyWrap.hidden = false;
      monthlyEl.textContent = `${monthly} RON/lună`;
    } else {
      monthlyWrap.hidden = true;
    }

    const message = buildMessage(items, total, monthly);
    if (waBtn) waBtn.href = `https://wa.me/40727731227?text=${encodeURIComponent(message)}`;
    if (contactBtn) contactBtn.href = `contact.html?pachet=${encodeURIComponent(message)}`;
  }

  update();
}

/* ---------- Contact page: prefill message when arriving from the configurator ---------- */
function initContactPrefill() {
  const textarea = document.getElementById("mesaj");
  if (!textarea) return;
  const pachet = new URLSearchParams(window.location.search).get("pachet");
  if (!pachet) return;
  textarea.value = pachet;
  const note = document.querySelector("[data-config-note]");
  if (note) note.hidden = false;
}
