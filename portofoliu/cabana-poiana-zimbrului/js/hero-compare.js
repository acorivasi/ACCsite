// Comparație vară/iarnă în hero — poziția cursorului (sau a degetului) controlează
// cât se vede din fiecare poză. Cod pur, fără nicio bibliotecă externă.
(function () {
  const compare = document.getElementById("heroCompare");
  const reveal = document.getElementById("heroCompareReveal");
  const revealImg = document.getElementById("heroCompareImg");
  const line = document.getElementById("heroCompareLine");

  if (!compare || !reveal || !revealImg || !line) return;

  function syncImgWidth() {
    revealImg.style.width = compare.clientWidth + "px";
  }

  function setPercent(pct) {
    pct = Math.max(0, Math.min(100, pct));
    reveal.style.width = pct + "%";
    line.style.left = pct + "%";
  }

  function percentFromEvent(e) {
    const rect = compare.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    const x = point.clientX - rect.left;
    return (x / rect.width) * 100;
  }

  syncImgWidth();
  setPercent(50);
  window.addEventListener("resize", syncImgWidth);

  // Ascultăm pe window, nu doar pe #heroCompare: panoul de text din hero
  // stă deasupra (z-index mai mare) și ar bloca evenimentele dacă am asculta
  // doar elementul din spate. Filtrăm după poziția verticală a cursorului.
  function handleMove(e) {
    const rect = compare.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    if (point.clientY < rect.top || point.clientY > rect.bottom) return;
    setPercent(percentFromEvent(e));
  }

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("touchmove", handleMove, { passive: true });
})();
