// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initMobileNav();
    initCursorGlow();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== MOBILE NAV =====
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    // Add reveal classes to sections and elements
    const elementsToReveal = [
        { selector: '.section-header', class: 'reveal' },
        { selector: '.about-text', class: 'reveal-left' },
        { selector: '.about-stats', class: 'reveal-right' },
        { selector: '.skills-grid', class: 'stagger-children' },
        { selector: '.projects-grid', class: 'stagger-children' },
        { selector: '.leadership-grid', class: 'stagger-children' },
        { selector: '.contact-lead', class: 'reveal' },
        { selector: '.contact-cards', class: 'stagger-children' },
        { selector: '.projects-cta', class: 'reveal' },
    ];

    elementsToReveal.forEach(({ selector, class: className }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add(className);
        });
    });

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SUBTLE CURSOR GLOW (only desktop) =====
function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.06), transparent 70%);
        pointer-events: none;
        z-index: 0;
        transition: transform 0.15s ease;
        will-change: transform;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.getElementById('navbar').offsetHeight;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// ===== TYPEWRITER EFFECT FOR TAGLINE (subtle) =====
(function() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    // Add a blinking cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: var(--accent-primary);
        font-weight: 300;
        animation: cursorBlink 1s ease-in-out infinite;
        margin-left: 2px;
    `;
    tagline.appendChild(cursor);

    // Add cursor blink animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cursorBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Remove cursor after 3 seconds
    setTimeout(() => {
        cursor.style.transition = 'opacity 0.5s';
        cursor.style.opacity = '0';
        setTimeout(() => cursor.remove(), 500);
    }, 3000);
})();
