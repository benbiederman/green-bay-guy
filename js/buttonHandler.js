function pageIdentifier() {
  let pathName = window.location.pathname;

  if (pathName === "/" || pathName === "/index.html") {
    const landingPageBtn = document.querySelector(".homepage-hero button");
    buttonHandler(landingPageBtn, "locals-guide");
  }

  if (pathName === "/locals-guide.html") {
    const eatBtn = document.querySelector(".locals-guide-eat");
    const drinkBtn = document.querySelector(".locals-guide-drink");
    const doBtn = document.querySelector(".locals-guide-do");
    const miscBtn = document.querySelector(".locals-guide-misc");

    buttonHandler(eatBtn, "locals-guide/eat");
    buttonHandler(drinkBtn, "locals-guide/drink");
    buttonHandler(doBtn, "locals-guide/do");
    buttonHandler(miscBtn, "locals-guide/misc");
  }
}

function buttonHandler(button, location) {
  button.addEventListener("click", (e) => {
    window.location.href = `/${location}.html`;
  });

  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = `/${location}.html`;
    }
  });
}

pageIdentifier();
