/* Grupo Legal Zapata — Brand Page JS */
(function() {
  'use strict';

  // Hamburger menu
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));

  // Number counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-card__number').forEach(el => counterObserver.observe(el));

  // Form handling
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      // Name
      const nombre = form.querySelector('#nombre');
      if (!nombre.value.trim() || nombre.value.trim().length < 2) {
        nombre.closest('.form-group').classList.add('has-error');
        valid = false;
      } else {
        nombre.closest('.form-group').classList.remove('has-error');
      }

      // Email
      const email = form.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('has-error');
        valid = false;
      } else {
        email.closest('.form-group').classList.remove('has-error');
      }

      // Phone
      const phone = form.querySelector('#phone');
      const phoneDigits = phone.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        phone.closest('.form-group').classList.add('has-error');
        valid = false;
      } else {
        phone.closest('.form-group').classList.remove('has-error');
      }

      // Injury description
      const lesion = form.querySelector('#lesion');
      if (!lesion.value.trim() || lesion.value.trim().length < 10) {
        lesion.closest('.form-group').classList.add('has-error');
        valid = false;
      } else {
        lesion.closest('.form-group').classList.remove('has-error');
      }

      if (valid) {
        form.style.display = 'none';
        form.closest('.form-wrapper').querySelector('.form-disclaimer').style.display = 'none';
        form.closest('.form-wrapper').querySelector('.form-success').classList.add('show');
      }
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }
})();
