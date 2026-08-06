const projectDescription = document.querySelector("#detail-note");
let isTypingDescription = false;

function typeProjectDescription() {
  if (!projectDescription || isTypingDescription) return;
  const text = projectDescription.textContent || "";
  if (!text) return;

  isTypingDescription = true;
  projectDescription.textContent = "";
  let index = 0;

  const tick = () => {
    if (index === text.length) {
      isTypingDescription = false;
      return;
    }
    projectDescription.append(text[index]);
    index += 1;
    window.setTimeout(tick, 16);
  };
  tick();
}

const projectList = document.querySelector("#project-list");
const projectDetail = document.querySelector(".project-detail");

if (projectDescription) {
  projectList?.addEventListener("click", () => window.setTimeout(typeProjectDescription, 0));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      window.setTimeout(typeProjectDescription, 0);
    }
  });
  if (projectDetail) {
    new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      typeProjectDescription();
    }, { threshold: 0.45 }).observe(projectDetail);
  }
}
