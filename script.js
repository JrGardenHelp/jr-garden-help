const translations = {};
let currentLang = 'en';

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);
  document.getElementById('lang-toggle').textContent = currentLang === 'en' ? 'Gàidhlig (Scottish Gaelic)' : 'Beurla (English)';
});

function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.title = "JR Garden Help – Gardening Services in Dumbarton";
    updateText({
      logo: "JR Garden Help",
      nav_services: "Services",
      nav_about: "About",
      nav_contact: "Contact",
      hero_h1: "Local Gardening in Dumbarton, West Dunbartonshire and Beyond.",
      hero_p: "I help to keep your garden neat & tidy – weed removal, lawn mowing, grass cutting, hedge cutting, garden fence & shed painting and more.",
      hero_btn: "Get a Quote",
      services_h2: "My Services",
      service_1: "Lawn Mowing & Edging",
      service_2: "Garden & Shed Painting",
      service_3: "Hedge Trimming",
      service_4: "Weed Control",
      service_5: "Grass Cutting",
      about_h2: "About JR Garden Help",
      about_p: "Run by Jonathan Rainey since 2025. Based in Dumbarton, serving Dumbarton, West Dunbartonshire and Neighbouring Council Areas.",
      contact_h2: "Contact Me",
      contact_p: "Email: jrgardenhelp@gmx.com<br>Phone: 07462 167433",
      form_name: "Your Name",
      form_email: "Your Email",
      form_message: "Your Message",
      form_button: "Send",
      footer: "© 2025 JR Garden Help – All rights reserved."
    });
  } else {
    fetch('gaelic.json?t=' + new Date().getTime())
      .then(r => r.json())
      .then(data => {
        document.documentElement.lang = 'gd';
        document.title = data.title;
        updateText(data);
      });
  }
}

function updateText(map) {
  // Update common text nodes
  document.querySelector('.logo').textContent = map.logo;
  document.querySelector('nav a[href="#services"]').textContent = map.nav_services;
  document.querySelector('nav a[href="#about"]').textContent = map.nav_about;
  document.querySelector('nav a[href="#contact"]').textContent = map.nav_contact;

  // Hero section (only exists on index.html)
  const heroH1 = document.querySelector('#hero h1');
  if (heroH1) heroH1.textContent = map.hero_h1;
  const heroP = document.querySelector('#hero p');
  if (heroP) heroP.textContent = map.hero_p;
  const heroBtn = document.querySelector('#hero .btn');
  if (heroBtn) heroBtn.textContent = map.hero_btn;

  // Services section (only on index.html)
  const servicesH2 = document.querySelector('#services h2');
  if (servicesH2) servicesH2.textContent = map.services_h2;

  const cards = document.querySelectorAll('#services .card');
  if (cards[0]) cards[0].textContent = map.service_1 || 'Lawn Mowing & Edging';
  if (cards[1]) cards[1].textContent = map.service_2 || 'Garden & Shed Painting';
  if (cards[2]) cards[2].textContent = map.service_3 || 'Hedge Trimming';
  if (cards[3]) cards[3].textContent = map.service_4 || 'Weed Control';
  if (cards[4]) cards[4].textContent = map.service_5 || 'Grass Cutting';

  // About section
  document.querySelector('#about h2').textContent = map.about_h2;
  document.querySelector('#about p').textContent = map.about_p;

  // Contact section
  document.querySelector('#contact h2').textContent = map.contact_h2;
  document.querySelector('#contact p').innerHTML = map.contact_p;

  // Form placeholders and button (using IDs)
  const nameInput = document.getElementById('name-input');
  if (nameInput) nameInput.placeholder = map.form_name;

  const emailInput = document.getElementById('email-input');
  if (emailInput) emailInput.placeholder = map.form_email;

  const messageTextarea = document.getElementById('message-textarea');
  if (messageTextarea) messageTextarea.placeholder = map.form_message;

  const submitButton = document.getElementById('submit-button');
  if (submitButton) submitButton.textContent = map.form_button;

  document.querySelector('footer p').innerHTML = map.footer;

  // Review form fields (only exist on reviews.html)
const reviewName = document.getElementById('review-name-input');
if (reviewName) reviewName.placeholder = map.form_name || 'Your Name';

const reviewEmail = document.getElementById('review-email-input');
if (reviewEmail) reviewEmail.placeholder = map.form_email || 'Your Email (optional)';

const reviewText = document.getElementById('review-text-input');
if (reviewText) reviewText.placeholder = map.form_message || 'Your Review / Feedback';

const reviewSubmitBtn = document.getElementById('review-submit-btn');
if (reviewSubmitBtn) reviewSubmitBtn.textContent = map.form_button || 'Submit Review';

  // Handle bilingual elements on any page (en-only / gd-only classes)
  document.querySelectorAll('.en-only').forEach(el => {
    el.style.display = (currentLang === 'en') ? 'block' : 'none';
  });
  document.querySelectorAll('.gd-only').forEach(el => {
    el.style.display = (currentLang === 'gd') ? 'block' : 'none';
  });
}

// Load English on start once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');
});
