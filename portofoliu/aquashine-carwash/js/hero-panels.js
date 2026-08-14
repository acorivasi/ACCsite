// Cele 4 cadre diagonale din hero — imagine statică normal, video cât timp cursorul
// stă în interiorul acelui cadru. Ascultăm pe window (nu doar pe fiecare panou),
// pentru că panoul de text din hero stă deasupra și ar bloca hover-ul direct pe
// zonele acoperite de el — la fel ca la slider-ul vară/iarnă de la cabană.
//
// Geometria (poziția + clip-path a fiecărui cadru) e calculată dinamic din
// dimensiunile reale ale hero-ului, nu procente fixe — hero__bg foloseste
// object-fit:cover, deci porțiunea vizibilă din poza originală (1693px lățime)
// se schimbă odată cu lățimea ferestrei; procentele fixe s-ar dezalinia pe
// ecrane mai înguste.
(function () {
  const wrap = document.querySelector(".hero__panels");
  if (!wrap) return;
  const hero = wrap.closest(".hero");
  const bg = hero.querySelector(".hero__bg");
  const panels = Array.from(wrap.querySelectorAll(".hero__panel"));

  const NATURAL_W = 1693;
  const NATURAL_H = 929;
  // Poziția (x) a celor 3 tăieturi diagonale, sus și jos, în pixeli din poza originală.
  const cuts = [
    { top: 470, bottom: 380 },
    { top: 935, bottom: 845 },
    { top: 1270, bottom: 1175 },
  ];

  let toFrac = (imgX) => imgX / NATURAL_W; // fallback simplu, înlocuit după calcul

  function recompute() {
    const rect = hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const naturalW = bg.naturalWidth || NATURAL_W;
    const naturalH = bg.naturalHeight || NATURAL_H;
    const scale = Math.max(rect.width / naturalW, rect.height / naturalH);
    const displayW = naturalW * scale;
    const style = getComputedStyle(bg);
    const objPosX = parseFloat(style.objectPosition) || 50;
    const offsetX = (displayW - rect.width) * (objPosX / 100);

    toFrac = (imgX) => (imgX * scale - offsetX) / rect.width;

    const xs = [0, ...cuts.flatMap((c) => [c.top, c.bottom]), naturalW];
    const b = [
      { left: 0, right: Math.max(cuts[0].top, cuts[0].bottom) },
      { left: Math.min(cuts[0].top, cuts[0].bottom), right: Math.max(cuts[1].top, cuts[1].bottom) },
      { left: Math.min(cuts[1].top, cuts[1].bottom), right: Math.max(cuts[2].top, cuts[2].bottom) },
      { left: Math.min(cuts[2].top, cuts[2].bottom), right: naturalW },
    ];

    panels.forEach((panel, i) => {
      const leftFrac = toFrac(b[i].left);
      const rightFrac = toFrac(b[i].right);
      const widthFrac = rightFrac - leftFrac;
      panel.style.left = leftFrac * 100 + "%";
      panel.style.width = widthFrac * 100 + "%";

      function localX(imgX) {
        return ((toFrac(imgX) - leftFrac) / widthFrac) * 100;
      }

      let poly;
      if (i === 0) {
        poly = `polygon(0% 0%, ${localX(cuts[0].top)}% 0%, ${localX(cuts[0].bottom)}% 100%, 0% 100%)`;
      } else if (i === 3) {
        poly = `polygon(${localX(cuts[2].top)}% 0%, 100% 0%, 100% 100%, ${localX(cuts[2].bottom)}% 100%)`;
      } else {
        const cLeft = cuts[i - 1];
        const cRight = cuts[i];
        poly = `polygon(${localX(cLeft.top)}% 0%, ${localX(cRight.top)}% 0%, ${localX(cRight.bottom)}% 100%, ${localX(cLeft.bottom)}% 100%)`;
      }
      panel.style.clipPath = poly;
    });
  }

  if (bg.complete) recompute();
  bg.addEventListener("load", recompute);
  window.addEventListener("resize", recompute);

  function xAt(cut, t) {
    return cut.top + t * (cut.bottom - cut.top);
  }

  function panelIndexAt(xImgPx, yFrac) {
    if (xImgPx < xAt(cuts[0], yFrac)) return 0;
    if (xImgPx < xAt(cuts[1], yFrac)) return 1;
    if (xImgPx < xAt(cuts[2], yFrac)) return 2;
    return 3;
  }

  const loaded = [false, false, false, false];
  let active = -1;

  function ensureLoaded(i) {
    if (loaded[i]) return;
    loaded[i] = true;
    const video = panels[i].querySelector(".hero__panel-video");
    const base = panels[i].dataset.video;
    const webm = document.createElement("source");
    webm.src = base + ".webm";
    webm.type = "video/webm";
    video.appendChild(webm);
    const mp4 = document.createElement("source");
    mp4.src = base + ".mp4";
    mp4.type = "video/mp4";
    video.appendChild(mp4);
    video.load();
  }

  function setActive(i) {
    if (i === active) return;
    if (active !== -1) {
      panels[active].classList.remove("is-playing");
      panels[active].querySelector(".hero__panel-video").pause();
    }
    active = i;
    if (i !== -1) {
      ensureLoaded(i);
      panels[i].classList.add("is-playing");
      panels[i].querySelector(".hero__panel-video").play().catch(() => {});
    }
  }

  // Inversăm toFrac ca să găsim coordonata-imagine (px) dintr-o poziție de mouse
  // relativă la hero — avem nevoie de asta pentru testul unghi-diagonală.
  function heroFracToImgX(heroFrac) {
    const rect = hero.getBoundingClientRect();
    const naturalW = bg.naturalWidth || NATURAL_W;
    const naturalH = bg.naturalHeight || NATURAL_H;
    const scale = Math.max(rect.width / naturalW, rect.height / naturalH);
    const displayW = naturalW * scale;
    const style = getComputedStyle(bg);
    const objPosX = parseFloat(style.objectPosition) || 50;
    const offsetX = (displayW - rect.width) * (objPosX / 100);
    return (heroFrac * rect.width + offsetX) / scale;
  }

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(max-width: 700px)").matches) return;
    const rect = hero.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
      setActive(-1);
      return;
    }
    const xFrac = (e.clientX - rect.left) / rect.width;
    const yFrac = (e.clientY - rect.top) / rect.height;
    setActive(panelIndexAt(heroFracToImgX(xFrac), yFrac));
  });

  window.addEventListener("pointerleave", () => setActive(-1));
})();
