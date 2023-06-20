fetch("./data/locals-guide.json")
  .then((response) => response.json())
  .then((data) => sortGuides(data))
  .catch((error) => console.log(error));

function sortGuides(items) {
  let path = window.location.pathname;

  if (path === "/" || path === "/index.html") {
    const miscContainer = document.querySelector(".misc-container");
    const miscGuides = [];
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tag === "Guide") {
          miscGuides.push(item);
        }
      });
    });

    miscGuides.forEach((guide) => {
      buildGuide(miscContainer, guide);
    });
  }
}

function buildGuide(container, item) {
  //Lg Container
  const lgItem = document.createElement("article");
  lgItem.classList.add("locals-guide-item");
  lgItem.tabIndex = 0;
  container.appendChild(lgItem);

  //Lg Rating
  if (item.rating) {
    const lgRatingContainer = document.createElement("div");
    lgRatingContainer.classList.add("locals-guide-grade");
    lgItem.appendChild(lgRatingContainer);

    const lgRating = document.createElement("p");
    lgRating.textContent = item.rating;
    lgRatingContainer.appendChild(lgRating);
  }

  //Lg Image
  const lgFigure = document.createElement("figure");
  lgItem.appendChild(lgFigure);

  const lgImg = document.createElement("img");
  lgImg.src = `../assets/locals-guide/${item.image}`;
  lgImg.alt = item.alt;
  lgFigure.appendChild(lgImg);

  //Lg Tags
  const lgTags = document.createElement("div");
  lgTags.classList.add("locals-guide-tags");
  lgItem.appendChild(lgTags);

  item.tags.forEach((tag) => {
    const lgTagContainer = document.createElement("div");
    lgTagContainer.classList.add("locals-guide-tag");
    lgTagContainer.style.backgroundColor = generateTagColor(tag);
    lgTags.appendChild(lgTagContainer);

    const lgTag = document.createElement("p");
    lgTag.textContent = tag;
    lgTagContainer.appendChild(lgTag);
  });

  //Lg Details
  const lgDetails = document.createElement("div");
  lgDetails.classList.add("locals-guide-details");
  lgItem.appendChild(lgDetails);

  const lgHeader = document.createElement("h3");
  lgHeader.textContent = item.title;
  lgDetails.appendChild(lgHeader);

  const hr = document.createElement("hr");
  lgDetails.appendChild(hr);

  const moreInfo = document.createElement("p");
  if (item.distance) {
    moreInfo.textContent = `${item.distance} miles from Lambeau Field`;
  } else {
    moreInfo.textContent = "Read more";
  }
  lgDetails.appendChild(moreInfo);

  lgItem.addEventListener("click", () => {
    window.location.href = `locals-guide/${item.url}`;
  });
}

function generateTagColor(tag) {
  switch (tag) {
    case "Guide":
      return "black";
    default:
      return "yellow";
  }
}
