const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const accMenu = document.getElementById('acc-menu');
const accToggleBtn = document.getElementById('acc-toggle-btn');
let currentFontSize = 1;
accToggleBtn.addEventListener('click', () => {
    const isExpanded = accToggleBtn.getAttribute('aria-expanded') === 'true';
    accToggleBtn.setAttribute('aria-expanded', !isExpanded);
    accMenu.classList.toggle('open');
    if (!isExpanded) {
        const firstBtn = accMenu.querySelector('button');
        if (firstBtn) firstBtn.focus();
    }
});

accMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        accMenu.classList.remove('open');
        accToggleBtn.setAttribute('aria-expanded', 'false');
        accToggleBtn.focus();
    }
    if (e.key === 'Tab') {
        const focusableElements = accMenu.querySelectorAll('button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });
}

function accChangeFontSize(step) {
    currentFontSize += step;
    if (currentFontSize < 0.8) currentFontSize = 0.8;
    if (currentFontSize > 1.5) currentFontSize = 1.5;
    document.documentElement.style.fontSize = (currentFontSize * 100) + '%';
}

function accToggleClass(className) {
    document.body.classList.toggle(className);
}
function accReset() {
    document.body.classList.remove('acc-high-contrast', 'acc-highlight-links', 'acc-readable-font');
    currentFontSize = 1;
    document.documentElement.style.fontSize = '100%';
}
