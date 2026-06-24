document.documentElement.classList.add("js");

// Edit these two placeholders before publishing the final dossier.
const MVP_PROTOTYPE_URL = "https://fpk-express.vercel.app";
const PROTOTYPE_REPOSITORY_URL = "https://github.com/your-username/fpk-express";
const THEME_STORAGE_KEY = "fpk-express-case-theme";

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The site remains functional if browser storage is unavailable.
  }
}

function applyTheme(theme) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalizedTheme;
  document.documentElement.style.colorScheme = normalizedTheme;

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    const label = normalizedTheme === "dark" ? "Activer le mode clair" : "Activer le mode sombre";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }
}

function initializeTheme() {
  const storedTheme = getStoredTheme();
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (systemPrefersDark ? "dark" : "light"));
}

initializeTheme();

document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-nav");
  const themeToggle = document.querySelector(".theme-toggle");

  document.querySelectorAll("[data-mvp-link]").forEach((link) => {
    link.href = MVP_PROTOTYPE_URL;
  });

  document.querySelectorAll("[data-repository-link]").forEach((link) => {
    link.href = PROTOTYPE_REPOSITORY_URL;
  });

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    storeTheme(nextTheme);
  });

  function setMenuOpen(isOpen) {
    if (!menuToggle || !mobileMenu || !siteHeader) return;
    mobileMenu.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    siteHeader.classList.toggle("menu-active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) setMenuOpen(false);
  });

  document.querySelectorAll(".print-button").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  document.querySelector(".back-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const calculatorInputs = {
    serviceFee: document.querySelector("#service-fee"),
    dailyOrders: document.querySelector("#daily-orders"),
    activeDays: document.querySelector("#active-days"),
    monthlyCosts: document.querySelector("#monthly-costs"),
  };

  const calculatorOutputs = {
    monthlyRevenue: document.querySelector("#monthly-revenue"),
    monthlyCosts: document.querySelector("#cost-output"),
    monthlyResult: document.querySelector("#monthly-result"),
    breakEven: document.querySelector("#break-even"),
  };

  const currencyFormatter = new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 1,
  });

  function getSafeNumber(input, maximum) {
    const value = Number.parseFloat(input?.value || "0");
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(value, 0), maximum);
  }

  function updateCalculator() {
    const serviceFee = getSafeNumber(calculatorInputs.serviceFee, 10);
    const dailyOrders = getSafeNumber(calculatorInputs.dailyOrders, 1000);
    const activeDays = getSafeNumber(calculatorInputs.activeDays, 31);
    const monthlyCosts = getSafeNumber(calculatorInputs.monthlyCosts, 100000);

    const monthlyRevenue = serviceFee * dailyOrders * activeDays;
    const monthlyResult = monthlyRevenue - monthlyCosts;
    const breakEvenDailyOrders = serviceFee > 0 && activeDays > 0 ? monthlyCosts / (serviceFee * activeDays) : null;

    calculatorOutputs.monthlyRevenue.textContent = currencyFormatter.format(monthlyRevenue);
    calculatorOutputs.monthlyCosts.textContent = currencyFormatter.format(monthlyCosts);
    calculatorOutputs.monthlyResult.textContent = currencyFormatter.format(monthlyResult);
    calculatorOutputs.monthlyResult.classList.toggle("negative", monthlyResult < 0);
    calculatorOutputs.breakEven.textContent = breakEvenDailyOrders === null
      ? "Non calculable"
      : `${Math.ceil(breakEvenDailyOrders)} commandes / jour`;
  }

  Object.values(calculatorInputs).forEach((input) => input?.addEventListener("input", updateCalculator));
  updateCalculator();

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const navigationLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
  const observedSections = [...document.querySelectorAll(".section-anchor")];
  let navigationFrame = null;

  function updateActiveNavigation() {
    const marker = window.scrollY + 260;
    let currentSection = observedSections[0];
    observedSections.forEach((section) => {
      if (section.offsetTop <= marker) currentSection = section;
    });
    navigationLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
    });
    navigationFrame = null;
  }

  window.addEventListener("scroll", () => {
    if (navigationFrame) return;
    navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
  }, { passive: true });
  updateActiveNavigation();
});
