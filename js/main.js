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
    if (tile.hasAttribute("aria-hidden")) return;
    tile.addEventListener("click", () => open(tile));
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
