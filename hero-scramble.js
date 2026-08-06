const scrambleLetters = document.querySelectorAll("[data-scramble]");
const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrambleLetters.forEach((letterGroup) => {
    letterGroup.style.display = "inline-block";
    letterGroup.style.width = `${letterGroup.getBoundingClientRect().width}px`;
  });

  const duration = 900;
  const characterStep = 90;
  const startedAt = performance.now();

  const scrambleFrame = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const step = Math.floor((now - startedAt) / characterStep);

    scrambleLetters.forEach((letterGroup) => {
      const finalText = letterGroup.dataset.scramble;
      const settled = Math.floor(finalText.length * progress);
      letterGroup.textContent = [...finalText].map((character, index) => {
        if (index < settled || character === " ") return character;
        return scrambleCharacters[(index * 11 + step * 7) % scrambleCharacters.length];
      }).join("");
    });

    if (progress < 1) requestAnimationFrame(scrambleFrame);
  };

  requestAnimationFrame(scrambleFrame);
}
