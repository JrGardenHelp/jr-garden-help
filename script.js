let currentLang = 'en';
const langToggle = document.getElementById('lang-toggle');

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);
});

function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
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
    fetch('gaelic.json?t=' + new Date().getTime())
      .then(r => r.json())
      .then(data => {
        document.documentElement.lang = 'gd';
        langToggle.textContent = "Beurla (English)";
        updateText(data);
      });
  }
}

function updateElement(id, text, isHTML = false) {
  const el = document.getElementById(id);
  if (el) {
    if (isHTML) el.innerHTML = text;
    else el.textContent = text;
  }
}

function updateText(map) {
  // Navigation & Logo (Global)
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

  // Home Page Specific Sections
  updateElement('hero-h1', map.hero_h1);
  updateElement('hero-p', map.hero_p);
  updateElement('hero-btn', map.hero_btn);
  updateElement('services-title', map.services_h2);
  
  const cards = document.querySelectorAll('#services .card');
  cards.forEach((card, i) => {
    if (map[`service_${i+1}`]) card.textContent = map[`service_${i+1}`];
  });

  // Fixed About & SEPA Section
  updateElement('about-title', map.about_h2);
  updateElement('about-description', map.about_p);
  updateElement('about-sepa', map.about_sepa);

  // Contact Section
  updateElement('contact-title', map.contact_h2);
  updateElement('contact-info', map.contact_p, true);

  // Form Placeholders & Buttons (Universal)
  const nameIn = document.getElementById('name-input') || document.getElementById('review-name-input');
  if (nameIn) nameIn.placeholder = map.form_name;
  const emailIn = document.getElementById('email-input') || document.getElementById('review-email-input');
  if (emailIn) emailIn.placeholder = map.form_email;
  const msgIn = document.getElementById('message-textarea') || document.getElementById('review-text-input');
  if (msgIn) msgIn.placeholder = map.form_message;
  
  updateElement('submit-button', map.form_button);
  updateElement('review-submit-btn', map.form_review_button);

  // Star Ratings (Reviews Page)
  updateElement('opt-select', map.rating_select);
  updateElement('opt-5', map.rating_5);
  updateElement('opt-4', map.rating_4);
  updateElement('opt-3', map.rating_3);
  updateElement('opt-2', map.rating_2);
  updateElement('opt-1', map.rating_1);

  // Success Redirect
  const redirect = document.getElementById('redirect-url');
  if (redirect) {
    redirect.value = `https://jrgardenhelp.github.io/jr-garden-help/success.html?lang=${currentLang}`;
  }

  // Footer
  const foot = document.querySelector('footer p');
  if (foot) foot.innerHTML = map.footer;
}

document.addEventListener('DOMContentLoaded', () => loadLanguage('en'));
