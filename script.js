document.addEventListener("DOMContentLoaded", () => {
  // ─── DOM REGISTRY ───
  const nav = document.getElementById("main-nav");
  const scrollCta = document.getElementById("scroll-to-gallery");
  const filterChips = document.querySelectorAll(".filter-chip");
  const galleryCards = document.querySelectorAll(".gallery-card");
  const galleryScroller = document.getElementById("gallery-scroller");
  const parallaxBg = document.getElementById("parallax-bg");
  const dividerSection = document.getElementById("parallax-divider");
  const lightbox = document.getElementById("media-lightbox");
  const lightboxDisplay = document.getElementById("lightbox-display");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxSubtext = document.getElementById("lightbox-subtext");
  const closeLightbox = document.getElementById("close-lightbox");
  const systemToast = document.getElementById("system-toast");
  const toastTxt = document.getElementById("toast-txt");

  // SIDEBAR DOM REGISTRY
  const openSidebarBtn = document.getElementById("open-sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("side-sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sb-link");

  // BENTO GRID DOM REGISTRY
  const bentoItems = document.querySelectorAll("[data-bento]");

  // WHATSAPP WIDGET DOM REGISTRY
  const waBubble = document.getElementById("wa-bubble");
  const waCard = document.getElementById("wa-card");
  const waCardClose = document.getElementById("wa-card-close");

  // ─── SMART SCROLL NAVIGATION STYLING ───
  window.addEventListener("scroll", () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add("scrolled-view");
    } else {
      nav.classList.remove("scrolled-view");
    }
  });

  if (scrollCta) {
    scrollCta.addEventListener("click", () => {
      const galleryTarget = document.getElementById("unified-gallery");
      if (galleryTarget) galleryTarget.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ─── SIDEBAR OPEN / CLOSE ENGINE ───
  function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
    if (openSidebarBtn) openSidebarBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
    if (openSidebarBtn) openSidebarBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (openSidebarBtn) openSidebarBtn.addEventListener("click", openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);
  sidebarLinks.forEach((link) => link.addEventListener("click", closeSidebar));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) closeSidebar();
  });

  // ─── UNIFIED SINGLE-GALLERY FILTER ENGINE ───
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const activeCriteria = chip.getAttribute("data-filter");

      galleryCards.forEach((card) => {
        const structuralTags = card.getAttribute("data-tags");

        if (activeCriteria === "all") {
          card.classList.remove("filter-hide");
        } else if (
          structuralTags &&
          structuralTags.toLowerCase().includes(activeCriteria.toLowerCase())
        ) {
          card.classList.remove("filter-hide");
        } else {
          card.classList.add("filter-hide");
        }
      });

      if (galleryScroller) galleryScroller.scrollTo({ left: 0, behavior: "smooth" });
    });
  });

  // ─── INTERSECTION OBSERVER FOR SCROLL REVEALS ───
  const revealItems = document.querySelectorAll(".reveal");
  const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -30px 0px" };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealItems.forEach((item) => revealObserver.observe(item));

  // ─── BENTO GRID STAGGERED REVEAL ENGINE ───
  if (bentoItems.length > 0) {
    const bentoObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(bentoItems).indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(index, 8) * 90}ms`;
            entry.target.classList.add("bento-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    bentoItems.forEach((item) => bentoObserver.observe(item));
  }

  // ─── ULTRA-SMOOTH PARALLAX ENGINE ───
  window.addEventListener("scroll", () => {
    if (!dividerSection || !parallaxBg) return;

    const bounds = dividerSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (bounds.top < windowHeight && bounds.bottom > 0) {
      const scrollSpeedCoefficient = 0.25;
      const yOffset = (windowHeight - bounds.top) * scrollSpeedCoefficient;
      parallaxBg.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    }
  });

  // ─── PHOTO GALLERY INTERACTION & LIGHTBOX ENGINE ───
  function openLightboxFromBox(targetCardBox, fallbackTitle, fallbackPrice) {
    const title = targetCardBox.getAttribute("data-name") || fallbackTitle || "PeachBay Piece";
    const price = targetCardBox.getAttribute("data-price") || fallbackPrice || "";
    const imgElement = targetCardBox.querySelector("img");
    if (!imgElement) return;
    const staticImgSrc = imgElement.getAttribute("src");

    lightboxTitle.textContent = title;
    lightboxSubtext.textContent = price;
    lightboxDisplay.innerHTML = `
      <img src="${staticImgSrc}" alt="${title}" class="lightbox-render-node" style="width:100%; height:100%; object-fit:cover;" />
    `;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (galleryScroller) {
    galleryScroller.addEventListener("click", (e) => {
      const targetCardBox = e.target.closest(".card-media-box");
      if (!targetCardBox) return;

      const title = targetCardBox.getAttribute("data-name") || "PeachBay Piece";

      if (e.target.closest(".shop-now-ico-btn")) {
        e.stopPropagation();
        launchNotificationToast(`"${title}" added to your shortlist.`);
        return;
      }

      openLightboxFromBox(targetCardBox);
    });
  }

  // Bento items also open the lightbox on click
  bentoItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.querySelector("h3")?.textContent || "PeachBay Piece";
      const price = item.querySelector(".bento-price")?.textContent || "";
      const imgElement = item.querySelector("img");
      if (!imgElement) return;

      lightboxTitle.textContent = title;
      lightboxSubtext.textContent = price;
      lightboxDisplay.innerHTML = `
        <img src="${imgElement.getAttribute("src")}" alt="${title}" class="lightbox-render-node" style="width:100%; height:100%; object-fit:cover;" />
      `;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  // ─── LIGHTBOX VISUAL WINDOW CONTROLLER ───
  function shutDownLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxDisplay.innerHTML = "";
    document.body.style.overflow = "";
  }

  if (closeLightbox) closeLightbox.addEventListener("click", shutDownLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) shutDownLightbox();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      shutDownLightbox();
    }
  });

  // ─── WHATSAPP FLOATING WIDGET ───
  function openWaCard() {
    waCard.classList.add("open");
    waCard.setAttribute("aria-hidden", "false");
  }
  function closeWaCard() {
    waCard.classList.remove("open");
    waCard.setAttribute("aria-hidden", "true");
  }
  if (waBubble) {
    waBubble.addEventListener("click", () => {
      if (waCard.classList.contains("open")) closeWaCard();
      else openWaCard();
    });
  }
  if (waCardClose) waCardClose.addEventListener("click", closeWaCard);

  // Auto-peek the WhatsApp card once, a few seconds after first load
  setTimeout(() => {
    if (waCard && !waCard.classList.contains("open")) openWaCard();
  }, 4500);

  // ─── TOAST NOTIFICATION UTILITIES ───
  let toastTimeoutReference;
  function launchNotificationToast(msgStr) {
    if (!systemToast || !toastTxt) return;
    toastTxt.textContent = msgStr;
    systemToast.classList.add("show");
    clearTimeout(toastTimeoutReference);
    toastTimeoutReference = setTimeout(() => {
      systemToast.classList.remove("show");
    }, 3500);
  }

  // ─── GRACEFUL IMAGE FALLBACK (hot-linked photography) ───
  document.querySelectorAll("img.ph-img").forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("broken");
      const box = img.closest(".card-media-box, .bento-media, .hero-media-wrap, .parallax-media-wrap");
      if (box) box.classList.add("img-fallback-bg");
    });
  });
});
