// AquaShine Car Wash — site scripts
document.addEventListener("DOMContentLoaded", function () {
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

  /* Scrollspy — evidențiază secțiunea vizibilă în meniu (site e o singură pagină) */
  var navLinks = document.querySelectorAll(".nav__links a[href^='#']");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) { link.classList.remove("is-active"); });
        var active = document.querySelector('.nav__links a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* Lightbox galerie */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var galleryItems = document.querySelectorAll(".gallery-item");
    var currentIndex = 0;

    function openLightbox(item) {
      currentIndex = Array.prototype.indexOf.call(galleryItems, item);
      updateLightboxImage();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function updateLightboxImage() {
      var img = galleryItems[currentIndex].querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item); });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    var prevBtn = lightbox.querySelector(".lightbox__nav--prev");
    var nextBtn = lightbox.querySelector(".lightbox__nav--next");
    if (prevBtn) prevBtn.addEventListener("click", function () {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxImage();
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightboxImage();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });
  }

  /* Formular de contact — demo client-side.
     În producție: înlocuiește cu Formspree/EmailJS/backend propriu (vezi README.md). */
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
