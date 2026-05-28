/* =============================================
   Verdant — Main JavaScript
   ============================================= */

// --- Active Navigation Link ---
// Marks the current page's nav link as active
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Fade-in on scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Enquiry Form Validation ---
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Clear previous errors
      document.querySelectorAll('.error-msg').forEach(function (el) {
        el.remove();
      });

      let valid = true;

      // Validate name
      if (!name) {
        showError('name', 'Please enter your full name.');
        valid = false;
      }

      // Validate email
      if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      // Validate message
      if (message.length < 10) {
        showError('message', 'Please enter a message of at least 10 characters.');
        valid = false;
      }

      // Show success message
      if (valid) {
        const formContainer = document.getElementById('form-container');
        formContainer.innerHTML =
          '<div class="success-msg">' +
          '<span class="success-icon">✓</span>' +
          '<h3>Thank you, ' + name + '!</h3>' +
          '<p>We\'ve received your enquiry and will get back to you within 2 business days.</p>' +
          '</div>';
      }
    });
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.background = 'var(--clr-green-light)';
    });
  }
});

// --- Helper: Show error message below a field ---
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement('span');
  error.className = 'error-msg';
  error.textContent = message;
  error.style.cssText = 'color:#c0392b; font-size:0.82rem; display:block; margin-top:0.3rem;';
  field.parentNode.appendChild(error);
  field.style.borderColor = '#c0392b';
}
