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

function sortGuides(path, allItems) {
  // Homepage
  if (path === "/" || path.includes("/index")) {
    const miscContainer = document.querySelector(".misc-container");
    const goToContainer = document.querySelector(".go-to-container");

    let miscGuides = [];
    let goToGuides = [];

    allItems.forEach((item) => {
      item.category.includes("Misc") &&
        item.spotlightGuide &&
        miscGuides.push(item);
      item.favorite && goToGuides.push(item);
    });

    // Filter go-to guides
    goToGuides = filterData("rating-descending", goToGuides);

    // Build LG article for Misc
    miscGuides.forEach((item) => {
      buildGuide(miscContainer, item);
    });

    // Build LG article for Go-to
    goToGuides.forEach((item) => {
      buildGuide(goToContainer, item);
    });
  }

  if (
    path.includes("/eat") ||
    path.includes("/drink") ||
    path.includes("/do") ||
    path.includes("/misc")
  ) {
    // Local's Guide Category Pages
    lgCategoryPageContent(path, allItems);
  } else if (path.includes("/locals-guide/")) {
    //Individual Page
    const container = document.querySelector(".locals-guide-container");
    let currentSlug = window.location.pathname.split("/")[2].split(".")[0];
    let currentPage;

    // Identify Current Page
    allItems.forEach((item) => {
      currentSlug === item.url && (currentPage = item);
    });

    let recommendedList = buildRecommendationList(allItems, currentPage);

    recommendedList &&
      recommendedList.forEach((item) => {
        buildGuide(container, item);
      });
  }
}

function lgCategoryPageContent(path, data) {
  const lgContainer = document.querySelector(".locals-guide-container");
  let allItems = data;
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

  allItems.forEach((item) => {
    item.category.includes(category) && lgData.push(item);
  });

  // No Ratings for Misc and Drink guides, filter other guides
  if (category !== "Misc" && category !== "Drink") {
    filterData("rating-descending", lgData);
  }

  // Build items
  lgData.forEach((data) => {
    buildGuide(lgContainer, data);
  });
}

function buildRecommendationList(allItems, currentPage) {
  let currentPageTags = [];
  let currentPageCategories = [];
  let filteredGuides = [];
  let recommendedGuides = [];

  currentPage.category.forEach((category) => {
    currentPageCategories.push(category);
  });

  currentPage.tags.forEach((tag) => {
    currentPageTags.push(tag);
  });

  // Match by current page tags
  allItems.forEach((guide) => {
    guide.tags.forEach((tag) => {
      if (currentPageTags.includes(tag) && guide.title !== currentPage.title) {
        filteredGuides.push(guide);
      }
    });
  });

  // Check if filteredGuides is less than four items, if so, match by category
  if (filteredGuides.length < 4) {
    allItems.forEach((guide) => {
      guide.category.forEach((cat) => {
        if (
          currentPageCategories.includes(cat) &&
          guide.title !== currentPage.title
        ) {
          if (!filteredGuides.includes(guide)) {
            filteredGuides.push(guide);
          }
        }
      });
    });
  }

  for (let i = recommendedGuides.length; i < 4; i++) {
    let randomNumber = Math.floor(Math.random() * filteredGuides.length);
    recommendedGuides.push(filteredGuides.splice(randomNumber, 1)[0]);
  }

  return recommendedGuides;
}

// Create Local's Guide card
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
    case "Shopping":
      return "#2e4426";
    default:
      return "#000";
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
