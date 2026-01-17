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
    if(langToggle) langToggle.textContent = "Gàidhlig (Scottish Gaelic)";
    
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
        if(langToggle) langToggle.textContent = "Beurla (English)";
        updateText(data);
      });
  }
}

function updateText(map) {
  // Navigation & Logo
  const logo = document.querySelector('.logo');
  if (logo) logo.textContent = map.logo;

  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === 'index.html' || href === '/') link.textContent = map.nav_home;
    if (href?.includes('#services')) link.textContent = map.nav_services;
    if (href?.includes('#about')) link.textContent = map.nav_about;
    if (href?.includes('#contact')) link.textContent = map.nav_contact;
    if (href === 'reviews.html') link.textContent = map.nav_reviews;
  });

  // Hero Section
  const h1 = document.querySelector('#hero h1');
  if (h1) h1.textContent = map.hero_h1;
  const hp = document.querySelector('#hero p');
  if (hp) hp.textContent = map.hero_p;
  const hbtn = document.querySelector('#hero .btn');
  if (hbtn) hbtn.textContent = map.hero_btn;

  // Services
  const sh2 = document.querySelector('#services h2');
  if (sh2) sh2.textContent = map.services_h2;
  const cards = document.querySelectorAll('#services .card');
  if (cards.length > 0) {
    cards.forEach((card, i) => {
      if (map[`service_${i+1}`]) card.textContent = map[`service_${i+1}`];
    });
  }

  // ABOUT SECTION (Fixed)
  const abH2 = document.querySelector('#about h2');
  if (abH2) abH2.textContent = map.about_h2;
  const abP = document.querySelector('#about p');
  if (abP) abP.textContent = map.about_p;

  // CONTACT SECTION (Fixed)
  const coH2 = document.querySelector('#contact h2');
  if (coH2) coH2.textContent = map.contact_h2;
  const coP = document.querySelector('#contact p');
  if (coP) coP.innerHTML = map.contact_p;

  // Forms
  const nameIn = document.getElementById('name-input') || document.getElementById('review-name-input');
  if (nameIn) nameIn.placeholder = map.form_name;
  const emailIn = document.getElementById('email-input') || document.getElementById('review-email-input');
  if (emailIn) emailIn.placeholder = map.form_email;
  const msgIn = document.getElementById('message-textarea') || document.getElementById('review-text-input');
  if (msgIn) msgIn.placeholder = map.form_message;
  const subBtn = document.getElementById('submit-button') || document.getElementById('review-submit-btn');
  if (subBtn) subBtn.textContent = map.form_button;

  // Footer
  const foot = document.querySelector('footer p');
  if (foot) foot.innerHTML = map.footer;

  // Bilingual Class Toggles
  document.querySelectorAll('.en-only').forEach(el => el.style.display = (currentLang === 'en' ? '' : 'none'));
  document.querySelectorAll('.gd-only').forEach(el => el.style.display = (currentLang === 'gd' ? '' : 'none'));
}

document.addEventListener('DOMContentLoaded', () => loadLanguage('en'));
