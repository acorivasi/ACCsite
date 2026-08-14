// Bella Beauty Studio — site scripts
document.addEventListener("DOMContentLoaded", function () {
  /* Hero video: skip autoplay for visitors who prefer reduced motion — the
     poster image (same first-frame look) stays as a static fallback. */
  var heroVideo = document.querySelector(".hero__bg");
  if (heroVideo && heroVideo.tagName === "VIDEO" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  /* Mobile nav toggle */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () { nav.classList.remove("is-open"); });
    });
  }

  /* Highlight active nav link */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current) link.classList.add("is-active");
  });

  /* Gallery filters */
  var filterButtons = document.querySelectorAll(".gallery-filters button");
  var galleryItems = document.querySelectorAll(".gallery-item");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var cat = btn.dataset.filter;
      galleryItems.forEach(function (item) {
        var show = cat === "all" || item.dataset.category === cat;
        item.style.display = show ? "" : "none";
      });
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var visibleItems = [];
    var currentIndex = 0;

    function openLightbox(index) {
      visibleItems = Array.prototype.filter.call(galleryItems, function (item) {
        return item.style.display !== "none";
      });
      currentIndex = visibleItems.indexOf(index);
      updateLightboxImage();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function updateLightboxImage() {
      var img = visibleItems[currentIndex].querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item); });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    var prevBtn = lightbox.querySelector(".lightbox__nav--prev");
    var nextBtn = lightbox.querySelector(".lightbox__nav--next");
    if (prevBtn) prevBtn.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightboxImage();
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      updateLightboxImage();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("is-open"); });
      if (!wasOpen) item.classList.add("is-open");
    });
  });

  /* Contact form — client-side demo handling.
     In producție: înlocuiește cu Formspree/EmailJS/backend propriu (vezi README.md). */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.querySelector("#name").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var message = form.querySelector("#message").value.trim();
      if (!name || !phone || !message) {
        status.textContent = "Te rugăm să completezi numele, telefonul și mesajul.";
        status.className = "form-status is-error";
        return;
      }
      status.textContent = "Mulțumim, " + name + "! Mesajul a fost trimis (demo) — te contactăm în curând.";
      status.className = "form-status is-success";
      form.reset();
    });
  }
});
