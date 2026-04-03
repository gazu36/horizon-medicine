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

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = document.createElement('span');
    icon.textContent = type === 'success' ? '✅' : '❌';

    const text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        if (container.childNodes.length === 0) {
            container.remove();
        }
    }, 5000);
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

const phoneInput = document.getElementById('phone-input');

if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        // Strip all non-numeric characters
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        // Format as 0XX-XXX-XXXX
        if (!x[2]) {
            e.target.value = x[1];
        } else {
            e.target.value = x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
        }
    });
}

const debounceInputs = document.querySelectorAll('input[required], textarea[required]');
debounceInputs.forEach(input => {
    let bounceTimer;
    input.addEventListener('input', () => {
        // Hide error immediately once they start typing
        input.classList.remove('is-invalid');
        clearTimeout(bounceTimer);

        // Wait 800ms after user stops typing to show error again
        bounceTimer = setTimeout(() => {
            if (!input.validity.valid && input.value.trim() !== '') {
                input.classList.add('is-invalid');
            }
        }, 800);
    });

    // Also trigger on blur if they leave the field
    input.addEventListener('blur', () => {
        clearTimeout(bounceTimer);
        if (!input.validity.valid && input.value.trim() !== '') {
            input.classList.add('is-invalid');
        }
    });
});

const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

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

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'שולח הודעה...';
        submitBtn.disabled = true;
        contactForm.classList.add('submitting');

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('הודעתך נשלחה בהצלחה! אני אחזור אליך בהקדם.', 'success');

                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.classList.remove('submitting');
                        const countDisplay = document.getElementById('char-count');
                        if (countDisplay) countDisplay.textContent = '0 / 200';
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 5000);
                } else {
                    contactForm.classList.remove('submitting');
                    showToast('אירעה שגיאה בשליחת ההודעה, אנא נסה שנית.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                contactForm.classList.remove('submitting');
                showToast('אירעה בעיית תקשורת, אנא נסה שנית.', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}
