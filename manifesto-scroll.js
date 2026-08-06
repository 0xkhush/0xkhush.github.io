const manifesto = document.querySelector(".manifesto");

if (manifesto) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame;

  const updateManifesto = () => {
    frame = undefined;
    const rect = manifesto.getBoundingClientRect();
    const range = Math.max(manifesto.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / range, 0), 1);
    manifesto.classList.toggle("is-field", reduceMotion || progress > 0.06);
    manifesto.classList.toggle("is-statement", reduceMotion || progress > 0.24);
    manifesto.classList.toggle("is-skills", reduceMotion || progress > 0.54);
  };

  const requestUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(updateManifesto);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
}
