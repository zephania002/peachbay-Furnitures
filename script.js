document.addEventListener('DOMContentLoaded', () => {

  // ─── DOM REGISTRY ───
  const nav = document.getElementById('main-nav');
  const scrollCta = document.getElementById('scroll-to-gallery');
  const filterChips = document.querySelectorAll('.filter-chip');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryScroller = document.getElementById('gallery-scroller');
  const parallaxBg = document.getElementById('parallax-bg');
  const dividerSection = document.getElementById('parallax-divider');
  const lightbox = document.getElementById('media-lightbox');
  const lightboxDisplay = document.getElementById('lightbox-display');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtext = document.getElementById('lightbox-subtext');
  const closeLightbox = document.getElementById('close-lightbox');
  const systemToast = document.getElementById('system-toast');
  const toastTxt = document.getElementById('toast-txt');

  // ─── SMART SCROLL NAVIGATION STYLING ───
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled-view');
    } else {
      nav.classList.remove('scrolled-view');
    }
  });

  if (scrollCta) {
    scrollCta.addEventListener('click', () => {
      const galleryTarget = document.getElementById('unified-gallery');
      if (galleryTarget) {
        galleryTarget.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ─── UNIFIED SINGLE-GALLERY FILTER ENGINE ───
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const activeCriteria = chip.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const structuralTags = card.getAttribute('data-tags');
        
        if (activeCriteria === 'all') {
          card.classList.remove('filter-hide');
        } else {
          if (structuralTags && structuralTags.toLowerCase().includes(activeCriteria.toLowerCase())) {
            card.classList.remove('filter-hide');
          } else {
            card.classList.add('filter-hide');
          }
        }
      });
      
      // Return scroll deck seamlessly back to index position 0
      if (galleryScroller) {
        galleryScroller.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });

  // ─── INTERSECTION OBSERVER FOR SCROLL REVEALS ───
  const revealItems = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealItems.forEach(item => revealObserver.observe(item));

  // ─── ULTRA-SMOOTH PARALLAX ENGINE ───
  window.addEventListener('scroll', () => {
    if (!dividerSection || !parallaxBg) return;

    const bounds = dividerSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Execute performance calculations safely only when element crosses viewport boundaries
    if (bounds.top < windowHeight && bounds.bottom > 0) {
      const scrollSpeedCoefficient = 0.35;
      // Calculate delta offsets relative to viewport movement
      const yOffset = (windowHeight - bounds.top) * scrollSpeedCoefficient;
      parallaxBg.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    }
  });

  // ─── PHOTO GALLERY INTERACTION & LIGHTBOX ENGINE ───
  if (galleryScroller) {
    galleryScroller.addEventListener('click', (e) => {
      const targetCardBox = e.target.closest('.card-media-box');
      if (!targetCardBox) return;

      const title = targetCardBox.getAttribute('data-name') || 'Aura Piece';
      const price = targetCardBox.getAttribute('data-price') || '';

      // Intercept direct Shop Now icon click events separately from standard lightboxes
      if (e.target.closest('.shop-now-ico-btn')) {
        e.stopPropagation();
        launchNotificationToast(`Routing order processing checkout for: "${title}".`);
        return;
      }

      // Safe check for the image element before extracting its src attribute
      const imgElement = targetCardBox.querySelector('.gallery-img');
      if (!imgElement) return;
      const staticImgSrc = imgElement.getAttribute('src');

      // Inject static image node instantly into modal view frame
      lightboxTitle.textContent = title;
      lightboxSubtext.textContent = price;
      lightboxDisplay.innerHTML = `
        <img src="${staticImgSrc}" alt="${title}" class="lightbox-render-node" style="width:100%; height:100%; object-fit:contain;" />
      `;

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  // ─── LIGHTBOX VISUAL WINDOW CONTROLLER ───
  function shutDownLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxDisplay.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeLightbox) closeLightbox.addEventListener('click', shutDownLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) shutDownLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      shutDownLightbox();
    }
  });

  // ─── TOAST NOTIFICATION UTILITIES ───
  let toastTimeoutReference;
  function launchNotificationToast(msgStr) {
    if (!systemToast || !toastTxt) return;
    
    toastTxt.textContent = msgStr;
    systemToast.classList.add('show');

    clearTimeout(toastTimeoutReference);
    toastTimeoutReference = setTimeout(() => {
      systemToast.classList.remove('show');
    }, 3500);
  }
});