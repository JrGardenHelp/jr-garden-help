let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');

// Toggle click handler
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);
});

// Load language data
function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.title = "JR Garden Help – Gardening Services in Dumbarton";
    langToggle.textContent = "Gàidhlig (Scottish Gaelic)";
    
    updateText({
      logo: "JR Garden Help",
      nav_home: "Home",
      nav_services: "Services",
      nav_about: "About",
      nav_contact: "Contact",
      nav_reviews: "Reviews",
      hero_h1: "Local garden maintenance in Dumbarton & beyond",
      hero_p: "I help to keep your garden neat & tidy – weed removal, lawn mowing, grass cutting, hedge cutting, garden fence & shed painting and more.",
      hero_btn: "Get a Quote",
      services_h2: "My Services",
      service_1: "Lawn Mowing & Edging",
      service_2: "Garden & Shed Painting",
      service_3: "Hedge Trimming",
      service_4: "Weed Control",
      service_5: "Grass Cutting",
      about_h2: "About JR Garden Help",
      about_p: "Run by Jonathan Rainey since 2025. Based in Dumbarton, serving Dumbarton, West Dunbartonshire and neighbouring Council Areas.",
      about_sepa: "I am also registered as a Professional Collector and Transporter of Waste with SEPA (Notification Reference: WCR/PC/5012123).",
      contact_h2: "Contact Me",
      contact_p: "Email: jrgardenhelp@gmx.com<br>Phone: 07462 167433",
      form_name: "Your Name",
      form_email: "Your Email",
      form_message: "Your Message",
      form_button: "Send",
      form_review_button: "Submit Review",
      rating_select: "— Select —",
      rating_5: "⭐⭐⭐⭐⭐ (Excellent)",
      rating_4: "⭐⭐⭐⭐ (Very Good)",
      rating_3: "⭐⭐⭐ (Good)",
      rating_2: "⭐⭐ (Fair)",
      rating_1: "⭐ (Poor)",
      footer: "© 2025 JR Garden Help – All rights reserved."
    });
  } else {
    // Cache busting with timestamp
    fetch('gaelic.json?t=' + new Date().getTime())
      .then(r => r.json())
      .then(data => {
        document.documentElement.lang = 'gd';
        langToggle.textContent = "Beurla (English)";
        updateText(data);
      });
  }
}

// Update text across the site
function updateText(map) {
  // 1. Logo & Navigation
  const logo = document.querySelector('.logo');
  if (logo) logo.textContent = map.logo;

  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html' || link.classList.contains('nav-link-home')) link.textContent = map.nav_home;
    if (href?.includes('#services')) link.textContent = map.nav_services;
    if (href?.includes('#about')) link.textContent = map.nav_about;
    if (href?.includes('#contact')) link.textContent = map.nav_contact;
    if (href === 'reviews.html') link.textContent = map.nav_reviews;
  });

  // 2. Hero Section (Index Only)
  const h1 = document.querySelector('#hero h1'); if (h1) h1.textContent = map.hero_h1;
  const hp = document.querySelector('#hero p'); if (hp) hp.textContent = map.hero_p;
  const hbtn = document.querySelector('#hero .btn'); if (hbtn) hbtn.textContent = map.hero_btn;

  // 3. Services Section (Index Only)
  const servicesTitle = document.getElementById('services-title');
  if (servicesTitle) servicesTitle.textContent = map.services_h2;

  const cards = document.querySelectorAll('#services .card');
  if (cards.length > 0) {
    cards.forEach((card, i) => { 
      if (map[`service_${i+1}`]) card.textContent = map[`service_${i+1}`]; 
    });
  }

  // 4. About & SEPA Section
  const abH2 = document.getElementById('about-title'); if (abH2) abH2.textContent = map.about_h2;
  const abP = document.getElementById('about-description'); if (abP) abP.textContent = map.about_p;
  const abSepa = document.getElementById('about-sepa'); if (abSepa) abSepa.textContent = map.about_sepa;

  // 5. Contact Section
  const coH2 = document.querySelector('#contact h2'); if (coH2) coH2.textContent = map.contact_h2;
  const coP = document.querySelector('#contact p'); if (coP) coP.innerHTML = map.contact_p;

  // 6. Review Star Ratings (Reviews Page Only)
  const optS = document.getElementById('opt-select'); if (optS) optS.textContent = map.rating_select;
  const opt5 = document.getElementById('opt-5'); if (opt5) opt5.textContent = map.rating_5;
  const opt4 = document.getElementById('opt-4'); if (opt4) opt4.textContent = map.rating_4;
  const opt3 = document.getElementById('opt-3'); if (opt3) opt3.textContent = map.rating_3;
  const opt2 = document.getElementById('opt-2'); if (opt2) opt2.textContent = map.rating_2;
  const opt1 = document.getElementById('opt-1'); if (opt1) opt1.textContent = map.rating_1;

  // 7. Form Logic (Handles both Index and Reviews forms)
  const nameField = document.getElementById('name-input') || document.getElementById('review-name-input');
  if (nameField) nameField.placeholder = map.form_name;
  
  const emailField = document.getElementById('email-input') || document.getElementById('review-email-input');
  if (emailField) emailField.placeholder = map.form_email;

  const msgField = document.getElementById('message-textarea') || document.getElementById('review-text-input');
  if (msgField) msgField.placeholder = map.form_message;

  const subBtn = document.getElementById('submit-button');
  if (subBtn) subBtn.textContent = map.form_button;
  
  const revBtn = document.getElementById('review-submit-btn');
  if (revBtn) revBtn.textContent = map.form_review_button;

  // 8. Bilingual Success Redirection
  const redirect = document.getElementById('redirect-url');
  if (redirect) {
    redirect.value = `https://jrgardenhelp.github.io/jr-garden-help/success.html?lang=${currentLang}`;
  }

  // 9. Footer
  const foot = document.querySelector('footer p');
  if (foot) foot.innerHTML = map.footer;

  // 10. Manual Visibility Toggle (for en-only / gd-only classes)
  document.querySelectorAll('.en-only').forEach(el => el.style.display = (currentLang === 'en' ? '' : 'none'));
  document.querySelectorAll('.gd-only').forEach(el => el.style.display = (currentLang === 'gd' ? '' : 'none'));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => loadLanguage('en'));
