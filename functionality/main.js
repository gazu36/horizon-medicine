// אנימציות גלילה מקוריות
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

// =========================================
// פונקציות תפריט הנגישות (JavaScript)
// =========================================
const accMenu = document.getElementById('acc-menu');
const accToggleBtn = document.getElementById('acc-toggle-btn');
let currentFontSize = 1;

// פתיחה וסגירה של התפריט
accToggleBtn.addEventListener('click', () => {
    accMenu.classList.toggle('open');
});

// פונקציה להגדלה/הקטנה של טקסט
function accChangeFontSize(step) {
    currentFontSize += step;
    // הגבלת הגודל כדי שהאתר לא יישבר
    if (currentFontSize < 0.8) currentFontSize = 0.8;
    if (currentFontSize > 1.5) currentFontSize = 1.5;
    document.documentElement.style.fontSize = (currentFontSize * 100) + '%';
}

// פונקציה להפעלת/כיבוי מחלקות עיצוב (ניגודיות, פונט, קישורים)
function accToggleClass(className) {
    document.body.classList.toggle(className);
}

// איפוס כל הגדרות הנגישות למצב ברירת המחדל
function accReset() {
    document.body.classList.remove('acc-high-contrast', 'acc-highlight-links', 'acc-readable-font');
    currentFontSize = 1;
    document.documentElement.style.fontSize = '100%';
}

// =========================================
// מונה תווים לטופס יצירת קשר
// =========================================
const reasonText = document.getElementById('reason-text');
const charCount = document.getElementById('char-count');

if (reasonText && charCount) {
    reasonText.addEventListener('input', () => {
        const length = reasonText.value.length;
        charCount.textContent = `${length} / 200`;
        // הצגת צבע אדום ברגע שמתקרבים לגבול (אופציה לעיצוב יפה)
        charCount.style.color = length >= 200 ? '#ff8e8e' : '#aaa';
    });
}

// =========================================
// אבטחת מפתח (Obfuscation)
// =========================================
const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');
if (contactForm) {
    contactForm.addEventListener('submit', function () {
        // כדי שבוטים לא יסרקו את מפתח הגישה, הוא לא נמצא בקוד ה-HTML.
        // במקום זאת, נחלק את המפתח ל-2 חלקים ונרכיב אותו רק כאשר הלקוח לוחץ "שליחה".
        // לדוגמה, אם המפתח שלך הוא "12345678-abcd", שים חצי למעלה וחצי למטה.
        const keyPart1 = "a5a933e8-5fa9-4cde-92";
        const keyPart2 = "ff-bf822f5c2e7d";

        let hiddenKey = document.querySelector('input[name="access_key"]');
        if (!hiddenKey) {
            hiddenKey = document.createElement('input');
            hiddenKey.type = 'hidden';
            hiddenKey.name = 'access_key';
            contactForm.appendChild(hiddenKey);
        }
        hiddenKey.value = keyPart1 + keyPart2;
    });
}
