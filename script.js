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
      hero_reviews_btn: "See Reviews & Testimonials",
      services_h2: "My Services",
      service_1: "Lawn Mowing & Edging",
      service_2: "Garden & Shed Painting",
      service_3: "Hedge Trimming",
      service_4: "Weed Control",
      service_5: "Grass Cutting",
      ba_h2: "Before & After Transformations",
      ba_p: "Here are some examples of gardens I’ve helped bring back to life.",
      ba_before: "Before",
      ba_after: "After",
      about_h2: "About JR Garden Help",
      about_p: "Run by Jonathan Rainey since 2025. Based in Dumbarton, serving Dumbarton, West Dunbartonshire and neighbouring Council Areas.",
      about_sepa: "I am also registered as a Professional Collector and Transporter of Waste with SEPA (Notification Reference: WCR/PC/5012123).",
      contact_h2: "Contact Me",
      contact_p: "Email: jrgardenhelp@gmx.com<br>Phone: 07462 167433",
      form_name: "Your Name",
      form_email: "Your Email",
      form_message: "Your Message",
      form_button: "Send",
      // Reviews Page
      rev_h1: "Reviews",
      rev_p: "Read what my customers say...",
      rev_form_title: "Submit Your Review",
      rating_label: "Rating:",
      rating_select: "— Select —",
      rating_5: "⭐⭐⭐⭐⭐ (Excellent)",
      rating_4: "⭐⭐⭐⭐ (Very Good)",
      rating_3: "⭐⭐⭐ (Good)",
      rating_2: "⭐⭐ (Fair)",
      rating_1: "⭐ (Poor)",
      form_review_button: "Submit Review",
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
  updateElement('site-logo', map.logo);
  updateElement('nav-home', map.nav_home);
  updateElement('nav-services', map.nav_services);
  updateElement('nav-about', map.nav_about);
  updateElement('nav-contact', map.nav_contact);
  updateElement('nav-reviews', map.nav_reviews);

  // Home Page
  updateElement('hero-h1', map.hero_h1);
  updateElement('hero-p', map.hero_p);
  updateElement('hero-btn', map.hero_btn);
  updateElement('hero-reviews-btn', map.hero_reviews_btn);
  updateElement('services-title', map.services_h2);
  for (let i = 1; i <= 5; i++) updateElement(`svc-${i}`, map[`service_${i}`]);
  updateElement('ba-title', map.ba_h2);
  updateElement('ba-desc', map.ba_p);
  document.querySelectorAll('.ba-label-before').forEach(el => el.textContent = map.ba_before);
  document.querySelectorAll('.ba-label-after').forEach(el => el.textContent = map.ba_after);
  updateElement('about-title', map.about_h2);
  updateElement('about-description', map.about_p);
  updateElement('about-sepa', map.about_sepa);
  updateElement('contact-title', map.contact_h2);
  updateElement('contact-info', map.contact_p, true);
  updateElement('submit-button', map.form_button);

  // Reviews Page
  updateElement('rev-h1', map.rev_h1 || map.nav_reviews);
  updateElement('rev-p', map.rev_p || "");
  updateElement('rev-form-title', map.rev_form_title || "");
  updateElement('rating-label', map.rating_label || "");
  updateElement('opt-select', map.rating_select);
  for (let i = 1; i <= 5; i++) updateElement(`opt-${i}`, map[`rating_${i}`]);
  updateElement('review-submit-btn', map.form_review_button);
  
  // Placeholders
  const nIn = document.getElementById('name-input') || document.getElementById('review-name-input');
  if(nIn) nIn.placeholder = map.form_name;
  const eIn = document.getElementById('email-input') || document.getElementById('review-email-input');
  if(eIn) eIn.placeholder = map.form_email;
  const mIn = document.getElementById('message-textarea') || document.getElementById('review-text-input');
  if(mIn) mIn.placeholder = map.form_message;

  updateElement('footer-text', map.footer);
}

document.addEventListener('DOMContentLoaded', () => loadLanguage('en'));
