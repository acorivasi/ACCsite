// ACCsite — interactions: nav toggle, header scroll state, hero video carousel, reveal-on-scroll

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeaderScroll();
  initHeroPuzzle();
  initTextShatter();
  initReveal();
  initDomainCardVideos();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
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

  const pieces = Array.from(root.querySelectorAll(".puzzle-piece"));
  if (!pieces.length) return;

  // play/pause each piece's video based on viewport visibility, to save
  // resources when the hero scrolls out of view (mobile data / CPU)
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    },
    { threshold: 0.2 }
  );
  pieces.forEach((piece) => io.observe(piece));
}

/* ---------- Puzzle caption text-shatter ----------
   Each caption's characters become "shards": they fly apart and fade a
   few seconds after load, then reassemble smoothly when you hover the
   piece — a small callback to the puzzle idea itself. */
function initTextShatter() {
  const captions = document.querySelectorAll(".puzzle-caption");
  if (!captions.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const canHover = window.matchMedia("(hover: hover)").matches;

  captions.forEach((caption, i) => {
    const targets = caption.querySelectorAll(".puzzle-tag, h3, p");
    targets.forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      Array.from(text).forEach((ch) => {
        const shard = document.createElement("span");
        shard.className = "shard";
        shard.textContent = ch === " " ? " " : ch;
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

    if (canHover) {
      const piece = caption.closest(".puzzle-piece");
      let leaveTimer = null;
      piece.addEventListener("mouseenter", () => {
        clearTimeout(leaveTimer);
        reassemble();
      });
      piece.addEventListener("mouseleave", () => {
        leaveTimer = setTimeout(shatter, 900);
      });
    }
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
