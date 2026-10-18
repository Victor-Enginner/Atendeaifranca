// ============================================================================
// ATENDE FRANCA — LIQUID GLASS HEADER & ACCESSIBLE MEGA MENU CONTROLLER
// Supports: Desktop hover + click, safe pointer bridge, single active panel,
// Escape & outside click close, keyboard arrows/focus, mobile accordion,
// and dynamic right-hand Showcase Card preview on item hover/focus.
// ============================================================================

(function () {
  const navHeader = document.querySelector('#site-header');
  const primaryNav = document.querySelector('#primary-navigation');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  if (!navHeader || !primaryNav || !mobileToggle) return;

  const desktopNav = window.matchMedia('(min-width: 1151px)');
  const hoverNav = window.matchMedia('(hover: hover) and (pointer: fine)');
  const navTriggers = [...document.querySelectorAll('.nav-trigger')];
  let activeNav = null;
  let closeNavTimer = null;

  // Sticky Liquid Glass scroll state
  function updateHeaderScroll() {
    if (window.scrollY > 18) {
      navHeader.classList.add('is-scrolled');
    } else {
      navHeader.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  function closeMega(restoreFocus = false) {
    clearTimeout(closeNavTimer);
    if (!activeNav) return;
    const previous = activeNav;
    const panelId = previous.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) panel.hidden = true;
    previous.setAttribute('aria-expanded', 'false');
    activeNav = null;
    if (restoreFocus) previous.focus();
  }

  function openMega(trigger) {
    clearTimeout(closeNavTimer);
    if (activeNav === trigger) return;
    closeMega(false);
    activeNav = trigger;
    const panelId = trigger.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) {
      panel.hidden = false;
    }
    trigger.setAttribute('aria-expanded', 'true');
  }

  function syncNavLayout() {
    closeMega(false);
    primaryNav.classList.remove('mobile-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    const isDesktop = desktopNav.matches;
    document.querySelectorAll('.category-toggle').forEach((button, idx) => {
      button.disabled = isDesktop;
      // On desktop all 3 columns are expanded; on mobile first category of each menu starts expanded
      const defaultOpen = isDesktop ? true : idx % 3 === 0;
      button.setAttribute('aria-expanded', String(defaultOpen));
      const contentId = button.getAttribute('aria-controls');
      const contentEl = contentId ? document.getElementById(contentId) : null;
      if (contentEl) contentEl.hidden = !defaultOpen;
    });
  }

  navTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      if (activeNav === trigger) {
        closeMega(false);
      } else {
        openMega(trigger);
      }
    });

    trigger.addEventListener('pointerenter', () => {
      if (desktopNav.matches && hoverNav.matches) {
        openMega(trigger);
      }
    });

    trigger.addEventListener('keydown', (event) => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openMega(trigger);
        panel?.querySelector('.category-content a')?.focus();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        closeMega(false);
        const dir = event.key === 'ArrowRight' ? 1 : -1;
        const nextTrigger = navTriggers[(index + dir + navTriggers.length) % navTriggers.length];
        nextTrigger?.focus();
      }
    });
  });

  // Keep panel open while pointer moves between header bar and mega panel
  navHeader.addEventListener('pointerenter', () => clearTimeout(closeNavTimer));
  navHeader.addEventListener('pointerleave', () => {
    if (desktopNav.matches && hoverNav.matches) {
      closeNavTimer = setTimeout(() => {
        if (!activeNav) return;
        const panel = document.getElementById(activeNav.getAttribute('aria-controls'));
        if (!panel || !panel.contains(document.activeElement)) {
          closeMega(false);
        }
      }, 220);
    }
  });

  document.querySelectorAll('.mega-panel').forEach((panel) => {
    panel.addEventListener('pointerenter', () => clearTimeout(closeNavTimer));

    // Keyboard navigation inside mega panel links
    panel.addEventListener('keydown', (event) => {
      const links = [...panel.querySelectorAll('.category-content a, .mega-footer-links a')];
      const currentIdx = links.indexOf(document.activeElement);
      if (currentIdx === -1) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        links[(currentIdx + 1) % links.length]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        links[(currentIdx - 1 + links.length) % links.length]?.focus();
      }
    });

    // Dynamic Showcase Card preview when hovering/focusing items inside the Mega Menu
    const showcaseImg = panel.querySelector('.mega-showcase-media img');
    const showcaseTag = panel.querySelector('.mega-showcase-tag span');
    const showcaseTitle = panel.querySelector('.mega-showcase h4');
    const showcaseDesc = panel.querySelector('.mega-showcase p');
    const showcaseLink = panel.querySelector('.mega-showcase-cta');

    panel.querySelectorAll('.category-content > a[data-preview-title]').forEach((item) => {
      const updateShowcase = () => {
        if (showcaseImg && item.dataset.previewImg) {
          showcaseImg.src = item.dataset.previewImg;
          showcaseImg.alt = item.dataset.previewTitle || '';
        }
        if (showcaseTag && item.dataset.previewTag) {
          showcaseTag.textContent = item.dataset.previewTag;
        }
        if (showcaseTitle && item.dataset.previewTitle) {
          showcaseTitle.textContent = item.dataset.previewTitle;
        }
        if (showcaseDesc && item.dataset.previewDesc) {
          showcaseDesc.textContent = item.dataset.previewDesc;
        }
        if (showcaseLink && item.getAttribute('href')) {
          showcaseLink.setAttribute('href', item.getAttribute('href'));
        }
      };
      item.addEventListener('pointerenter', updateShowcase);
      item.addEventListener('focus', updateShowcase);
    });
  });

  // Mobile category accordion toggle
  document.querySelectorAll('.category-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      if (desktopNav.matches) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const parentPanel = button.closest('.mega-panel');
      // Optional: accordion behavior within the same mega panel on mobile
      if (!expanded && parentPanel) {
        parentPanel.querySelectorAll('.category-toggle').forEach((other) => {
          if (other !== button) {
            other.setAttribute('aria-expanded', 'false');
            const otherContent = document.getElementById(other.getAttribute('aria-controls'));
            if (otherContent) otherContent.hidden = true;
          }
        });
      }
      button.setAttribute('aria-expanded', String(!expanded));
      const contentEl = document.getElementById(button.getAttribute('aria-controls'));
      if (contentEl) contentEl.hidden = expanded;
    });
  });

  // Mobile menu drawer toggle
  mobileToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = mobileToggle.getAttribute('aria-expanded') !== 'true';
    mobileToggle.setAttribute('aria-expanded', String(open));
    primaryNav.classList.toggle('mobile-open', open);
    if (!open) closeMega(false);
  });

  // Close on outside click
  document.addEventListener('click', (event) => {
    if (!navHeader.contains(event.target)) {
      closeMega(false);
      primaryNav.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (activeNav) {
      closeMega(true);
    } else if (primaryNav.classList.contains('mobile-open')) {
      primaryNav.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
  });

  // Close when focus leaves header completely
  navHeader.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!navHeader.contains(document.activeElement)) {
        closeMega(false);
      }
    });
  });

  // Close menu when any anchor inside primaryNav is clicked
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMega(false);
      primaryNav.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  desktopNav.addEventListener('change', syncNavLayout);
  syncNavLayout();

  // Support optional ?menu=produtos|solucoes|agentes|empresa|planos|parceiros query param
  const initialMenu = new URLSearchParams(window.location.search).get('menu');
  if (initialMenu) {
    const targetTrigger = document.querySelector(`.nav-trigger[aria-controls="menu-${initialMenu}"]`);
    if (targetTrigger) openMega(targetTrigger);
  }
})();
