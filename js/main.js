// ACCsite — interactions: theme toggle, interactive nav, mobile menu,
// header scroll state, hero video mosaic, reveal-on-scroll

const THEME_KEY = "accsite-theme";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initNavPill();
  initHeaderScroll();
  initHeroPuzzle();
  initTextShatter();
  initPuzzleModal();
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

/* ---------- Hero puzzle mosaic ---------- */
function initHeroPuzzle() {
  const root = document.querySelector("[data-puzzle]");
  if (!root) return;
  root.querySelectorAll(".puzzle-piece video").forEach((video) => {
    video.play().catch(() => {});
  });
}

/* ---------- Puzzle caption text-shatter ---------- */
function initTextShatter() {
  const captions = document.querySelectorAll(".puzzle-caption");
  if (!captions.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  if (reduceMotion || !canHover) return;

  captions.forEach((caption, i) => {
    const targets = caption.querySelectorAll(".puzzle-tag, h3, p");
    targets.forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      Array.from(text).forEach((ch) => {
        const shard = document.createElement("span");
        shard.className = "shard";
        shard.textContent = ch === " " ? " " : ch;
        el.appendChild(shard);
      });
    });

    const shards = caption.querySelectorAll(".shard");

    function shatter() {
      shards.forEach((shard, idx) => {
        const tx = (Math.random() * 140 - 70).toFixed(0) + "px";
        const ty = (Math.random() * -120 - 20).toFixed(0) + "px";
        const rot = (Math.random() * 160 - 80).toFixed(0) + "deg";
        shard.style.setProperty("--tx", tx);
        shard.style.setProperty("--ty", ty);
        shard.style.setProperty("--rot", rot);
        shard.style.transitionDelay = idx * 10 + "ms";
      });
      caption.classList.add("is-shattering");
    }

    function reassemble() {
      shards.forEach((shard, idx) => {
        shard.style.transitionDelay = idx * 8 + "ms";
      });
      caption.classList.remove("is-shattering");
    }

    setTimeout(shatter, 2800 + i * 220);

    const piece = caption.closest(".puzzle-piece");
    let leaveTimer = null;
    piece.addEventListener("mouseenter", () => {
      clearTimeout(leaveTimer);
      reassemble();
    });
    piece.addEventListener("mouseleave", () => {
      leaveTimer = setTimeout(shatter, 900);
    });
  });
}

/* ---------- Puzzle piece modal ---------- */
function initPuzzleModal() {
  const modal = document.querySelector("[data-puzzle-modal]");
  const pieces = document.querySelectorAll(".puzzle-piece[data-video]");
  if (!modal || !pieces.length) return;

  const video = modal.querySelector("[data-puzzle-modal-video]");
  const tag = modal.querySelector("[data-puzzle-modal-tag]");
  const title = modal.querySelector("[data-puzzle-modal-title]");
  const desc = modal.querySelector("[data-puzzle-modal-desc]");
  let lastFocused = null;

  function open(piece) {
    const source = document.createElement("source");
    source.src = piece.dataset.video;
    source.type = "video/mp4";
    video.innerHTML = "";
    video.appendChild(source);
    video.load();
    video.play().catch(() => {});

    tag.textContent = piece.dataset.tag || "";
    tag.className = "puzzle-tag " + (piece.dataset.tagClass || "");
    title.textContent = piece.dataset.title || "";
    desc.textContent = piece.dataset.desc || "";

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".puzzle-modal-close").focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    video.pause();
    video.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  }

  pieces.forEach((piece) => {
    piece.addEventListener("click", () => open(piece));
    piece.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(piece);
      }
    });
  });

  modal.querySelectorAll("[data-puzzle-modal-close]").forEach((el) => {
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
