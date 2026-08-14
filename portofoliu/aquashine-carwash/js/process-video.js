// Cadrele din secțiunea "Cum lucrăm" — imagine statică în mod normal, se transformă
// în video cât timp cursorul stă deasupra (pe mobil: tap). Video-ul nu se încarcă
// deloc până nu e nevoie de el (preload="none" + src pus abia la primul hover),
// ca un vizitator care nu interacționează să nu descarce niciun clip degeaba.
(function () {
  const steps = document.querySelectorAll(".process-step[data-video]");

  steps.forEach((step) => {
    const media = step.querySelector(".process-step__media");
    const video = step.querySelector(".process-step__video");
    const src = step.dataset.video;
    let loaded = false;

    function play() {
      media.classList.add("is-playing");
      if (loaded) {
        video.play().catch(() => {});
        return;
      }
      loaded = true;
      const webm = document.createElement("source");
      webm.src = src + ".webm";
      webm.type = "video/webm";
      video.appendChild(webm);
      const mp4 = document.createElement("source");
      mp4.src = src + ".mp4";
      mp4.type = "video/mp4";
      video.appendChild(mp4);
      video.addEventListener(
        "canplay",
        () => {
          if (media.classList.contains("is-playing")) video.play().catch(() => {});
        },
        { once: true }
      );
      video.load();
    }

    function stop() {
      media.classList.remove("is-playing");
      video.pause();
    }

    step.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      play();
    });
    step.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      stop();
    });

    // Pe mobil (fără hover real): tap pe card comută play/pause.
    step.addEventListener("click", () => {
      if (media.classList.contains("is-playing")) {
        stop();
      } else {
        steps.forEach((s) => {
          if (s !== step) {
            s.querySelector(".process-step__media").classList.remove("is-playing");
            s.querySelector(".process-step__video").pause();
          }
        });
        play();
      }
    });
  });
})();
