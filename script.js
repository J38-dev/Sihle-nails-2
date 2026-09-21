/* =========================================================
   SIHLE NAILS
   PREMIUM LANDING PAGE JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     ELEMENTS
     ------------------------------------------------------- */

  const body = document.body;

  const loader = document.querySelector(".page-loader");

  const header = document.querySelector(".site-header");

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  const mobileMenuLinks = document.querySelectorAll(
    ".mobile-menu a"
  );

  const navLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"]'
  );

  const allAnchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  const mobileBookingBar = document.querySelector(
    ".mobile-booking-bar"
  );

  const sections = document.querySelectorAll(
    "section[id]"
  );

  const galleryImages = document.querySelectorAll(
    ".gallery-item img"
  );

  const serviceImages = document.querySelectorAll(
    ".service-image img"
  );

  const heroImage = document.querySelector(
    ".hero-media img"
  );


  /* =======================================================
     02. PAGE LOADER
     ======================================================= */

  const hideLoader = () => {

    if (!loader) return;

    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  };


  /*
   * Hide when the entire page has loaded.
   */

  if (document.readyState === "complete") {

    setTimeout(hideLoader, 300);

  } else {

    window.addEventListener(
      "load",
      () => {
        setTimeout(hideLoader, 300);
      },
      { once: true }
    );

  }


  /*
   * Safety fallback.
   * The website will never stay stuck on the loader.
   */

  setTimeout(hideLoader, 3500);


  /* =======================================================
     03. MOBILE MENU
     ======================================================= */

  const openMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    body.classList.add("menu-open");
  };


  const closeMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    body.classList.remove("menu-open");
  };


  const toggleMenu = () => {

    if (!menuToggle || !mobileMenu) return;

    const isOpen =
      mobileMenu.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };


  if (menuToggle) {

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    menuToggle.addEventListener(
      "click",
      toggleMenu
    );

  }


  /*
   * Close mobile menu after clicking a link.
   */

  mobileMenuLinks.forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  /*
   * Close menu when clicking outside.
   */

  document.addEventListener("click", (event) => {

    if (!mobileMenu || !menuToggle) return;

    const clickedInsideMenu =
      mobileMenu.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (
      mobileMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      closeMenu();
    }

  });


  /*
   * Close menu with Escape.
   */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* =======================================================
     04. HEADER SCROLL EFFECT
     ======================================================= */

  let lastScrollY = window.scrollY;

  const updateHeader = () => {

    if (!header) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

    lastScrollY = currentScrollY;
  };


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     05. MOBILE BOOKING BAR
     ======================================================= */

  let lastBookingScroll = window.scrollY;

  const updateBookingBar = () => {

    if (!mobileBookingBar) return;

    const currentScroll =
      window.scrollY;

    /*
     * Don't show the sticky bar immediately
     * at the very top of the page.
     */

    if (currentScroll < 250) {

      mobileBookingBar.classList.add(
        "hidden"
      );

      lastBookingScroll = currentScroll;

      return;
    }


    /*
     * Scrolling down = show booking bar.
     */

    if (currentScroll < lastBookingScroll) {

      mobileBookingBar.classList.remove(
        "hidden"
      );

    }


    /*
     * Scrolling down quickly = hide it temporarily
     * so it doesn't cover content.
     */

    if (
      currentScroll > lastBookingScroll &&
      currentScroll > 400
    ) {

      mobileBookingBar.classList.add(
        "hidden"
      );

    }


    lastBookingScroll = currentScroll;
  };


  updateBookingBar();


  window.addEventListener(
    "scroll",
    updateBookingBar,
    { passive: true }
  );


  /* =======================================================
     06. SMOOTH SCROLLING
     ======================================================= */

  allAnchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        !targetId.startsWith("#")
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);

      if (!target) return;


      event.preventDefault();

      closeMenu();


      const headerHeight =
        header
          ? header.offsetHeight
          : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        2;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });


      /*
       * Update URL without jumping.
       */

      try {

        history.pushState(
          null,
          "",
          targetId
        );

      } catch (error) {
        /* Ignore browser restrictions */
      }

    });

  });


  /* =======================================================
     07. SCROLL REVEAL ANIMATIONS
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-header, " +
    ".service-card, " +
    ".gallery-item, " +
    ".reason, " +
    ".booking-card, " +
    ".final-cta, " +
    ".value-item"
  );


  /*
   * Add reveal class dynamically so the HTML
   * stays clean.
   */

  revealElements.forEach((element, index) => {

    element.classList.add("js-reveal");

    /*
     * Small stagger for cards.
     */

    if (
      element.classList.contains("service-card") ||
      element.classList.contains("gallery-item") ||
      element.classList.contains("reason") ||
      element.classList.contains("value-item")
    ) {

      const delay =
        Math.min(index % 4, 3) * 70;

      element.style.setProperty(
        "--reveal-delay",
        `${delay}ms`
      );

    }

  });


  /*
   * Inject animation CSS.
   * This keeps the main CSS cleaner.
   */

  const revealStyle =
    document.createElement("style");

  revealStyle.textContent = `
    .js-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition:
        opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
        transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms);
    }

    .js-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .js-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(revealStyle);


  /*
   * Intersection Observer
   */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /* =======================================================
     08. ACTIVE DESKTOP NAVIGATION
     ======================================================= */

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const activeId =
              `#${entry.target.id}`;


            navLinks.forEach((link) => {

              const isActive =
                link.getAttribute("href") ===
                activeId;

              link.classList.toggle(
                "active",
                isActive
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  /* =======================================================
     09. IMAGE LOADING
     ======================================================= */

  const allImages = document.querySelectorAll(
    "img"
  );


  allImages.forEach((image) => {

    /*
     * Native lazy loading for non-hero images.
     */

    if (
      image !== heroImage &&
      !image.hasAttribute("loading")
    ) {

      image.setAttribute(
        "loading",
        "lazy"
      );

    }


    /*
     * Prevent broken image icons from
     * looking ugly.
     */

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

      },
      { once: true }
    );

  });


  /*
   * Image error styling.
   */

  const imageErrorStyle =
    document.createElement("style");

  imageErrorStyle.textContent = `
    img.image-error {
      opacity: 0;
    }
  `;

  document.head.appendChild(
    imageErrorStyle
  );


  /* =======================================================
     10. HERO PARALLAX
     ======================================================= */

  /*
   * Very subtle movement only on desktop.
   * Disabled on mobile to keep performance high.
   */

  const canUseParallax =
    window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)"
    );


  if (
    heroImage &&
    canUseParallax.matches
  ) {

    let ticking = false;


    const updateHeroParallax = () => {

      if (window.scrollY > window.innerHeight) {
        ticking = false;
        return;
      }


      const movement =
        Math.min(
          window.scrollY * 0.08,
          55
        );


      heroImage.style.transform =
        `scale(1.04) translateY(${movement}px)`;


      ticking = false;
    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateHeroParallax
          );

          ticking = true;

        }

      },
      { passive: true }
    );

  }


  /* =======================================================
     11. BUTTON PRESS MICRO-INTERACTION
     ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".btn, .service-link, .footer-socials a"
    );


  buttons.forEach((button) => {

    button.addEventListener(
      "pointerdown",
      () => {
        button.classList.add(
          "is-pressed"
        );
      }
    );


    button.addEventListener(
      "pointerup",
      () => {
        button.classList.remove(
          "is-pressed"
        );
      }
    );


    button.addEventListener(
      "pointercancel",
      () => {
        button.classList.remove(
          "is-pressed"
        );
      }
    );

  });


  /* =======================================================
     12. CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-year]"
    );


  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  /*
   * Also support a normal #year element.
   */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     13. PREVENT BODY SCROLL WHEN MENU IS OPEN
     ======================================================= */

  const menuBodyStyle =
    document.createElement("style");

  menuBodyStyle.textContent = `
    body.menu-open {
      overflow: hidden;
    }

    .btn.is-pressed {
      transform: scale(0.96) !important;
    }

    .desktop-nav a.active {
      opacity: 1;
    }
  `;

  document.head.appendChild(
    menuBodyStyle
  );


  /* =======================================================
     14. RESPONSIVE MENU SAFETY
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      /*
       * If user rotates phone or changes
       * to desktop width, close mobile menu.
       */

      if (
        window.innerWidth >= 900
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     15. TOUCH FEEDBACK FOR CARDS
     ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".service-card, .gallery-item"
    );


  interactiveCards.forEach((card) => {

    card.addEventListener(
      "touchstart",
      () => {

        card.classList.add(
          "touch-active"
        );

      },
      { passive: true }
    );


    card.addEventListener(
      "touchend",
      () => {

        setTimeout(() => {

          card.classList.remove(
            "touch-active"
          );

        }, 180);

      },
      { passive: true }
    );

  });


  /* =======================================================
     16. INITIALIZE
     ======================================================= */

  updateHeader();
  updateBookingBar();

});
