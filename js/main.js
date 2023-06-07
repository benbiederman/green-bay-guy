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

  const icons = [
    {
      name: "Facebook",
      img: "./assets/icons/facebook.png",
      alt: "Facebook icon",
      id: 001,
    },
    {
      name: "Instagram",
      img: "./assets/icons/instagram.png",
      alt: "Instagram icon",
      id: 002,
    },
    {
      name: "Twitter",
      img: "./assets/icons/twitter.png",
      alt: "Twitter icon",
      id: 003,
    },
    {
      name: "YouTube",
      img: "./assets/icons/youtube.png",
      alt: "YouTube icon",
      id: 004,
    },
    {
      name: "Snapchat",
      img: "./assets/icons/snapchat.png",
      alt: "Snapchat icon",
      id: 005,
    },
  ];

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

  icons.forEach((icon) => {
    const iconImg = document.createElement("img");
    iconImg.src = icon.img;
    iconImg.alt = icon.alt;
    iconImg.tabIndex = 0;
    iconImg.key = icon.id;
    socialMediaContainer.appendChild(iconImg);
  });

  // Copyright
  const copyright = document.createElement("p");
  copyright.innerHTML = `The Green Bay Guy &copy; ${year}`;
  footer.appendChild(copyright);

  const ctaBtns = document.querySelectorAll(".footer-callout button");
  const socialIcons = document.querySelectorAll(".socials-container img");

  ctaBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      ctaHandler(e.target.innerHTML.toLowerCase());
    });
  });

  socialIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      iconHandler(icon);
    });
  });

  function ctaHandler(name) {
    switch (name) {
      case "email":
        window.location.href = "mailto:thegreenbayguy@gmail.com";
        break;
      case "text":
        window.location.href = "sms:9207703933";
        break;
    }
  }

  function iconHandler(icon) {
    switch (icon.alt) {
      case "Facebook icon":
        window.open("https://www.facebook.com/TheGreenBayGuy", "_blank");
        break;
      case "Instagram icon":
        window.open("https://www.instagram.com/thegreenbayguy/", "_blank");
        break;
      case "Twitter icon":
        window.open("https://twitter.com/thegreenbayguy", "_blank");
        break;
      case "Snapchat icon":
        window.open("https://www.snapchat.com/add/thegbguy", "_blank");
        break;
      case "YouTube icon":
        window.open("https://www.youtube.com/thegreenbayguy", "_blank");
        break;
    }
  }
}

buildNavigation();
buildFooter();
