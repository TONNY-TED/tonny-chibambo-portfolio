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
 *
 * THIS FILE PROVIDES ALL INTERACTIVE BEHAVIOR FOR THE TONNY CHIBAMBO PORTFOLIO WEBSITE.
 * EACH FUNCTION IS SELF-CONTAINED AND RESPONSIBLE FOR A SPECIFIC UI MODULE.
 * SEE THE COMMENTS BELOW FOR DETAILED IMPLEMENTATION NOTES.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules when the page has finished loading
  // This ensures the DOM is fully available before any script runs
  initNavigation();           // 1. Mobile menu & navbar behavior
  initScrollReadingProgress(); // 2. Scroll progress bar & header dynamics
  initBackToTop();            // 3. Floating "Back to Top" button
  initPageTransitions();      // 4. Smooth cross-fade page navigation
  initTabTransitions();       // 5. Tab category switchers (projects & animations)
  initTypingAnimation();      // 6. Typing text animation in hero section
  initScrollReveal();         // 7. Intersection Observer for reveal-on-scroll effects
  initSkillBars();            // 8. Animated skill progress bars
  initImageLightbox();        // 9. Image click-to-zoom lightbox modal
  initImageFormatFallback();  // 9b. Automatic .png/.jpg/.jpeg image format fallback
  initAnimationControls();    // 10. Animation playground controls (animations.html)
  initClipboardUtils();       // 11. Copy-to-clipboard utility for contact info
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ==========================================================================
   PURPOSE: Handles mobile menu toggling, active link highlighting, and keyboard
   accessibility for the navigation bar.
   FEATURES:
   - Toggle menu open/close on hamburger button click
   - Close menu when clicking a nav link, outside the menu, or pressing ESC
   - Highlight the active navigation link based on current page
   - Manage body scroll lock when menu is open
========================================================================== */

function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Early exit if essential elements are missing from the DOM
  if (!navToggle || !navMenu) return;

  // =========================================================================
  // TOGGLE MOBILE MENU ON BUTTON CLICK
  // =========================================================================
  // When the hamburger button is clicked, determine the current expanded state
  // and pass the opposite state to toggleMenu() so it opens if closed, or closes
  // if already open.
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // =========================================================================
  // CLOSE MENU WHEN CLICKING NAVIGATION LINKS
  // =========================================================================
  // Each nav link closes the mobile menu when clicked, which is useful on
  // mobile devices where the menu covers the main content.
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // =========================================================================
  // CLOSE MENU WHEN CLICKING OUTSIDE
  // =========================================================================
  // Listens for clicks anywhere on the page. If the menu is open and the user
  // clicks outside both the menu and the toggle button, the menu closes.
  // This prevents the menu from staying open when clicking elsewhere on the page.
  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // =========================================================================
  // CLOSE MENU ON ESC KEY PRESS
  // =========================================================================
  // Accessibility feature: pressing the Escape key while the menu is open
  // will close the menu and return focus to the toggle button.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      navToggle.focus();
    }
  });

  // =========================================================================
  // TOGGLE MENU INTERNAL FUNCTION
  // =========================================================================
  // Updates the DOM classes and attributes to show/hide the mobile menu.
  // Also controls body overflow to prevent scrolling when the menu is open.
  function toggleMenu(open) {
    navToggle.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // =========================================================================
  // ACTIVE NAVIGATION LINK DETECTION
  // =========================================================================
  // Determines which navigation link should be marked as "active" based on
  // the current page URL pathname. This helps users understand their current
  // location within the site.
  highlightActiveNavLink(navLinks);
}

function highlightActiveNavLink(links) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    // Match the link's href against the current path, handling the root path case
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   2. SCROLL READING PROGRESS & HEADER DYNAMICS
   ==========================================================================
   PURPOSE: Creates a top-of-page scroll progress bar and dynamically adjusts
   the header elevation based on scroll position. This gives users visual
   feedback on how far they've scrolled through the page.
   KEY FEATURES:
   - Progress bar fills from 0% to 100% as user scrolls
   - Header gets a "scrolled" class when past 25px for styling changes
   - Passive event listener for better scroll performance
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

    // Update progress bar width, constrained between 0% and 100%
    progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;

    // Dynamic header elevation: add 'scrolled' class when past 25px
    if (siteHeader) {
      if (scrollTop > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on page load to set initial state
  onScroll();
}

/* ==========================================================================
   3. FLOATING BACK TO TOP BUTTON
   ==========================================================================
   PURPOSE: Provides a floating button that appears after the user scrolls past
   a threshold (300px) and allows smooth scrolling back to the top of the page.
   KEY FEATURES:
   - Button fades in after scrolling down 300px
   - Smooth scroll-to-top animation when clicked
   - Accessible with aria-label for screen readers
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
  // Check on page load in case user starts past 300px
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
   ==========================================================================
   PURPOSE: Intercepts local HTML page navigation links to provide a smooth
   cross-fade transition between pages. This creates a more polished user
   experience instead of instant page jumps.
   KEY FEATURES:
   - Visual progress bar sweep during transition
   - Body 'page-leaving' class for fade-out effect
   - Skips external links, mailto, hash anchors, and new tabs
   - 180ms delay before actual navigation occurs
========================================================================== */

function initPageTransitions() {
  // Select all internal HTML navigation links and nav-link elements
  const internalLinks = document.querySelectorAll('a[href$=".html"], a.nav-link');
  const progressBar = document.getElementById('scrollProgressBar');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetHref = link.getAttribute('href');

      // Skip links that shouldn't trigger a transition:
      // - No href (might be a button or placeholder)
      // - Hash anchors on the same page (e.g., #section)
      // - mailto: links
      // - External http:// or https:// links
      // - Protocol-relative // links
      // - Links targeting a new tab/window
      // - Modifier keys: Ctrl, Cmd, Shift
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
      const cleanTarget = targetHref.split('#')[0]; // Remove any hash fragment

      if (cleanTarget && cleanTarget !== currentPath) {
        event.preventDefault();

        // Visual progress bar sweep animation
        if (progressBar) {
          progressBar.style.transition = 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
          progressBar.style.width = '100%';
        }

        // Apply smooth exit transition to body
        document.body.classList.add('page-leaving');

        // Actually navigate after a short delay (180ms)
        setTimeout(() => {
          window.location.href = targetHref;
        }, 180);
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TABS & CATEGORY SWITCHERS (SMOOTH TRANSITIONS)
   ==========================================================================
   PURPOSE: Handles tab category switching for both the about page section
   tabs and the project/animation filters. Provides smooth visual transitions
   when filtering content.
   KEY FEATURES:
   - Cross-fade panel transitions with staggered delays
   - Project category filtering with hover/animation effects
   - Animation lab concept tab filtering
   - Active button state management
========================================================================== */

function initTabTransitions() {
  // =========================================================================
  // 1. GENERAL PANEL-BASED TABS
  // =========================================================================
  // Finds all containers with .tab-button[data-tab-target] and their associated
  // .tab-panel elements. When a tab button is clicked, the corresponding panel
  // becomes active with a cross-fade effect.
  const tabContainers = document.querySelectorAll('.tab-container');

  tabContainers.forEach((container) => {
    const tabButtons = container.querySelectorAll('.tab-btn[data-tab-target]');
    const tabPanels = container.querySelectorAll('.tab-panel');

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');

        // Remove active class from all buttons, add to clicked button
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Cross-fade tab panels: show target, hide others
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

  // =========================================================================
  // 2. PROJECT FILTER TABS IN projects.html
  // =========================================================================
  // Filters project cards by category. When a filter button is clicked,
  // project cards matching the category show up, others hide with transition
  // delays for staggered effect.
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

  // =========================================================================
  // 3. ANIMATION LAB FILTER TABS IN animations.html
  // =========================================================================
  // Filters animation concept cards by category (text, hover, background, skills, scroll).
  // Cards fade in/out with transform animation and staggered delays.
  const animTabButtons = document.querySelectorAll('.anim-tab-btn[data-anim-filter]');
  const animCards = document.querySelectorAll('.anim-card');

  if (animTabButtons.length && animCards.length) {
    animTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-anim-filter');

        // Update active tab button state
        animTabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        animCards.forEach((card, idx) => {
          const concept = card.getAttribute('data-concept') || 'all';
          const matches = filterVal === 'all' || concept === filterVal;

          if (matches) {
            card.style.display = 'block';
            // Staggered fade-in and slide-up animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, idx * 40);
          } else {
            // Fade out and slide down
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px) scale(0.96)';
            // Actually hide after animation completes
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
   ==========================================================================
   PURPOSE: Creates a continuous typing and deleting animation cycle for the
   hero section's typewriter text. Cycles through an array of professional
   role phrases, simulating a typing effect followed by backspace deletion.
   KEY FEATURES:
   - Types characters one by one at 100ms speed
   - Pauses 2 seconds at the end of each phrase before deleting
   - Deletes characters at 50ms speed
   - Loops continuously through all phrases
   - Non-blocking setTimeout-based implementation
========================================================================== */

function initTypingAnimation() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  // Professional roles specified in assignment brief
  // These phrases will be cycled through in the typewriter animation
  const phrases = [
    'Computer Science Student',
    'Software Developer',
    'Future Software Engineer',
    'Technology Enthusiast',
  ];

  let phraseIndex = 0;      // Current phrase index in the array
  let charIndex = 0;        // Current character index within the phrase
  let isDeleting = false;   // Flag to track whether we're deleting or typing
  let typingSpeed = 100;    // Typing speed in ms (100 = fast, lower = slower)
  const pauseEnd = 2000;    // Pause at end of typing before deleting (2s)
  const pauseDelete = 600;  // Pause after deletion before next phrase (600ms)

  function typeCycle() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // --- DELETING PHASE ---
      // Remove one character at a time
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;    // Faster deletion speed
    } else {
      // --- TYPING PHASE ---
      // Add one character at a time
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;   // Normal typing speed
    }

    // =====================================================================
    // CHECK FOR PHRASE ENDS AND SWITCH MODES
    // =====================================================================
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Reached the end of a full phrase; switch to deleting mode
      typingSpeed = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting all characters; move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Loop around
      typingSpeed = pauseDelete;
    }

    // =====================================================================
    // SCHEDULE NEXT CYCLE FRAME
    // =====================================================================
    setTimeout(typeCycle, typingSpeed);
  }

  // Start the animation loop
  typeCycle();
}

/* ==========================================================================
   7. ENHANCED SCROLL REVEAL EFFECTS (INTERSECTION OBSERVER)
   ==========================================================================
   PURPOSE: Triggers reveal animations when page elements enter the viewport
   using the IntersectionObserver API. This is more performant than scroll
   event listeners and allows for staggered reveal effects.
   KEY FEATURES:
   - Threshold of 12% of element visible triggers the reveal
   - rootMargin of -30px triggers slightly earlier for smoother UX
   - Auto-unobserves after reveal to reduce overhead
   - Fallback for browsers without IntersectionObserver support
   - Supports multiple reveal classes: .reveal, .reveal-left, .reveal-right, .reveal-scale
========================================================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );
  if (!revealElements.length) return;

  // Use IntersectionObserver if the browser supports it
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'active' class to trigger CSS animation
            entry.target.classList.add('active');
            // Unobserve after revealing to ensure zero overhead after animation plays
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Use the viewport as the observation root
        root: null,
        // Trigger when 12% of the element is visible in the viewport
        threshold: 0.12,
        // Add extra margin: -30px at the bottom means element triggers
        // when it's 30px before entering viewport (earlier reveal)
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers that don't support IntersectionObserver
    // Simply add the 'active' class to all reveal elements immediately
    revealElements.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   8. ANIMATED SKILL INDICATORS
   ==========================================================================
   PURPOSE: Animates skill progress bars from 0% to their target percentage
   when the skill section enters the viewport. Uses IntersectionObserver for
   better performance than scroll event listeners.
   KEY FEATURES:
   - Bars animate from width: 0% to data-percentage target
   - Smooth cubic-bezier easing over 1.2s
   - Auto-triggers when skill section scrolls into view
   - Global replay function for animation showcase (window.replaySkillBars)
   - Respects user performance preferences
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
              // Stop observing after animation runs once
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 } // Trigger when 18% of container is visible
      );

      skillObserver.observe(skillContainer);
    } else {
      // Fallback: animate immediately if no container found
      animateBars();
    }
  } else {
    // Fallback for browsers without IntersectionObserver
    animateBars();
  }

  // Attach global reset/replay hook for the animations showcase page
  // This allows the animations.html page to reset and re-animate skill bars
  window.replaySkillBars = function () {
    skillBars.forEach((bar) => {
      // Instantly reset to 0% with no transition
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });

    // Wait a moment, then animate back to target percentages with smooth transition
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
   ==========================================================================
   PURPOSE: Creates a modal image lightbox that opens when users click on
   clickable images throughout the portfolio. Provides an enlarged view
   with caption and close functionality.
   KEY FEATURES:
   - Opens modal on image click
   - Displays image source and alt text as caption
   - Closes on button click, modal click, or Escape key
   - Disables body scrolling while modal is open
   - Accessible with aria labels and proper focus management
========================================================================== */

function initImageLightbox() {
  const clickableImages = document.querySelectorAll('img[data-lightbox="true"], .clickable-img');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  // Early exit if modal elements don't exist in the DOM
  if (!modal || !modalImg) return;

  clickableImages.forEach((img) => {
    img.addEventListener('click', () => {
      // Set the modal image source to the clicked image's source
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Image Preview';
      // Update caption if caption element exists
      if (modalCaption) {
        modalCaption.textContent = img.getAttribute('data-caption') || img.alt || 'Image Preview';
      }
      // Open the modal: add 'open' class and update aria-hidden state
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      // Disable body scrolling while modal is open
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close button event listener
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Click outside the image to close the modal
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9b. MULTI-FORMAT IMAGE AUTO-FALLBACK (.png / .jpg / .jpeg)
   ==========================================================================
   PURPOSE: Provides automatic image format fallback when an image fails to load.
   Cycles through .png -> .jpg -> .jpeg -> .png formats, and finally falls back
   to specific project placeholder images if the original file is not found.
   KEY FEATURES:
   - On-image error handler that attempts format conversion
   - Sequences through png → jpg → jpeg → png
   - Project-specific fallback images (tonny, voice, care, funsa, watch, robot, branding, sms, portfolio)
   - Prevents infinite error loops with attempt counter
   - Improves compatibility across different browser/image hosting scenarios
========================================================================== */

function initImageFormatFallback() {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', function onImgError() {
      const src = this.getAttribute('src');
      if (!src) return;

      // Track how many times this error handler has fired for this image
      const attempts = parseInt(this.dataset.attempts || '0', 10);
      this.dataset.attempts = (attempts + 1).toString();

      // Format conversion sequence based on attempt count
      if (attempts === 0) {
        // First attempt: png -> jpg -> jpeg -> png
        if (src.endsWith('.png')) {
          this.src = src.replace(/\.png$/, '.jpg');
        } else if (src.endsWith('.jpg')) {
          this.src = src.replace(/\.jpg$/, '.jpeg');
        } else if (src.endsWith('.jpeg')) {
          this.src = src.replace(/\.jpeg$/, '.png');
        }
      } else if (attempts === 1) {
        // Second attempt: jpg -> jpeg -> png -> jpg
        if (src.endsWith('.jpg')) {
          this.src = src.replace(/\.jpg$/, '.jpeg');
        } else if (src.endsWith('.jpeg')) {
          this.src = src.replace(/\.jpeg$/, '.png');
        } else if (src.endsWith('.png')) {
          this.src = src.replace(/\.png$/, '.jpg');
        }
      } else if (attempts === 2) {
        // Third attempt: fall back to project-specific placeholder images
        // Match the image by filename keyword and replace with known-good placeholder
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
   ==========================================================================
   PURPOSE: Provides interactive controls for the animation playground page
   (animations.html). Includes background animation toggle, skill bar replay,
   and custom text typing control.
   KEY FEATURES:
   - Background animation pause/resume toggle
   - Skills animation replay button
   - Custom text typing input and trigger
   - Integrates with window.replaySkillBars for skill bar resetting
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
   ==========================================================================
   PURPOSE: Handles copy-to-clipboard functionality for contact information
   (email, GitHub, LinkedIn) throughout the portfolio. Provides visual
   feedback when text is successfully copied.
   KEY FEATURES:
   - Copies target text to system clipboard via navigator.clipboard
   - Shows temporary "Copied to clipboard!" feedback text
   - Falls back to alert() if clipboard API is not available
   - Works for email links, GitHub profiles, and social media info
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
          // Store original button content, show success message
          const originalText = btn.innerHTML;
          btn.textContent = 'Copied to clipboard!';
          btn.classList.add('copied');

          // Reset button after 2 seconds
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        })
        .catch(() => {
          // Fallback if clipboard API fails (e.g., insecure context)
          alert(`Copy manually: ${targetText}`);
        });
    });
  });
}
