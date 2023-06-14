const menuBtn = document.querySelector(".header-menu-toggle");
const backdrop = document.querySelector(".backdrop");
const footer = document.querySelector(".footer");

// Build initial Navigation
function buildNavigation() {
  const header = document.querySelector(".main-header");
  const links = [
    { name: "Home", url: "/", id: 1 },
    { name: "Local's Guide", url: "/locals-guide", id: 2 },
    { name: "Podcast", url: "/podcast", id: 3 },
  ];

  const skipToContentBtn = document.createElement("button");
  skipToContentBtn.classList.add("skip-to-content-btn");
  skipToContentBtn.textContent = "Skip to main content";
  header.appendChild(skipToContentBtn);

  const logo = document.createElement("img");
  logo.src = "../assets/logo.png";
  logo.alt = "The Green Bay Guy logo";
  header.appendChild(logo);

  const menuBtn = document.createElement("button");
  menuBtn.class = "button";
  menuBtn.classList.add("header-menu-toggle");
  menuBtn.ariaLabel = "Menu";
  menuBtn.ariaExpanded = "false";
  menuBtn.ariaControls = "navigation";
  menuBtn.textContent = "Menu";
  header.appendChild(menuBtn);

  const navList = document.createElement("nav");
  navList.classList.add("nav-list");
  navList.setAttribute("id", "navigation");
  header.appendChild(navList);

  links.forEach((link) => {
    const newLink = document.createElement("a");
    newLink.href = link.url;
    newLink.textContent = link.name;
    navList.appendChild(newLink);
  });

  const blur = document.createElement("div");
  blur.classList.add("backdrop");
  header.appendChild(blur);
}

function buildFooter() {
  const year = new Date().getFullYear();

  const icons = [
    {
      name: "Facebook",
      img: "./assets/icons/facebook.png",
      alt: "Facebook icon",
      id: 101,
    },
    {
      name: "Instagram",
      img: "./assets/icons/instagram.png",
      alt: "Instagram icon",
      id: 102,
    },
    {
      name: "Twitter",
      img: "./assets/icons/twitter.png",
      alt: "Twitter icon",
      id: 103,
    },
    {
      name: "YouTube",
      img: "./assets/icons/youtube.png",
      alt: "YouTube icon",
      id: 104,
    },
    {
      name: "Snapchat",
      img: "./assets/icons/snapchat.png",
      alt: "Snapchat icon",
      id: 105,
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

  window.addEventListener("resize", () => {
    ctaUpdate();
  });

  socialIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      iconHandler(icon);
    });

    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        iconHandler(icon);
      }
    });
  });

  function ctaUpdate() {
    let windowWidth = window.innerWidth;
    let textBtn = ctaBtns[1];

    if (windowWidth >= 1024) {
      textBtn.style.display = "none";
    } else {
      textBtn.style.display = "inline";
    }
  }

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

  ctaUpdate();
}

buildNavigation();
buildFooter();
