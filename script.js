let currentLang = 'en';

const langToggle = document.getElementById('lang-toggle');

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);
});

function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.title = "JR Garden Help – Gardening Services in Dumbarton";
    langToggle.textContent = "Gàidhlig (Scottish Gaelic)";
    
    // Default English Map
    updateText({
      logo: "JR Garden Help",
      nav_home: "Home",
      nav_services: "Services",
      nav_about: "About",
      nav_contact: "Contact",
      nav_reviews: "Reviews",
      hero_h1: "Local Gardening in Dumbarton, West Dunbartonshire and Beyond.",
      hero_p: "I help to keep your garden neat & tidy...",
      hero_btn: "Get a Quote",
      services_h2: "My Services",
      service_1: "Lawn Mowing & Edging",
      service_2: "Garden & Shed Painting",
      service_3: "Hedge Trimming",
      service_4: "Weed Control",
      service_5: "Grass Cutting",
      about_h2: "About JR Garden Help",
      about_p: "Run by Jonathan Rainey since 2025...",
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
        langToggle.textContent = "Beurla (English)";
        updateText(data);
      });
  }
}

function updateText(map) {
  // 1. Update Navigation and Logo
  const logo = document.querySelector('.logo');
  if (logo) logo.textContent = map.logo;

  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html') link.textContent = map.nav_home;
    if (href === 'index.html#services' || href === '#services') link.textContent = map.nav_services;
    if (href === 'index.html#about' || href === '#about') link.textContent = map.nav_about;
    if (href === 'index.html#contact' || href === '#contact') link.textContent = map.nav_contact;
    if (href === 'reviews.html') link.textContent = map.nav_reviews;
  });

  // 2. Update Hero Section (If it exists)
  const heroH1 = document.querySelector('#hero h1');
  if (heroH1) heroH1.textContent = map.hero_h1;
  
  const heroP = document.querySelector('#hero p');
  if (heroP) heroP.textContent = map.hero_p;

  // 3. Update Services
  const servicesH2 = document.querySelector('#services h2');
  if (servicesH2) servicesH2.textContent = map.services_h2;

  const cards = document.querySelectorAll('#services .card');
  if (cards.length > 0) {
    if (cards[0]) cards[0].textContent = map.service_1;
    if (cards[1]) cards[1].textContent = map.service_2;
    if (cards[2]) cards[2].textContent = map.service_3;
    if (cards[3]) cards[3].textContent = map.service_4;
    if (cards[4]) cards[4].textContent = map.service_5;
  }

  // 4. Update Forms (Shared logic for Index and Reviews)
  const nameInput = document.getElementById('name-input') || document.getElementById('review-name-input');
  if (nameInput) nameInput.placeholder = map.form_name;

  const emailInput = document.getElementById('email-input') || document.getElementById('review-email-input');
  if (emailInput) emailInput.placeholder = map.form_email;

  const msgInput = document.getElementById('message-textarea') || document.getElementById('review-text-input');
  if (msgInput) msgInput.placeholder = map.form_message;

  const submitBtn = document.getElementById('submit-button') || document.getElementById('review-submit-btn');
  if (submitBtn) submitBtn.textContent = map.form_button;

  // 5. Update Footer
  const footerP = document.querySelector('footer p');
  if (footerP) footerP.innerHTML = map.footer;

  // 6. Handle visibility for manual bilingual classes
  document.querySelectorAll('.en-only').forEach(el => el.style.display = (currentLang === 'en' ? '' : 'none'));
  document.querySelectorAll('.gd-only').forEach(el => el.style.display = (currentLang === 'gd' ? '' : 'none'));
}

document.addEventListener('DOMContentLoaded', () => loadLanguage('en'));
