function pageIdentifier() {
  let pathName = window.location.pathname;

  if (pathName === "/" || pathName === "/index.html") {
    const landingPageBtn = document.querySelector(".homepage-hero button");
    buttonHandler(landingPageBtn, "locals-guide/");
  }

  if (
    pathName === "/locals-guide/" ||
    pathName === "/locals-guide/index.html"
  ) {
    const eatBtn = document.querySelector(".locals-guide-eat");
    const drinkBtn = document.querySelector(".locals-guide-drink");
    const doBtn = document.querySelector(".locals-guide-do");
    const miscBtn = document.querySelector(".locals-guide-misc");

    buttonHandler(eatBtn, "locals-guide/eat.html");
    buttonHandler(drinkBtn, "locals-guide/drink.html");
    buttonHandler(doBtn, "locals-guide/do.html");
    buttonHandler(miscBtn, "locals-guide/misc.html");
  }
}

function buttonHandler(button, location) {
  button.addEventListener("click", (e) => {
    window.location.href = `/${location}`;
  });

  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = `/${location}`;
    }
  });
}

pageIdentifier();
