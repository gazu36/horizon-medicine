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
    accMenu.classList.toggle('open');
});

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


const reasonText = document.getElementById('reason-text');
const charCount = document.getElementById('char-count');

if (reasonText && charCount) {
    reasonText.addEventListener('input', () => {
        const length = reasonText.value.length;
        charCount.textContent = `${length} / 200`;
        charCount.style.color = length >= 200 ? '#ff8e8e' : '#aaa';
    });
}

const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');
if (contactForm) {
    contactForm.addEventListener('submit', function () {
        const kp1 = "a5a933e8-5fa9-4cde-92";
        const kp2 = "ff-bf822f5c2e7d";

        let hiddenKey = document.querySelector('input[name="access_key"]');
        if (!hiddenKey) {
            hiddenKey = document.createElement('input');
            hiddenKey.type = 'hidden';
            hiddenKey.name = 'access_key';
            contactForm.appendChild(hiddenKey);
        }
        hiddenKey.value = kp1 + kp2;
    });
}
