const workSection = document.querySelector("#work");

if (workSection) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    workSection.classList.add("is-revealed");
    observer.disconnect();
  }, { threshold: reduceMotion ? 0 : 0.2 }).observe(workSection);
}
