const skipToContentBtn = document.querySelector(".skip-to-content-btn");
const menuBtn = document.querySelector(".header-menu-toggle");
const navList = document.querySelector(".nav-list");
const logo = document.querySelector("header img");

// Build initial Navigation
function buildNavigation() {
  const navLinks = `
  <a href="/">Home</a>
  <a href="/locals-guide/">Local's Guide</a>
  <a href="/podcast/">Watch</a>
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

  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("nav-list-active");
    navBarUpdateWindowWidth();
    updateTabIndexLinks();
    updateMenuBtn();
  });

  window.addEventListener("resize", () => {
    navBarUpdateWindowWidth();
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

buildNavigation();
