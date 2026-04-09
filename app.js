/* ============================================
   GRUPO LEGAL ZAPATA — app.js
   Mobile menu, smooth scroll, form validation,
   phone formatting, scroll reveals, stat counters
   ============================================ */

(function () {
  'use strict';

  // ── Mobile Menu ──
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.style.opacity = '0';
        setTimeout(() => {
          mobileNav.classList.remove('open');
          mobileNav.style.opacity = '';
        }, 300);
      } else {
        mobileNav.classList.add('open');
        requestAnimationFrame(() => {
          mobileNav.style.opacity = '1';
        });
      }
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.style.opacity = '0';
        setTimeout(() => {
          mobileNav.classList.remove('open');
          mobileNav.style.opacity = '';
        }, 300);
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Phone Number Formatting ──
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 10) val = val.substring(0, 10);

      if (val.length >= 7) {
        val = '(' + val.substring(0, 3) + ') ' + val.substring(3, 6) + '-' + val.substring(6);
      } else if (val.length >= 4) {
        val = '(' + val.substring(0, 3) + ') ' + val.substring(3);
      } else if (val.length >= 1) {
        val = '(' + val;
      }
      e.target.value = val;
    });

    phoneInput.addEventListener('keydown', function (e) {
      // Allow backspace to work naturally
      if (e.key === 'Backspace' && this.value.length <= 1) {
        this.value = '';
        e.preventDefault();
      }
    });
  }

  // ── Form Validation ──
  const form = document.getElementById('leadForm');
  const formSuccess = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

      // Name validation
      const name = document.getElementById('nombre');
      if (name && name.value.trim().length < 2) {
        name.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Email validation
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      // Phone validation (at least 10 digits)
      const phone = document.getElementById('phone');
      if (phone) {
        const digits = phone.value.replace(/\D/g, '');
        if (digits.length < 10) {
          phone.closest('.form-group').classList.add('has-error');
          isValid = false;
        }
      }

      // Injury description
      const injury = document.getElementById('lesion');
      if (injury && injury.value.trim().length < 10) {
        injury.closest('.form-group').classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        form.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
      }
    });
  }

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal, .stagger-children');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85;

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal, { passive: true });
  // Initial check
  checkReveal();

  // ── Stat Counter Animation ──
  const statNumbers = document.querySelectorAll('.stat-card__number');
  let statsCounted = false;

  function animateCounters() {
    if (statsCounted) return;
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      statsCounted = true;
      statNumbers.forEach(el => {
        const target = el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const targetNum = parseInt(target, 10);
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * targetNum);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = prefix + targetNum.toLocaleString() + suffix;
          }
        }
        requestAnimationFrame(updateCount);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // ── Header shadow on scroll ──
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

})();
