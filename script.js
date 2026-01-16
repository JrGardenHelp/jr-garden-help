const translations = {};
let currentLang = 'en';

// Language toggle click handler
document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'gd' : 'en';
  loadLanguage(currentLang);

  // Update toggle button text on every click
  document.getElementById('lang-toggle').textContent = 
    currentLang === 'en' ? 'Gàidhlig (Scottish Gaelic)' : 'Beurla (English)';
});

// Load language function
function loadLanguage(lang) {
  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.title = "JR Garden Help – Gardening Services in Dumbarton";
    updateText({
      logo: "JR Garden Help",
      nav_home: "Home",
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
        document.title = data.title || "IÓR Gàrradh Cobhair – Seirbheisean Gàrraidh ann an Dùn Breatann";
        updateText(data);
      })
      .catch(err => console.error('Failed to load Gaelic translations:', err));
  }
}

// Main update function – called every time language changes
function updateText(map) {
  // Logo
  const logoEl = document.querySelector('.logo');
  if (logoEl) logoEl.textContent = map.logo || 'JR Garden Help';

  // Nav links – update text if they exist
  const homeLinks = document.querySelectorAll('nav a[href="index.html"]');
  homeLinks.forEach(link => {
    link.textContent = map.nav_home || 'Home';
  });

  const servicesLinks = document.querySelectorAll('nav a[href="index.html#services"]');
  servicesLinks.forEach(link => {
    link.textContent = map.nav_services || 'Services';
  });

  const aboutLinks = document.querySelectorAll('nav a[href="index.html#about"]');
  aboutLinks.forEach(link => {
    link.textContent = map.nav_about || 'About';
  });

  const contactLinks = document.querySelectorAll('nav a[href="index.html#contact"]');
  contactLinks.forEach(link => {
    link.textContent = map.nav_contact || 'Contact';
  });

  // Hero section (only on index.html)
  const heroH1 = document.querySelector('#hero h1');
  if (heroH1) heroH1.textContent = map.hero_h1 || '';
  const heroP = document.querySelector('#hero p');
  if (heroP) heroP.textContent = map.hero_p || '';
  const heroBtn = document.querySelector('#hero .btn');
  if (heroBtn) heroBtn.textContent = map.hero_btn || 'Get a Quote';

  // Services section (only on index.html)
  const servicesH2 = document.querySelector('#services h2');
  if (servicesH2) servicesH2.textContent = map.services_h2 || 'My Services';

  const cards = document.querySelectorAll('#services .card');
  if (cards[0]) cards[0].textContent = map.service_1 || 'Lawn Mowing & Edging';
  if (cards[1]) cards[1].textContent = map.service_2 || 'Garden & Shed Painting';
  if (cards[2]) cards[2].textContent = map.service_3 || 'Hedge Trimming';
  if (cards[3]) cards[3].textContent = map.service_4 || 'Weed Control';
  if (cards[4]) cards[4].textContent = map.service_5 || 'Grass Cutting';

  // About section
  const aboutH2 = document.querySelector('#about h2');
  if (aboutH2) aboutH2.textContent = map.about_h2 || 'About JR Garden Help';
  const aboutP = document.querySelector('#about p');
  if (aboutP) aboutP.textContent = map.about_p || '';

  // Contact section
  const contactH2 = document.querySelector('#contact h2');
  if (contactH2) contactH2.textContent = map.contact_h2 || 'Contact Me';
  const contactP = document.querySelector('#contact p');
  if (contactP) contactP.innerHTML = map.contact_p || '';

  // Main contact form (index.html)
  const nameInput = document.getElementById('name-input');
  if (nameInput) nameInput.placeholder = map.form_name || 'Your Name';
  const emailInput = document.getElementById('email-input');
  if (emailInput) emailInput.placeholder = map.form_email || 'Your Email';
  const messageTextarea = document.getElementById('message-textarea');
  if (messageTextarea) messageTextarea.placeholder = map.form_message || 'Your Message';
  const submitButton = document.getElementById('submit-button');
  if (submitButton) submitButton.textContent = map.form_button || 'Send';

  // Review form (reviews.html)
  const reviewNameInput = document.getElementById('review-name-input');
  if (reviewNameInput) reviewNameInput.placeholder = map.form_name || 'Your Name';

  const reviewTextInput = document.getElementById('review-text-input');
  if (reviewTextInput) reviewTextInput.placeholder = map.form_message || 'Your Review / Feedback';

  const reviewEmailInput = document.getElementById('review-email-input');
  if (reviewEmailInput) reviewEmailInput.placeholder = map.form_email || 'Your Email';

  const reviewSubmitBtn = document.getElementById('review-submit-btn');
  if (reviewSubmitBtn) reviewSubmitBtn.textContent = map.form_button || 'Submit Review';

  // Footer
  const footerP = document.querySelector('footer p');
  if (footerP) footerP.innerHTML = map.footer || '© 2025 JR Garden Help – All rights reserved.';

  // Handle visibility for bilingual elements (.en-only / .gd-only)
  document.querySelectorAll('.en-only').forEach(el => {
    el.style.display = (currentLang === 'en') ? 'block' : 'none';
  });
  document.querySelectorAll('.gd-only').forEach(el => {
    el.style.display = (currentLang === 'gd') ? 'block' : 'none';
  });
}

// Initial load – English by default
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');

  // Force correct toggle button text on initial load (covers all pages)
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = 'Gàidhlig (Scottish Gaelic)';
  }
});

// Custom file upload handling for review form
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('review-photos');
  const customBtn = document.getElementById('custom-upload-btn');
  const fileNameDisplay = document.getElementById('file-name-display');

  if (fileInput && customBtn && fileNameDisplay) {
    customBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileCount = fileInput.files.length;
        const text = currentLang === 'en' 
          ? `${fileCount} file(s) selected` 
          : `${fileCount} faidhle air an taghadh`;
        fileNameDisplay.textContent = text;
      } else {
        fileNameDisplay.textContent = currentLang === 'en' 
          ? 'No file chosen' 
          : 'Chan eil faidhle air a thaghadh';
      }
    });
  }
});
// Custom file upload button & status text – bilingual switching
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('review-photos');
  const customBtn = document.getElementById('custom-upload-btn');
  const fileNameDisplay = document.getElementById('file-name-display');

  if (fileInput && customBtn && fileNameDisplay) {
    // Click the hidden input when custom button is clicked
    customBtn.addEventListener('click', () => {
      fileInput.click();
    });

    // Update button text & status on language change
    function updateFileUploadUI() {
      if (currentLang === 'en') {
        customBtn.textContent = 'Choose File(s)';
        fileNameDisplay.textContent = fileInput.files.length > 0 
          ? `${fileInput.files.length} file(s) selected` 
          : 'No file chosen';
      } else {
        customBtn.textContent = 'Tagh Dealbhan';
        fileNameDisplay.textContent = fileInput.files.length > 0 
          ? `${fileInput.files.length} faidhle air an taghadh` 
          : 'Chan eil faidhle air a thaghadh';
      }
    }

    // Run on load and after every language change
    updateFileUploadUI();

    // Re-run when language changes (hook into existing toggle)
    const originalClick = document.getElementById('lang-toggle').onclick;
    document.getElementById('lang-toggle').onclick = function() {
      if (originalClick) originalClick();
      updateFileUploadUI();
    };

    // Update status when files are selected
    fileInput.addEventListener('change', updateFileUploadUI);
  }
});
// Handle bilingual visibility for .en-only / .gd-only classes
document.querySelectorAll('.en-only').forEach(el => {
  el.style.display = (currentLang === 'en') ? 'block' : 'none';
});
document.querySelectorAll('.gd-only').forEach(el => {
  el.style.display = (currentLang === 'gd') ? 'block' : 'none';
});

// Custom file upload button text switching
function updateFileUploadButton() {
  const customBtn = document.getElementById('custom-upload-btn');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileInput = document.getElementById('review-photos');

  if (customBtn) {
    customBtn.textContent = currentLang === 'en' ? 'Choose File(s)' : 'Tagh Dealbhan';
  }

  if (fileNameDisplay && fileInput) {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = currentLang === 'en' 
        ? `${fileInput.files.length} file(s) selected` 
        : `${fileInput.files.length} faidhle air an taghadh`;
    } else {
      fileNameDisplay.textContent = currentLang === 'en' 
        ? 'No file chosen' 
        : 'Chan eil faidhle air a thaghadh';
    }
  }
}

// Run on initial load and after every language change
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');
  updateFileUploadButton();

  // Re-run after toggle
  document.getElementById('lang-toggle').addEventListener('click', updateFileUploadButton);
});

// Also run when files are selected
document.getElementById('review-photos')?.addEventListener('change', updateFileUploadButton);
