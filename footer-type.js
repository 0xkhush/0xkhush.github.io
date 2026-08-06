const footerTitle = document.querySelector(".footer-intro h2");
const typingLines = [...document.querySelectorAll(".typing-line")];

const typeLine = (line) => new Promise((resolve) => {
  const text = line.dataset.typing || "";
  let index = 0;
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  line.append(cursor);

  const tick = () => {
    if (index === text.length) {
      cursor.remove();
      resolve();
      return;
    }
    line.insertBefore(document.createTextNode(text[index]), cursor);
    index += 1;
    window.setTimeout(tick, 115);
  };
  tick();
});

if (footerTitle && typingLines.length) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTitle = async () => {
    for (const line of typingLines) {
      if (reduceMotion) line.textContent = line.dataset.typing || "";
      else await typeLine(line);
    }
  };
  new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    revealTitle();
  }, { threshold: 0.45 }).observe(footerTitle);
}
