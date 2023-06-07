const skipToContentBtn = document.querySelector(".skip-to-content-btn");
const menuBtn = document.querySelector(".header-menu-toggle");
const navList = document.querySelector(".nav-list");
const logo = document.querySelector("header img");

// Build initial Navigation
function buildNavigation() {
  const navLinks = `
  <a href="/">Home</a>
  <a href="/locals-guide">Local's Guide</a>
  <a href="/podcast">Podcast</a>
  `;

  navList.innerHTML = navLinks;

  skipToContentBtn.addEventListener("click", () => {
    window.location = "#main";
    navList.classList.remove("nav-list-active");
  });

  navigationFunctionality();
}

function navigationFunctionality() {
  const navBar = document.querySelector(".main-header");

  logo.addEventListener("click", () => {
    window.location = "/";
  });

  logo.addEventListener("mouseover", () => {
    logo.src = "../assets/logo-hover.png";
  });

  logo.addEventListener("mouseleave", () => {
    logo.src = "../assets/logo.png";
  });

  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("nav-list-active");
    navBarUpdateWindowWidth();
    updateTabIndexLinks();
    updateMenuBtn();
  });

  window.addEventListener("resize", () => {
    navBarUpdateWindowWidth();
    updateTabIndexLinks();
  });

  window.addEventListener("scroll", () => {
    navBarUpdateWindowWidth(window.scrollY);
  });

  // Update Menu Text
  function updateMenuBtn() {
    if (navList.classList.contains("nav-list-active")) {
      menuBtn.ariaExpanded = "true";
      menuBtn.textContent = "Close";
    } else {
      menuBtn.ariaExpanded = "false";
      menuBtn.textContent = "Menu";
    }
  }

  // Add background color to NavBar
  function navBarUpdateWindowWidth(scrollY) {
    let yPosition = scrollY || window.scrollY;
    let windowWidth = window.innerWidth;
    if (
      (windowWidth < 1024 && navList.classList.contains("nav-list-active")) ||
      yPosition > 0
    ) {
      navBar.classList.add("header-active");
    } else {
      navBar.classList.remove("header-active");
    }
  }

  // Update tabIndex based on screen size || if navList is hidden
  function updateTabIndexLinks() {
    const links = document.querySelectorAll(".nav-list a");
    let windowWidth = window.innerWidth;

    if (navList.classList.contains("nav-list-active") || windowWidth >= 1024) {
      links.forEach((link) => {
        link.tabIndex = 0;
      });
    } else {
      links.forEach((link) => {
        link.tabIndex = -1;
      });
    }
  }

  navBarUpdateWindowWidth();
  updateTabIndexLinks();
  updateMenuBtn();
}

function buildFooter() {
  const footerCallout = document.querySelector(".footer-callout");
  const footerCTA = `
  <h4>Green Bay Bound?</h4>
  <p>
    A visit to Green Bay holds a unique significance. For many, it
    represents years of anticipation, diligent saving, and meticulous
    planning. My biggest priority is to help make sure this trip surpasses
    all expectations.
  </p>
  <p>
    If there's anything you're curious about that hasn't been covered, or
    if you simply want to reach out and say hello, please feel free to
    contact me without any hesitation. It would be my privilege to offer
    any assistance within my capabilities.
  </p>
  <button class="color-primary-btn">Email</button>
  <button class="color-secondary-btn">Text</button>
  `;

  footerCallout.innerHTML = footerCTA;
}

buildNavigation();
buildFooter();
