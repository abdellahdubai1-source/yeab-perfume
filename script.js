/* ============================================================
   YEAB Luxury Perfume — script.js
   Vanilla JavaScript only. No libraries.
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     Product data — single source of truth.
     Filenames match the assets in the root directory exactly.
     ---------------------------------------------------------- */
  var WHATSAPP_NUMBER = "971523542935";

  var PRODUCTS = [
    { name: "Golden Pear",    code: "19W", category: "Women",  image: "golden-pear-19w.webp",    featured: true },
    { name: "Spiced Rose",    code: "24W", category: "Women",  image: "spiced-rose-24w.webp",    featured: true },
    { name: "Saffron Ember",  code: "34U", category: "Unisex", image: "saffron-ember-34u.webp",  featured: true },
    { name: "Citrus Oud",     code: "21M", category: "Men",    image: "citrus-oud-21m.webp",     featured: true },
    { name: "Midnight Pear",  code: "19W", category: "Women",  image: "midnight-pear-19w.webp",  featured: true },
    { name: "Lychee Velvet",  code: "18W", category: "Women",  image: "lychee-velvet-18.webp",   featured: true },
    { name: "Tropical Amber", code: "20W", category: "Women",  image: "tropical-amber-20w.webp" },
    { name: "Green Rose",     code: "14W", category: "Women",  image: "green-rose-14w.webp" },
    { name: "Golden Neroli",  code: "10M", category: "Men",    image: "golden-neroli-10m.webp" },
    { name: "Citrus Reserve", code: "10M", category: "Men",    image: "citrus-reserve-10m.webp" },
    { name: "Orange Blossom", code: "11W", category: "Women",  image: "orange-blossom-11w.webp" },
    { name: "Blush Sandal",   code: "12W", category: "Women",  image: "blush-sandal-12w.webp" },
    { name: "Ivory Rose",     code: "14W", category: "Women",  image: "ivory-rose-14w.webp" },
    { name: "Rose Vanilla",   code: "11W", category: "Women",  image: "rose-vanilla-11w.webp" },
    { name: "Citrus Blush",   code: "13W", category: "Women",  image: "citrus-blush-13w.webp" },
    { name: "Velvet Cassis",  code: "15W", category: "Women",  image: "velvet-cassis-15w.webp" },
    { name: "Blood Orange",   code: "16W", category: "Women",  image: "blood-orange-16w.webp" },
    { name: "Amber Rose",     code: "15W", category: "Women",  image: "amber-rose-15w.webp" },
    { name: "Prism Rose",     code: "15W", category: "Women",  image: "prism-rose-15w.webp" },
    { name: "Iris Peach",     code: "17W", category: "Women",  image: "iris-peach-17w.webp" }
  ];

  /* ----------------------------------------------------------
     WhatsApp link builders
     ---------------------------------------------------------- */
  function waLink(message) {
    // encodeURIComponent leaves ( and ) literal; encode them for fully-safe URLs
    var encoded = encodeURIComponent(message)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded;
  }

  function productEnquiryLink(product) {
    return waLink(
      "Hello YEAB Luxury Perfume, I am interested in " + product.name +
      " (" + product.code + "). Could you please share the price and availability?"
    );
  }

  var GENERAL_MESSAGE = "Hello YEAB Luxury Perfume, I would like to make an enquiry about your fragrances.";
  var HELP_MESSAGE = "Hello YEAB Luxury Perfume, I would like help choosing the right fragrance.";

  /* ----------------------------------------------------------
     Product card rendering
     ---------------------------------------------------------- */
  function createCard(product, options) {
    var lazy = options && options.lazy;

    var card = document.createElement("article");
    // No "reveal" class on product cards: they must stay visible
    // even if the scroll-animation JS fails for any reason.
    card.className = "card";
    card.setAttribute("data-category", product.category.toLowerCase());
    card.setAttribute("data-name", product.name.toLowerCase());
    card.setAttribute("data-code", product.code.toLowerCase());

    var media = document.createElement("div");
    media.className = "card__media";

    var img = document.createElement("img");
    img.className = "card__img";
    img.src = product.image;
    img.alt = product.name + " — " + product.category.toLowerCase() +
      " fragrance by YEAB Luxury Perfume, code " + product.code;
    img.width = 600;
    img.height = 750;
    if (lazy) img.loading = "lazy";
    img.decoding = "async";

    var badge = document.createElement("span");
    badge.className = "card__category";
    badge.textContent = product.category;

    media.appendChild(img);
    media.appendChild(badge);

    var body = document.createElement("div");
    body.className = "card__body";

    var name = document.createElement("h3");
    name.className = "card__name";
    name.textContent = product.name;

    var code = document.createElement("p");
    code.className = "card__code";
    code.textContent = "Code " + product.code;

    var btnWrap = document.createElement("div");
    btnWrap.className = "card__btn";

    var btn = document.createElement("a");
    btn.className = "btn btn--gold";
    btn.href = productEnquiryLink(product);
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = "Order on WhatsApp";
    btn.setAttribute("aria-label", "Order " + product.name + " (" + product.code + ") on WhatsApp");

    btnWrap.appendChild(btn);
    body.appendChild(name);
    body.appendChild(code);
    body.appendChild(btnWrap);

    card.appendChild(media);
    card.appendChild(body);
    return card;
  }

  function renderProducts() {
    var featuredGrid = document.querySelector(".featured__grid");
    var collectionGrid = document.getElementById("collection-grid");
    if (featuredGrid) {
      PRODUCTS.filter(function (p) { return p.featured; }).forEach(function (p) {
        // Featured section sits just below the hero: no lazy-loading needed
        featuredGrid.appendChild(createCard(p, { lazy: false }));
      });
    }
    if (collectionGrid) {
      PRODUCTS.forEach(function (p) {
        // Full collection is below the fold: lazy-load its images
        collectionGrid.appendChild(createCard(p, { lazy: true }));
      });
    }
  }

  /* ----------------------------------------------------------
     Generic WhatsApp buttons (header, hero, banner, float, footer)
     ---------------------------------------------------------- */
  function bindWhatsAppLinks() {
    document.querySelectorAll("[data-wa-general]").forEach(function (el) {
      el.href = waLink(GENERAL_MESSAGE);
    });
    document.querySelectorAll("[data-wa-help]").forEach(function (el) {
      el.href = waLink(HELP_MESSAGE);
    });
  }

  /* ----------------------------------------------------------
     Header: transparent → solid on scroll
     ---------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("header");
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ----------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Clicking a navigation link closes the menu
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    // Escape key closes the menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     Smooth scrolling for in-page links (native CSS handles most;
     this keeps the sticky header offset comfortable)
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      });
    });
  }

  /* ----------------------------------------------------------
     Collection filtering + search
     ---------------------------------------------------------- */
  function initFiltersAndSearch() {
    var grid = document.getElementById("collection-grid");
    var emptyMsg = document.getElementById("collection-empty");
    var searchInput = document.getElementById("product-search");
    var filterButtons = document.querySelectorAll(".filter-btn");
    if (!grid) return;

    var activeFilter = "all";
    var query = "";

    function applyFilters() {
      var visibleCount = 0;
      grid.querySelectorAll(".card").forEach(function (card) {
        var matchesFilter =
          activeFilter === "all" || card.getAttribute("data-category") === activeFilter;
        var haystack = card.getAttribute("data-name") + " " + card.getAttribute("data-code");
        var matchesQuery = query === "" || haystack.indexOf(query) !== -1;
        var show = matchesFilter && matchesQuery;

        if (show) {
          if (card.classList.contains("is-hidden")) {
            // Smooth entrance for newly shown cards
            card.classList.remove("is-hidden");
            card.classList.add("is-appearing");
            window.requestAnimationFrame(function () {
              window.requestAnimationFrame(function () {
                card.classList.remove("is-appearing");
              });
            });
          }
          visibleCount++;
        } else {
          card.classList.add("is-hidden");
        }
      });
      if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-filter");
        filterButtons.forEach(function (b) {
          var isActive = b === btn;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-pressed", String(isActive));
        });
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        query = searchInput.value.trim().toLowerCase();
        applyFilters();
      });
    }
  }

  /* ----------------------------------------------------------
     Contact form → WhatsApp
     ---------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    // Populate the "Product of interest" select from the product data
    var select = document.getElementById("cf-product");
    if (select) {
      PRODUCTS.forEach(function (p) {
        var opt = document.createElement("option");
        opt.value = p.name + " (" + p.code + ")";
        opt.textContent = p.name + " — " + p.code + " — " + p.category;
        select.appendChild(opt);
      });
    }

    function setFieldError(fieldEl, errorEl, hasError) {
      fieldEl.closest(".field").classList.toggle("has-error", hasError);
      if (errorEl) errorEl.hidden = !hasError;
      fieldEl.setAttribute("aria-invalid", String(hasError));
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = document.getElementById("cf-name");
      var phoneEl = document.getElementById("cf-phone");
      var messageEl = document.getElementById("cf-message");

      var name = nameEl.value.trim();
      var phone = phoneEl.value.trim();
      var product = select ? select.value : "";
      var message = messageEl.value.trim();

      var nameValid = name.length >= 2;
      var phoneValid = /^[+\d][\d\s\-()]{6,}$/.test(phone);
      var messageValid = message.length >= 3;

      setFieldError(nameEl, document.getElementById("cf-name-error"), !nameValid);
      setFieldError(phoneEl, document.getElementById("cf-phone-error"), !phoneValid);
      setFieldError(messageEl, document.getElementById("cf-message-error"), !messageValid);

      if (!nameValid) { nameEl.focus(); return; }
      if (!phoneValid) { phoneEl.focus(); return; }
      if (!messageValid) { messageEl.focus(); return; }

      var lines = [
        "Hello YEAB Luxury Perfume, I would like to make an enquiry.",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Product of interest: " + (product || "General enquiry"),
        "Message: " + message
      ];

      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ----------------------------------------------------------
     Scroll-reveal animations (Intersection Observer)
     ---------------------------------------------------------- */
  function initScrollReveal() {
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var elements = document.querySelectorAll(".reveal");

    if (prefersReduced || !("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     Hero video: graceful handling + reduced motion
     ---------------------------------------------------------- */
  function initHeroVideo() {
    var video = document.getElementById("hero-video");
    if (!video) return;

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Respect reduced motion: pause the background video
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // If autoplay is blocked or the file fails, the CSS fallback
    // background remains visible — just hide the broken video element.
    video.addEventListener("error", function () {
      video.style.display = "none";
    }, true);

    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        /* Autoplay prevented — dark fallback background stays in place. */
      });
    }
  }

  /* ----------------------------------------------------------
     Dynamic copyright year
     ---------------------------------------------------------- */
  function initCopyrightYear() {
    var el = document.getElementById("copyright-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderProducts();
    bindWhatsAppLinks();
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initFiltersAndSearch();
    initContactForm();
    initScrollReveal();
    initHeroVideo();
    initCopyrightYear();
  });
})();
