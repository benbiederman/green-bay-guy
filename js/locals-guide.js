// Fetch proper data
function localsGuideContent() {
  let path = window.location.pathname;
  let guideData;

  if (path.includes("/podcasts")) {
    guideData = "podcasts.json";
  } else {
    guideData = "locals-guide.json";
  }

  if (guideData) {
    fetch(`/data/${guideData}`)
      .then((response) => response.json())
      .then((data) => sortGuides(path, data))
      .catch((error) => console.log(error));
  }
}

function sortGuides(path, items) {
  if (path === "/" || path === "/index.html") {
    const miscContainer = document.querySelector(".misc-container");
    const goToContainer = document.querySelector(".go-to-container");
    let miscGuides = [];
    let goToGuides = [];
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tag === "Guide") {
          miscGuides.push(item);
        }
      });
      if (item.favorite) {
        goToGuides.push(item);
      }
    });

    miscGuides.forEach((guide) => {
      buildGuide(miscContainer, guide);
    });

    goToGuides = filterData("rating-descending", goToGuides);

    goToGuides.forEach((guide) => {
      buildGuide(goToContainer, guide);
    });
  } else if (
    path.includes("/eat") ||
    path.includes("/drink") ||
    path.includes("/do") ||
    path.includes("/misc")
  ) {
    // LG Landing pages
    localsGuidePageContent(path, items);
  } else if (path.includes("/locals-guide/")) {
    // LG individual pages
    const container = document.querySelector(".locals-guide-container");
    let allData = [...items];
    let filteredData = [];
    let recommendedData = [];
    let currentPage;

    // Identify current page
    items.forEach((item) => {
      if (path.includes(item.url)) {
        currentPage = item;
      }
    });

    // Find tags that match current page tags
    currentPage.tags.forEach((tag) => {
      allData.forEach((item) => {
        if (item.tags.includes(tag) && item.title !== currentPage.title) {
          if (item.rating > 3.9) {
            filteredData.push(item);
          }
        }
      });
    });

    // Grab four items from filteredData for recommendation
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(Math.random() * filteredData.length);
      recommendedData.push(filteredData.splice(randomNumber, 1)[0]);
    }

    // Build Local Guide items from recommended data
    recommendedData.forEach((recommendation) => {
      buildGuide(container, recommendation);
    });
  }
}

function localsGuidePageContent(path, items) {
  const lgContainer = document.querySelector(".locals-guide-container");
  let category;
  let lgData = [];

  switch (path) {
    case "/locals-guide/eat.html":
      category = "Eat";
      break;
    case "/locals-guide/drink.html":
      category = "Drink";
      break;
    case "/locals-guide/do.html":
      category = "Do";
      break;
    case "/locals-guide/misc.html":
      category = "Misc";
      break;
  }

  items.forEach((item) => {
    item.category.forEach((cat) => {
      if (cat === category) {
        lgData.push(item);
      }
    });
  });

  if (category !== "Misc" && category !== "Drink") {
    filterData("rating-descending", lgData);
  }

  lgData.forEach((data) => {
    buildGuide(lgContainer, data);
  });
}

function buildGuide(container, item) {
  let path = window.location.pathname;

  //Lg Container
  const lgItem = document.createElement("article");
  lgItem.classList.add("locals-guide-item");
  lgItem.tabIndex = 0;
  container.appendChild(lgItem);

  //Lg Rating, no rating if drink category (except coffee)
  if (item.rating) {
    if (!path.includes("drink") || item.tags.includes("Coffee")) {
      const lgRatingContainer = document.createElement("div");
      lgRatingContainer.classList.add("locals-guide-grade");
      lgItem.appendChild(lgRatingContainer);

      const lgRating = document.createElement("p");
      lgRating.textContent = item.rating;
      lgRatingContainer.appendChild(lgRating);
    }
  }

  //Lg Image
  const lgFigure = document.createElement("figure");
  lgItem.appendChild(lgFigure);

  if (path.includes("drink") && item.secondaryImg) {
    const lgImg = document.createElement("img");
    lgImg.src = `../assets/locals-guide/${item.secondaryImg}`;
    lgImg.alt = item.secondaryAlt;
    lgFigure.appendChild(lgImg);
  } else {
    const lgImg = document.createElement("img");
    lgImg.src = `../assets/locals-guide/${item.mainImg}`;
    lgImg.alt = item.alt;
    lgFigure.appendChild(lgImg);
  }

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
    window.location.href = `/locals-guide/${item.url}.html`;
  });

  lgItem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = `/locals-guide/${item.url}.html`;
    }
  });
}

// Set colors of each tag
function generateTagColor(tag) {
  switch (tag) {
    case "$$$":
      return "#9d3131";
    case "Alcohol":
      return "#060303";
    case "Breakfast":
      return "#a27b02";
    case "Coffee":
      return "#78593a";
    case "Dessert":
      return "#965ba3";
    case "Dinner":
      return "#9d3131";
    case "Free":
      return "#3b7144";
    case "Guide":
      return "#5e5e5e";
    case "Lunch":
      return "#ea661f";
    default:
      return "black";
  }
}

// Local's Guide filter logic
function filterData(filter, data) {
  switch (filter) {
    case "rating-descending":
      return data.sort(function (a, b) {
        return b.rating - a.rating;
      });
    default:
      null;
  }
}

localsGuideContent();
