const skipToContentBtn = document.querySelector(".skip-to-content-btn");
const menuBtn = document.querySelector(".header-menu-toggle");
const navList = document.querySelector(".nav-list");
const logo = document.querySelector("header img");
const footer = document.querySelector(".footer");

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
  const year = new Date().getFullYear();

  // Build footerCTA
  const footerCta = document.createElement("aside");
  footerCta.classList.add("footer-callout");
  footer.appendChild(footerCta);

  // Header
  const footerCtaHeader = document.createElement("h4");
  footerCtaHeader.innerHTML = "Green Bay Bound?";
  footerCta.appendChild(footerCtaHeader);

  // Paragraphs
  const footerP1 = document.createElement("p");
  footerP1.innerHTML = `A visit to Green Bay holds a unique significance. For many, it
  represents years of anticipation, diligent saving, and meticulous
  planning. My biggest priority is to help make sure this trip surpasses
  all expectations.`;
  footerCta.appendChild(footerP1);

  const footerP2 = document.createElement("p");
  footerP2.innerHTML = `If there's anything you're curious about that hasn't been covered, or
  if you simply want to reach out and say hello, please feel free to
  contact me without any hesitation. It would be my privilege to offer
  any assistance within my capabilities.`;
  footerCta.appendChild(footerP2);

  const emailBtn = document.createElement("button");
  emailBtn.classList.add("color-primary-btn");
  emailBtn.innerHTML = "Email";
  footerCta.append(emailBtn);

  const textBtn = document.createElement("button");
  textBtn.classList.add("color-secondary-btn");
  textBtn.innerHTML = "Text";
  footerCta.append(textBtn);

  // Thematic break
  const thematicBreak = document.createElement("hr");
  footer.appendChild(thematicBreak);

  // Social media icons
  const socialMediaContainer = document.createElement("div");
  socialMediaContainer.classList.add("socials-container");
  footer.appendChild(socialMediaContainer);

  const fbIcon = document.createElement("img");
  fbIcon.src = "./assets/icons/facebook.png";
  fbIcon.alt = "Facebook icon";
  socialMediaContainer.appendChild(fbIcon);

  const twitterIcon = document.createElement("img");
  twitterIcon.src = "./assets/icons/twitter.png";
  twitterIcon.alt = "Twitter icon";
  socialMediaContainer.appendChild(twitterIcon);

  const instagramIcon = document.createElement("img");
  instagramIcon.src = "./assets/icons/instagram.png";
  instagramIcon.alt = "Instagram icon";
  socialMediaContainer.appendChild(instagramIcon);

  const youtubeIcon = document.createElement("img");
  youtubeIcon.src = "./assets/icons/youtube.png";
  youtubeIcon.alt = "YouTube icon";
  socialMediaContainer.appendChild(youtubeIcon);

  const snapchatIcon = document.createElement("img");
  snapchatIcon.src = "./assets/icons/snapchat.png";
  snapchatIcon.alt = "Snapchat icon";
  socialMediaContainer.appendChild(snapchatIcon);

  // Copyright
  const copyright = document.createElement("p");
  copyright.innerHTML = `The Green Bay Guy &copy; ${year}`;
  footer.appendChild(copyright);
}

buildNavigation();
buildFooter();
