const projects = [
    {
        year: "2026",
        title: "Portfolio Website",
        stack: ["HTML", "CSS", "JavaScript"],
        description:
            "A lightweight personal portfolio built without a framework. The focus is sharp typography, responsive layout, and a minimal interaction model that lets the work speak clearly.",
        primaryLink: "https://0xkhush.in",
        primaryLabel: "View project",
        secondaryLink: "https://github.com/0xkhush/0xkhush.github.io",
        secondaryLabel: "Source code",
    },
    {
        year: "2026",
        title: "Focus",
        stack: ["JavaScript", "Chrome API", "CSS"],
        description:
            "A browser extension that filters distracting YouTube elements in real time. It uses DOM interception and asynchronous JavaScript to create a cleaner, more focused viewing experience.",
        primaryLink: "https://github.com/0xkhush/focus",
        primaryLabel: "Open repository",
        secondaryLink: "",
        secondaryLabel: "",
    },
    {
        year: "2026",
        title: "yt-filter-api",
        stack: ["Python", "Machine Learning", "API"],
        description:
            "YouTube Content Classifier API is a lightweight Python API that classifies YouTube videos as constructive (\"yes\") or non-constructive (\"no\") using Machine Learning trained on 9,000+ yt videos. It is optimized for low-resource environments and built to power browser extensions and productivity tools.",
        primaryLink: "https://github.com/0xkhush/yt-filter-api",
        primaryLabel: "Open repository",
        secondaryLink: "",
        secondaryLabel: "",
    },
    {
        year: "Ongoing",
        title: "Open Source Contributions",
        stack: ["GitHub", "Community", "Collaboration"],
        description:
            "An ongoing body of public collaboration across repositories, discussions, and learning-in-public efforts. The goal is steady contribution, sharper engineering habits, and meaningful community work.",
        primaryLink: "https://github.com/0xkhush",
        primaryLabel: "View GitHub",
        secondaryLink: "",
        secondaryLabel: "",
    },
];

const state = {
    activeProject: 0,
    view: "home",
    hasRenderedProject: false,
};

document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        site: document.getElementById("site"),
        homeView: document.getElementById("home-view"),
        projectsView: document.getElementById("projects-view"),
        previewList: document.getElementById("project-preview-list"),
        projectCount: document.getElementById("project-count"),
        openProjects: document.getElementById("open-projects"),
        closeProjects: document.getElementById("close-projects"),
        prevProject: document.getElementById("prev-project"),
        nextProject: document.getElementById("next-project"),
        projectYear: document.getElementById("project-year"),
        projectTitle: document.getElementById("project-title"),
        projectStack: document.getElementById("project-stack"),
        projectDescription: document.getElementById("project-description"),
        primaryLink: document.getElementById("project-primary-link"),
        secondaryLink: document.getElementById("project-secondary-link"),
        projectNote: document.getElementById("project-note"),
        projectDots: document.getElementById("project-dots"),
    };

    renderPreviewList(elements);
    renderProjectDots(elements);
    renderProjectCount(elements);
    renderProject(elements, state.activeProject);
    bindEvents(elements);
    initPointerSpotlight();
    initProjectMagnetism(elements.previewList);

    if (window.location.hash === "#projects") {
        setView(elements, "projects");
    }
});

function bindEvents(elements) {
    elements.openProjects.addEventListener("click", () => {
        setView(elements, "projects");
    });

    elements.closeProjects.addEventListener("click", () => {
        setView(elements, "home");
    });

    elements.prevProject.addEventListener("click", () => {
        renderProject(elements, state.activeProject - 1);
    });

    elements.nextProject.addEventListener("click", () => {
        renderProject(elements, state.activeProject + 1);
    });

    document.addEventListener("keydown", (event) => {
        if (state.view !== "projects") return;

        if (event.key === "ArrowLeft") {
            renderProject(elements, state.activeProject - 1);
        }

        if (event.key === "ArrowRight") {
            renderProject(elements, state.activeProject + 1);
        }

        if (event.key === "Escape") {
            setView(elements, "home");
        }
    });

    window.addEventListener("hashchange", () => {
        if (window.location.hash === "#projects") {
            setView(elements, "projects");
            return;
        }

        if (state.view === "projects") {
            setView(elements, "home");
        }
    });
}

function renderProjectCount(elements) {
    elements.projectCount.textContent = `${String(projects.length).padStart(2, "0")} projects`;
}

function renderPreviewList(elements) {
    const fragment = document.createDocumentFragment();
    const previewProjects = projects.slice(0, 3);

    previewProjects.forEach((project, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "project-preview";
        button.dataset.index = String(index);
        button.innerHTML = `
            <span class="project-preview-title">${project.title}</span>
            <span class="project-preview-stack">${project.stack.join(" / ")}</span>
        `;

        button.addEventListener("click", () => {
            renderProject(elements, index);
            setView(elements, "projects");
        });

        fragment.appendChild(button);
    });

    elements.previewList.replaceChildren(fragment);
}

function renderProjectDots(elements) {
    const fragment = document.createDocumentFragment();

    projects.forEach((project, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "project-dot";
        button.setAttribute("aria-label", `Open ${project.title}`);

        button.addEventListener("click", () => {
            renderProject(elements, index);
        });

        fragment.appendChild(button);
    });

    elements.projectDots.replaceChildren(fragment);
}

function renderProject(elements, index) {
    const total = projects.length;
    const nextIndex = (index + total) % total;
    const project = projects[nextIndex];
    const shouldAnimate = state.hasRenderedProject && !prefersReducedMotion();

    state.activeProject = nextIndex;

    elements.projectYear.textContent = project.year || `Project ${String(nextIndex + 1).padStart(2, "0")}`;
    elements.projectTitle.textContent = project.title;
    elements.projectStack.textContent = project.stack.join(" / ");
    elements.projectDescription.textContent = project.description;
    elements.projectNote.textContent = project.note || "";

    syncLink(elements.primaryLink, project.primaryLink, project.primaryLabel, "→");
    syncLink(elements.secondaryLink, project.secondaryLink, project.secondaryLabel, "↗");

    updateDotState(elements.projectDots, nextIndex);

    if (shouldAnimate) {
        animateProjectDisplay(elements.projectDisplay);
    }

    state.hasRenderedProject = true;
}

function syncLink(element, href, label, suffix) {
    if (!href || !label) {
        element.hidden = true;
        element.removeAttribute("href");
        element.textContent = "";
        return;
    }

    element.hidden = false;
    element.href = href;
    element.textContent = `${label} ${suffix}`;
}

function updateDotState(container, activeIndex) {
    const dots = container.querySelectorAll(".project-dot");

    dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeIndex);
        dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
}

function animateProjectDisplay(element) {
    element.classList.remove("is-changing");
    void element.offsetWidth;
    element.classList.add("is-changing");
    element.addEventListener(
        "animationend",
        () => {
            element.classList.remove("is-changing");
        },
        { once: true }
    );
}

function initPointerSpotlight() {
    if (!canUseFinePointerMotion()) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);
    document.body.classList.add("has-custom-cursor");

    let frameId = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;
    let lastMarkerAt = 0;
    let markerStartX = nextX;
    let markerStartY = nextY;

    window.addEventListener(
        "pointermove",
        (event) => {
            if (event.pointerType !== "mouse") return;

            nextX = event.clientX;
            nextY = event.clientY;
            document.body.classList.add("is-pointer-active");

            if (event.timeStamp - lastMarkerAt > 45) {
                createCursorMarker(markerStartX, markerStartY, nextX, nextY);
                lastMarkerAt = event.timeStamp;
                markerStartX = nextX;
                markerStartY = nextY;
            }

            if (frameId) return;

            frameId = requestAnimationFrame(() => {
                document.documentElement.style.setProperty("--cursor-x", `${nextX}px`);
                document.documentElement.style.setProperty("--cursor-y", `${nextY}px`);
                frameId = 0;
            });
        },
        { passive: true }
    );

    document.documentElement.addEventListener("mouseleave", () => {
        document.body.classList.remove("is-pointer-active");
        document.body.classList.remove("is-cursor-interactive");
        markerStartX = nextX;
        markerStartY = nextY;
    });

    document.addEventListener("pointerover", (event) => {
        if (event.pointerType !== "mouse") return;

        document.body.classList.toggle(
            "is-cursor-interactive",
            Boolean(event.target.closest("a, button, .project-preview, .skill-item"))
        );
    });

    document.addEventListener("pointerout", (event) => {
        if (event.pointerType !== "mouse") return;

        const nextTarget = event.relatedTarget;
        const isStillInteractive =
            nextTarget instanceof Element &&
            Boolean(nextTarget.closest("a, button, .project-preview, .skill-item"));

        document.body.classList.toggle("is-cursor-interactive", isStillInteractive);
    });
}

function createCursorMarker(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < 6 || distance > 140) return;

    const marker = document.createElement("span");
    marker.className = "cursor-marker";
    marker.setAttribute("aria-hidden", "true");
    marker.style.left = `${startX}px`;
    marker.style.top = `${startY}px`;
    marker.style.setProperty("--marker-length", `${Math.min(distance, 72).toFixed(2)}px`);
    marker.style.setProperty("--marker-angle", `${Math.atan2(deltaY, deltaX)}rad`);
    document.body.appendChild(marker);

    window.setTimeout(() => {
        marker.remove();
    }, 1900);
}

function initProjectMagnetism(container) {
    if (!canUseFinePointerMotion()) return;

    container.addEventListener(
        "pointermove",
        (event) => {
            if (event.pointerType !== "mouse") return;

            const preview = event.target.closest(".project-preview");
            if (!preview || !container.contains(preview)) return;

            const rect = preview.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const moveX = (x - 0.5) * 8;
            const moveY = (y - 0.5) * 5;

            preview.style.setProperty("--project-move-x", `${moveX.toFixed(2)}px`);
            preview.style.setProperty("--project-move-y", `${moveY.toFixed(2)}px`);
            preview.style.setProperty("--project-glow-x", `${(x * 100).toFixed(1)}%`);
            preview.style.setProperty("--project-glow-y", `${(y * 100).toFixed(1)}%`);
        },
        { passive: true }
    );

    container.addEventListener("pointerout", (event) => {
        const preview = event.target.closest(".project-preview");
        if (!preview || preview.contains(event.relatedTarget)) return;

        preview.style.removeProperty("--project-move-x");
        preview.style.removeProperty("--project-move-y");
        preview.style.removeProperty("--project-glow-x");
        preview.style.removeProperty("--project-glow-y");
    });
}

function canUseFinePointerMotion() {
    return (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !prefersReducedMotion()
    );
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setView(elements, view) {
    state.view = view;
    elements.site.dataset.view = view;

    const showProjects = view === "projects";
    document.body.classList.toggle("projects-open", showProjects);
    elements.projectsView.setAttribute("aria-hidden", String(!showProjects));
    elements.homeView.setAttribute("aria-hidden", String(showProjects));

    if (showProjects) {
        window.location.hash = "projects";
        elements.closeProjects.focus({ preventScroll: true });
        return;
    }

    if (window.location.hash === "#projects") {
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    elements.openProjects.focus({ preventScroll: true });
}
