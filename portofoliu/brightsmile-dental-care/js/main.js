// BrightSmile Dental Care — interactions

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeaderScroll();
  initHeroPuzzle();
  initTextShatter();
  initPuzzleModal();
  initReveal();
  initDomainCardVideos();
  initFaqAccordion();
  initGalleryFilters();
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
  const pieces = document.querySelectorAll(".puzzle-piece[data-media]");
  if (!modal || !pieces.length) return;

  const mediaWrap = modal.querySelector("[data-puzzle-modal-media]");
  const tag = modal.querySelector("[data-puzzle-modal-tag]");
  const title = modal.querySelector("[data-puzzle-modal-title]");
  const desc = modal.querySelector("[data-puzzle-modal-desc]");
  let lastFocused = null;

  function open(piece) {
    mediaWrap.innerHTML = "";
    if (piece.dataset.mediaType === "video") {
      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      const source = document.createElement("source");
      source.src = piece.dataset.media;
      source.type = "video/mp4";
      video.appendChild(source);
      mediaWrap.appendChild(video);
      video.play().catch(() => {});
    } else {
      const img = document.createElement("img");
      img.src = piece.dataset.media;
      img.alt = piece.dataset.title || "";
      mediaWrap.appendChild(img);
    }

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
    mediaWrap.innerHTML = "";
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

/* ---------- Portfolio-style cards: play video on hover (desktop) ---------- */
function initDomainCardVideos() {
  const cards = document.querySelectorAll(".domain-card[data-hover-play]");
  cards.forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;
    card.addEventListener("mouseenter", () => video.play().catch(() => {}));
    card.addEventListener("mouseleave", () => video.pause());
  });
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    if (item.classList.contains("is-open")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Gallery filters ---------- */
function initGalleryFilters() {
  const filters = document.querySelectorAll(".gallery-filter");
  const items = document.querySelectorAll(".gallery-item");
  if (!filters.length || !items.length) return;

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("is-active"));
      filter.classList.add("is-active");
      const category = filter.dataset.filter;
      items.forEach((item) => {
        const show = category === "all" || item.dataset.category === category;
        item.hidden = !show;
      });
    });
  });
}
