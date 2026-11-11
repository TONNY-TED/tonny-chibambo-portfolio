/**
 * ==========================================================================
 * PERSONAL PORTFOLIO - TONNY CHIBAMBO
 * Script: js/script.js
 * Technology: Vanilla JavaScript (ES6+)
 * Description: Interactive functionality including mobile menu, typing animation,
 *              scroll reveal observer, scroll reading progress bar, floating back-to-top,
 *              smooth page transitions, interactive tab switching, animated skill bars,
 *              image lightbox, and interactive animation playground controls.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initNavigation();
  initScrollReadingProgress();
  initBackToTop();
  initPageTransitions();
  initTabTransitions();
  initTypingAnimation();
  initScrollReveal();
  initSkillBars();
  initImageLightbox();
  initImageFormatFallback();
  initAnimationControls();
  initClipboardUtils();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  // Toggle mobile menu on button click
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Close menu when clicking any navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      navToggle.focus();
    }
  });

  function toggleMenu(open) {
    navToggle.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Active navigation link detection based on current URL path
  highlightActiveNavLink(navLinks);
}

function highlightActiveNavLink(links) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. SCROLL READING PROGRESS & HEADER DYNAMICS
   ========================================================================== */
function initScrollReadingProgress() {
  // Create top scroll progress bar element if not present in DOM
  let progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scrollProgressBar';
    progressBar.className = 'scroll-progress-bar';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);
  }

  const siteHeader = document.querySelector('.site-header');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;

    // Dynamic header elevation
    if (siteHeader) {
      if (scrollTop > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. FLOATING BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.type = 'button';
    backToTopBtn.setAttribute('aria-label', 'Back to top of page');
    backToTopBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  function toggleButton() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/* ==========================================================================
   4. SMOOTH PAGE NAVIGATION TRANSITIONS
   ========================================================================== */
function initPageTransitions() {
  // Intercept local HTML page navigation links for smooth seamless cross-fade
  const internalLinks = document.querySelectorAll('a[href$=".html"], a.nav-link');
  const progressBar = document.getElementById('scrollProgressBar');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetHref = link.getAttribute('href');

      // Skip external links, hash anchors on same page, or special key combinations
      if (
        !targetHref ||
        targetHref.startsWith('#') ||
        targetHref.startsWith('mailto:') ||
        targetHref.startsWith('http') ||
        targetHref.startsWith('//') ||
        link.target === '_blank' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const cleanTarget = targetHref.split('#')[0];

      if (cleanTarget && cleanTarget !== currentPath) {
        event.preventDefault();

        // Rapid progress sweep
        if (progressBar) {
          progressBar.style.transition = 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
          progressBar.style.width = '100%';
        }

        // Apply smooth exit transition
        document.body.classList.add('page-leaving');

        setTimeout(() => {
          window.location.href = targetHref;
        }, 180);
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TABS & CATEGORY SWITCHERS (SMOOTH TRANSITIONS)
   ========================================================================== */
function initTabTransitions() {
  // 1. General Panel-based Tabs
  const tabContainers = document.querySelectorAll('.tab-container');

  tabContainers.forEach((container) => {
    const tabButtons = container.querySelectorAll('.tab-btn[data-tab-target]');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');

        // Update active tab button
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Cross-fade tab panels
        tabPanels.forEach((panel) => {
          if (panel.id === targetId || targetId === 'all') {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });

  // 2. Project Filter Tabs in projects.html
  const filterButtons = document.querySelectorAll('.filter-tab-btn[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter');

        // Update active tab button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Smooth filter transition on project cards
        projectCards.forEach((card, index) => {
          const cardCategory = card.getAttribute('data-category') || 'all';
          const matches = selectedFilter === 'all' || cardCategory.includes(selectedFilter);

          if (matches) {
            card.classList.remove('filter-hide');
            card.classList.add('filter-show');
            card.style.transitionDelay = `${index * 0.06}s`;
          } else {
            card.classList.remove('filter-show');
            card.classList.add('filter-hide');
            card.style.transitionDelay = '0s';
          }
        });
      });
    });
  }

  // 3. Animation Lab Filter Tabs in animations.html
  const animTabButtons = document.querySelectorAll('.anim-tab-btn[data-anim-filter]');
  const animCards = document.querySelectorAll('.anim-card');

  if (animTabButtons.length && animCards.length) {
    animTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-anim-filter');

        animTabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        animCards.forEach((card, idx) => {
          const concept = card.getAttribute('data-concept') || 'all';
          const matches = filterVal === 'all' || concept === filterVal;

          if (matches) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, idx * 40);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px) scale(0.96)';
            setTimeout(() => {
              if (!matches) card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }
}

/* ==========================================================================
   6. TYPING TEXT ANIMATION
   ========================================================================== */
function initTypingAnimation() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  // Professional roles specified in assignment brief
  const phrases = [
    'Computer Science Student',
    'Software Developer',
    'Future Software Engineer',
    'Technology Enthusiast',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  const pauseEnd = 2000;
  const pauseDelete = 600;

  function typeCycle() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Backspacing characters
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Typing characters
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Reached the end of phrase; pause before deleting
      typingSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting; move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = pauseDelete;
    }

    setTimeout(typeCycle, typingSpeed);
  }

  typeCycle();
}

/* ==========================================================================
   7. ENHANCED SCROLL REVEAL EFFECTS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );
  if (!revealElements.length) return;

  // Use IntersectionObserver with optimized threshold & rootMargin
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after revealing to ensure zero overhead after reveal
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   8. ANIMATED SKILL INDICATORS
   ========================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  function animateBars() {
    skillBars.forEach((bar) => {
      const targetPercent = bar.getAttribute('data-percentage') || '0%';
      bar.style.width = targetPercent;
    });
  }

  // Animate skill bars when they enter viewport
  if ('IntersectionObserver' in window) {
    const firstBar = skillBars[0];
    const skillContainer = firstBar.closest('.skills-grid') || firstBar.parentElement;

    if (skillContainer) {
      const skillObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateBars();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );

      skillObserver.observe(skillContainer);
    } else {
      animateBars();
    }
  } else {
    animateBars();
  }

  // Attach global reset/replay hook for the animations showcase page
  window.replaySkillBars = function () {
    skillBars.forEach((bar) => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });

    setTimeout(() => {
      skillBars.forEach((bar) => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        const targetPercent = bar.getAttribute('data-percentage') || '0%';
        bar.style.width = targetPercent;
      });
    }, 60);
  };
}

/* ==========================================================================
   9. IMAGE LIGHTBOX MODAL
   ========================================================================== */
function initImageLightbox() {
  const clickableImages = document.querySelectorAll('img[data-lightbox="true"], .clickable-img');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal || !modalImg) return;

  clickableImages.forEach((img) => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Image Preview';
      if (modalCaption) {
        modalCaption.textContent = img.getAttribute('data-caption') || img.alt || 'Image Preview';
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9b. MULTI-FORMAT IMAGE AUTO-FALLBACK (.png / .jpg / .jpeg)
   ========================================================================== */
function initImageFormatFallback() {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', function onImgError() {
      const src = this.getAttribute('src');
      if (!src) return;

      const attempts = parseInt(this.dataset.attempts || '0', 10);
      this.dataset.attempts = (attempts + 1).toString();

      // Attempt sequence: .png -> .jpg -> .jpeg -> fallback placeholder
      if (attempts === 0) {
        if (src.endsWith('.png')) {
          this.src = src.replace(/\.png$/, '.jpg');
        } else if (src.endsWith('.jpg')) {
          this.src = src.replace(/\.jpg$/, '.jpeg');
        } else if (src.endsWith('.jpeg')) {
          this.src = src.replace(/\.jpeg$/, '.png');
        }
      } else if (attempts === 1) {
        if (src.endsWith('.jpg')) {
          this.src = src.replace(/\.jpg$/, '.jpeg');
        } else if (src.endsWith('.jpeg')) {
          this.src = src.replace(/\.jpeg$/, '.png');
        } else if (src.endsWith('.png')) {
          this.src = src.replace(/\.png$/, '.jpg');
        }
      } else if (attempts === 2) {
        // Fallback to specific project images if original files not found
        if (src.includes('tonny')) this.src = 'images/tonny.png';
        else if (src.includes('voice')) this.src = 'images/voice.png';
        else if (src.includes('care')) this.src = 'images/care.png';
        else if (src.includes('funsa')) this.src = 'images/funsa.png';
        else if (src.includes('watch')) this.src = 'images/watch.png';
        else if (src.includes('robot')) this.src = 'images/robot.png';
        else if (src.includes('branding')) this.src = 'images/branding.png';
        else if (src.includes('sms')) this.src = 'images/sms.png';
        else if (src.includes('portfolio')) this.src = 'images/portfolio.png';
      }
    });
  });
}

/* ==========================================================================
   10. ANIMATION PLAYGROUND CONTROLS (FOR animations.html)
   ========================================================================== */
function initAnimationControls() {
  // Background animation toggle button
  const bgToggleBtn = document.getElementById('toggleBgAnimBtn');
  const animatedBgSandbox = document.getElementById('animatedBgSandbox');

  if (bgToggleBtn && animatedBgSandbox) {
    bgToggleBtn.addEventListener('click', () => {
      const isPaused = animatedBgSandbox.classList.toggle('paused');
      bgToggleBtn.textContent = isPaused ? 'Resume Background Animation' : 'Pause Background Animation';
    });
  }

  // Replay skills animation button
  const replaySkillsBtn = document.getElementById('replaySkillsBtn');
  if (replaySkillsBtn && typeof window.replaySkillBars === 'function') {
    replaySkillsBtn.addEventListener('click', () => {
      window.replaySkillBars();
    });
  }

  // Interactive typing controller
  const interactiveTypeBox = document.getElementById('customTypeOutput');
  const customTextInput = document.getElementById('customTextInput');
  const customTypeTrigger = document.getElementById('customTypeTrigger');

  if (interactiveTypeBox && customTextInput && customTypeTrigger) {
    let customTimer = null;

    customTypeTrigger.addEventListener('click', () => {
      const textToType = customTextInput.value.trim() || 'Software Developer & Problem Solver';
      interactiveTypeBox.textContent = '';
      let idx = 0;

      if (customTimer) clearInterval(customTimer);

      customTimer = setInterval(() => {
        if (idx < textToType.length) {
          interactiveTypeBox.textContent += textToType.charAt(idx);
          idx++;
        } else {
          clearInterval(customTimer);
        }
      }, 70);
    });
  }
}

/* ==========================================================================
   11. CLIPBOARD & UTILITY FUNCTIONS
   ========================================================================== */
function initClipboardUtils() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetText = btn.getAttribute('data-copy') || '';
      if (!targetText) return;

      navigator.clipboard
        .writeText(targetText)
        .then(() => {
          const originalText = btn.innerHTML;
          btn.textContent = 'Copied to clipboard!';
          btn.classList.add('copied');

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        })
        .catch(() => {
          alert(`Copy manually: ${targetText}`);
        });
    });
  });
}
