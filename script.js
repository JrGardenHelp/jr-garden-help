const translations = {};
let currentLang = 'en';

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);
  document.getElementById('lang-toggle').textContent = currentLang === 'en' ? 'Gàidhlig' : 'English';
});

function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.title = "JR Garden Help – Gardening Services in Scotland";
    updateText({
      logo: "JR Garden Help",
      nav_services: "Services", nav_about: "About", nav_contact: "Contact",
      hero_h1: "Local Gardening in Dumbarton, West Dunbartonshire and Beyond.",
      hero_p: "I help your garden thrive – weed removal, lawn mowing, grass cutting, hedge cutting, garden fence & shed painting & more.",
      hero_btn: "Get a Quote",
      services_h2: "My Services",
      service_1: "Lawn Mowing & Edging", service_2: "Garden & Shed Painting",
      service_3: "Hedge Trimming", service_4: "Weed Control", service_5: "Grass Cutting"
      about_h2: "About JR Garden Help",
      about_p: "Run by Jonathan Rainey since 2025. Based in Dumbarton, serving Dumbarton, West Dunbartonshire and Neighbouring Council Areas.",
      contact_h2: "Contact Me",
      contact_p: "Email: jrgardenhelp@gmx.com<br>Phone: 07462 167433",
      form_name: "Your Name", form_email: "Your Email", form_message: "Your Message",
      form_button: "Send",
      footer: "© 2025 JR Garden Help – All rights reserved."
    });
  } else {
    fetch('gaelic.json')
      .then(r => r.json())
      .then(data => {
        document.documentElement.lang = 'gd';
        document.title = data.title;
        updateText(data);
      });
  }
}

function updateText(map) {
  // Update text nodes
  document.querySelector('.logo').textContent = map.logo;
  document.querySelector('nav a[href="#services"]').textContent = map.nav_services;
  document.querySelector('nav a[href="#about"]').textContent = map.nav_about;
  document.querySelector('nav a[href="#contact"]').textContent = map.nav_contact;

  document.querySelector('#hero h1').textContent = map.hero_h1;
  document.querySelector('#hero p').textContent = map.hero_p;
  document.querySelector('#hero .btn').textContent = map.hero_btn;

  document.querySelector('#services h2').textContent = map.services_h2;
  document.querySelectorAll('#services .card')[0].textContent = map.service_1;
  document.querySelectorAll('#services .card')[1].textContent = map.service_2;
  document.querySelectorAll('#services .card')[2].textContent = map.service_3;
  document.querySelectorAll('#services .card')[3].textContent = map.service_4;

  document.querySelector('#about h2').textContent = map.about_h2;
  document.querySelector('#about p').textContent = map.about_p;

  document.querySelector('#contact h2').textContent = map.contact_h2;
  document.querySelector('#contact p').innerHTML = map.contact_p;

  document.querySelector('form input[placeholder="Your Name"]').placeholder = map.form_name;
  document.querySelector('form input[type="email"]').placeholder = map.form_email;
  document.querySelector('form textarea').placeholder = map.form_message;
  document.querySelector('form button').textContent = map.form_button;

  document.querySelector('footer p').innerHTML = map.footer;
}

// Load English on start
loadLanguage('en');
