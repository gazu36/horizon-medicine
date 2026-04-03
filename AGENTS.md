# Horizon Medicine - Project Handover & Context

This document provides a comprehensive overview of the **Horizon Medicine** project, a professional landing page for a Traditional Chinese Medicine (TCM) clinic. It serves as a guide for any AI agents or developers continuing work on this codebase.

## Project Overview
- **Goal**: Create a modern, responsive, and accessible landing page that showcases TCM services and converts visitors via a contact form.
- **Tone**: Professional, calming, and health-oriented.
- **Primary Language**: Hebrew (RTL).
- **Core Technologies**: 
  - **Frontend**: HTML5, Vanilla JS (ES6+), CSS3 (Modern features like Flexbox/Grid, variables, animations).
  - **Form Backend**: Web3Forms (for serverless form handling).
  - **Security**: CSP (Content Security Policy), Honeypot spam protection.

---

## Project Structure
- `index.html`: The main landing page.
- `style/styles.css`: Centralized stylesheet using CSS variables for theme management.
- `functionality/main.js`: Core logic for animations, form handling, and accessibility.
- `assets/`: Contains images, icons, and fonts.
- `TODO.txt`: A list of personalization tasks for the user (name, phone, address).

---

## Conversation & Development History

### 1. Foundation & Hosting Prep (dd6d44e2)
- Established the core structure of the landing page.
- Integrated **Web3Forms** for the contact form to avoid complex backend setups.
- Implemented basic spam protection (honeypot) and key obfuscation (concatenation).
- Prepared the site for **GitHub Pages** deployment.

### 2. Form Validation & UX (e01d6f3f)
- Added **real-time validation** with immediate visual feedback (debounced).
- Implemented **phone number masking** (0XX-XXX-XXXX format) to ensure data quality.
- Added character counters for the message field.

### 3. Layout & Accessibility Refinements (bc759578)
- Centered the introduction section for mobile devices.
- Implemented **High Contrast Mode** support (removing background images in specific a11y modes).
- Fixed the treatment grid layout for tablet devices to ensure aesthetic wrapping.

### 4. Major Refactoring (b9047754)
- **Responsive Navigation**: Implemented a modern hamburger menu for mobile users.
- **Semantic HTML**: Added `<main>` landmarks for better screen reader support.
- **Focus Management**: Implemented a **focus trap** for the accessibility dialog to prevent keyboard leakage.
- **CSS Clean-up**: Centralized colors/sizing into `:root` variables and removed almost all inline styles.

### 5. Security Review (14dc87ce)
- Conducted a deep inspection of UI, Security, and Maintainability.
- **UI/UX**: Verified floating animations and contrast ratios.
- **Security**: Recommended **Domain Restrictions** on Web3Forms dashboard to replace client-side key obfuscation.
- **Maintainability**: Suggested BEM naming conventions for future scaling.

---

## Technical Decisions & Patterns

### Form Submission
- Uses `fetch` to submit form data to Web3Forms without reloading the page.
- Disables the submit button and provides "Sending..." feedback during processing.
- Handles success and error cases via a custom **Toast Notification** system.

### Accessibility (A11y)
- A custom accessibility widget allows users to:
  - Adjust font sizes.
  - Toggle high contrast mode.
  - Highlight links.
  - Use a more readable font.
- Full keyboard support with focus trapping in the menu.

### Performance
- Uses `IntersectionObserver` for scroll-triggered "reveal" animations without polling.
- CSS variables allow for instant "theming" (e.g., high contrast mode) without complex JS.

---

## Remaining Tasks & Known Issues
Refer to [TODO.txt](file:///c:/Users/guyaz/Documents/horizon-medicine/TODO.txt) for a detailed list. Key items include:
1. **Personalization**: Update the therapist's name, phone, and address throughout the site.
2. **Web3Forms Configuration**: The user should enable **Domain Restrictions** on their Web3Forms dashboard for true security.
3. **CSP Maintenance**: If adding external resources (analytics, fonts), update the `Content-Security-Policy` meta tag in `index.html`.
4. **Toast Optimization**: For high-traffic sites, pre-render the toast container (already done in recent refactors).

---

## Key Files
- [index.html](file:///c:/Users/guyaz/Documents/horizon-medicine/index.html)
- [main.js](file:///c:/Users/guyaz/Documents/horizon-medicine/functionality/main.js)
- [styles.css](file:///c:/Users/guyaz/Documents/horizon-medicine/style/styles.css)
- [code_review_report.md](file:///C:/Users/guyaz/.gemini/antigravity/brain/14dc87ce-66b2-4b87-ac82-2c717921c5ff/artifacts/code_review_report.md) (Detailed security and architecture notes)
