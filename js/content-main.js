const contentContainer = document.querySelector(".content-container");
let milesFromLambeau;

// Fetch proper data
function localsGuideContent() {
  let path = window.location.pathname;
  let guideData;

  if (path.includes("podcast")) {
    guideData = "podcasts.json";
  } else {
    guideData = "locals-guide.json";
  }

  if (guideData) {
    fetch(`/data/${guideData}`)
      .then((response) => response.json())
      .then((data) => serveProperData(path, data))
      .catch((error) => console.log(error));
  }
}

function serveProperData(path, allItems) {
  // Homepage
  if (path === "/" || path === "/index.html") {
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
    goToGuides = handleFilteringData("rating-descending", goToGuides);

    // Build LG article for Misc
    buildResults(miscContainer, miscGuides);

    // Build LG article for Go-to
    buildResults(goToContainer, goToGuides);
  }

  if (
    path.includes("/eat") ||
    path.includes("/drink") ||
    path.includes("/do") ||
    path.includes("/misc")
  ) {
    // Local's Guide Category Pages
    lgCategoryPageContent(path, allItems);
  } else if (path === "/podcast/" || path === "/podcast/index.html") {
    // Build items
    buildResultsCounter(allItems);
    buildResults(contentContainer, allItems);
    filterFunctionality(allItems);
  } else if (
    path.includes("/locals-guide/") ||
    path.includes("/podcast/episode")
  ) {
    //Individual Content Page
    let currentSlug = window.location.pathname.split("/")[2].split(".")[0];
    let currentPage;

    // Identify Current Page
    allItems.forEach((item) => {
      currentSlug === item.url && (currentPage = item);
    });

    let recommendedList = buildRecommendationList(allItems, currentPage);

    // Build Recommendation List for individual pages
    if (recommendedList) {
      buildResults(contentContainer, recommendedList);
    }
  }
}

function lgCategoryPageContent(path, data) {
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
    handleFilteringData("rating-descending", lgData);
  }

  // Build items
  buildResultsCounter(lgData);
  buildResults(contentContainer, lgData);

  filterFunctionality(lgData);
}

function filterFunctionality(itemData) {
  const unfilteredData = [...itemData];
  let filteredData = unfilteredData;
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const moreFiltersBtn = document.querySelector(".more-filters-btn");
  const moreFilters = document.querySelector(".more-filters");

  // Add or remove clear button for search input
  searchInput.addEventListener("keydown", () => {
    if (searchInput.value.length > 0) {
      resetBtn.classList.add("reset-btn-active");
    } else {
      resetBtn.classList.remove("reset-btn-active");
    }
  });

  // Reset search input
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    resetBtn.classList.remove("reset-btn-active");
  });

  // Search button functionality
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchInput.value.length <= 0) {
    } else {
      const clearResultsBtn = document.querySelector(".clear-results button");
      clearResultsBtn.style.display = "block";
      resetFilters();
      moreFilters.classList.remove("more-filters-active");
      filteredData = searchResults(unfilteredData, searchInput.value);

      // Build results and results counter
      buildResultsCounter(filteredData);
      buildResults(contentContainer, filteredData);

      // Clear search results
      clearResultsBtn.addEventListener("click", () => {
        searchInput.value = "";
        resetBtn.classList.remove("reset-btn-active");
        buildResults(contentContainer, unfilteredData);
        buildResultsCounter(unfilteredData);
        resetFilters();
        clearResultsBtn.style.display = "none";
      });
    }
  });

  // More filters button functionality
  moreFiltersBtn.addEventListener("click", () => {
    moreFilters.classList.toggle("more-filters-active");
    if (moreFilters.classList.contains("more-filters-active")) {
      moreFiltersFunctionality(filteredData);
    }
  });
}

// Functionality for more filters form
function moreFiltersFunctionality(itemData) {
  let unfilteredData = itemData;
  const moreFilters = document.querySelector(".more-filters");
  const categoryFilter = document.querySelector(".category-filter");
  const radiusFilter = document.querySelector(".radius-filters");
  const showFiltersBtn = document.querySelector(".show-filters-btn");
  const typeFilter = document.querySelectorAll(".check-item input");

  // Redirects to different page depending on category change
  categoryFilter.addEventListener("change", (e) => {
    window.location.href = `/locals-guide/${e.target.value}.html`;
  });

  // Checks value change for radius
  radiusFilter.addEventListener("change", (e) => {
    milesFromLambeau = +e.target.value;
  });

  // Checks value change for type checkboxes
  typeFilter.forEach((type) => {
    type.addEventListener("click", (e) => {
      if (type.checked) {
        type.setAttribute("checked", true);
      } else {
        type.removeAttribute("checked");
      }
    });
  });

  // Show filtered results button functionality
  showFiltersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let radius = milesFromLambeau || 10000;
    let tags = [];
    let filteredResults = [];

    // Adds all checked types
    typeFilter.forEach((type) => {
      if (type.checked) {
        tags.push(type.value);
      }
    });

    // Check filters applied and sorts data accordingly
    if (tags.length === typeFilter.length && radius === 10000) {
      filteredResults = unfilteredData;
    } else {
      unfilteredData.forEach((item) => {
        if (item.tags) {
          tags.forEach((tag) => {
            if (item.tags.includes(tag) && item.distance < radius) {
              filteredResults.push(item);
            }
          });
        }
      });
    }

    moreFilters.classList.remove("more-filters-active");
    filteredResults = removeDuplicateResults(filteredResults);
    buildResults(contentContainer, filteredResults);
    buildResultsCounter(filteredResults);
  });
}

// Clear form filters
function resetFilters() {
  const moreFiltersForm = document.querySelector(".more-filters-form");
  const typeFilter = document.querySelectorAll(".check-item input");

  typeFilter.forEach((type) => {
    type.setAttribute("checked", true);
  });

  moreFiltersForm.reset();
}

// Local's Guide filter logic
function handleFilteringData(filter, itemData) {
  switch (filter) {
    case "rating-descending":
      return itemData.sort(function (a, b) {
        return b.rating - a.rating;
      });
    default:
      null;
  }
}

// Grab items based on user search
function searchResults(itemData, search) {
  let searchResults = [];
  let userSearch = search.toLowerCase().trim();

  itemData.forEach((item) => {
    if (item.title.toLowerCase().trim().includes(userSearch)) {
      searchResults.push(item);
    }

    if (item.address[0].city.toLowerCase().trim().includes(userSearch)) {
      searchResults.push(item);
    }

    if (item.searchTerms) {
      item.searchTerms.forEach((term) => {
        if (term.toLowerCase().trim().includes(userSearch)) {
          searchResults.push(item);
        }
      });
    }

    if (item.tags) {
      item.tags.forEach((tag) => {
        if (tag.toLowerCase().trim().includes(userSearch)) {
          searchResults.push(item);
        }
      });
    }
  });

  searchResults = removeDuplicateResults(searchResults);
  return searchResults;
}

// Remove duplicates
function removeDuplicateResults(results) {
  const uniqueObjectsById = {};

  // Loop through the array and add objects to the uniqueObjectsById object
  for (const item of results) {
    uniqueObjectsById[item.id] = item;
  }

  // Convert the uniqueObjectsById object back to an array of unique objects
  const uniqueData = Object.values(uniqueObjectsById);

  return handleFilteringData("rating-descending", uniqueData);
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

function buildResults(container, data) {
  container.textContent = "";

  if (data.length === 0) {
  } else {
    data.forEach((item) => {
      buildGuide(container, item);
    });
  }
}

// Create page results
function buildResultsCounter(itemData) {
  const results = document.querySelector(".results-counter");
  results.textContent = "";

  const resultsCount = document.createElement("p");
  resultsCount.textContent = `${itemData.length} results`;
  results.appendChild(resultsCount);
}

// Create Content Item
function buildGuide(container, item) {
  let path = window.location.pathname;
  let contentType;

  if (path.includes("podcast")) {
    contentType = "podcast";
  } else {
    contentType = "locals-guide";
  }

  //Content Container
  const contentItem = document.createElement("article");
  contentItem.classList.add("content-item");
  contentItem.tabIndex = 0;
  container.appendChild(contentItem);

  //Content Rating, no rating if drink category (except coffee)
  if (item.rating) {
    if (!path.includes("drink") || item.tags.includes("Coffee")) {
      const lgRatingContainer = document.createElement("div");
      lgRatingContainer.classList.add("locals-guide-grade");
      contentItem.appendChild(lgRatingContainer);

      const lgRating = document.createElement("p");
      lgRating.textContent = item.rating;
      lgRatingContainer.appendChild(lgRating);
    }
  }

  //Content Image
  const contentFigure = document.createElement("figure");
  contentItem.appendChild(contentFigure);

  const contentImg = document.createElement("img");
  if (path.includes("drink") && item.secondaryImg) {
    contentImg.src = `../assets/${contentType}/${item.secondaryImg}`;
    contentImg.alt = item.secondaryAlt;
  } else {
    contentImg.src = `../assets/${contentType}/${item.mainImg}`;
    contentImg.alt = item.alt;
  }
  contentFigure.appendChild(contentImg);

  //Content Tags
  if (item.tags) {
    const contentTags = document.createElement("div");
    contentTags.classList.add("content-tags");
    contentItem.appendChild(contentTags);

    item.tags.forEach((tag) => {
      const contentTagContainer = document.createElement("div");
      contentTagContainer.classList.add("content-tag");
      contentTagContainer.style.backgroundColor = generateTagColor(tag);
      contentTags.appendChild(contentTagContainer);

      const contentTag = document.createElement("p");
      contentTag.textContent = tag;
      contentTagContainer.appendChild(contentTag);
    });
  }

  //Content Details
  const contentDetails = document.createElement("div");
  contentDetails.classList.add("content-details");
  contentItem.appendChild(contentDetails);

  const contentHeader = document.createElement("h3");
  contentHeader.textContent = item.title;
  contentDetails.appendChild(contentHeader);

  const hr = document.createElement("hr");
  contentDetails.appendChild(hr);

  const moreInfo = document.createElement("p");
  if (contentType === "podcast") {
    moreInfo.textContent = `Listen to episode ${item.episodeNumber} now`;
  } else {
    if (item.distance) {
      moreInfo.textContent = `${item.distance} miles from Lambeau Field`;
    } else {
      moreInfo.textContent = "Read more";
    }
  }
  contentDetails.appendChild(moreInfo);

  // Content Item handlers
  contentItem.addEventListener("click", () => {
    window.location.href = `/${contentType}/${item.url}.html`;
  });

  contentItem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      window.location.href = `/${contentType}/${item.url}.html`;
    }
  });
}

// Recommendation list on local's guide item
function buildRecommendationList(allItems, currentPage) {
  let currentPageTags = [];
  let currentPageCategories = [];
  let filteredGuides = [];
  let recommendedGuides = [];

  if (currentPage.category) {
    currentPage.category.forEach((category) => {
      currentPageCategories.push(category);
    });
  }

  if (currentPage.tags) {
    currentPage.tags.forEach((tag) => {
      currentPageTags.push(tag);
    });

    // Match by current page tags
    allItems.forEach((guide) => {
      guide.tags.forEach((tag) => {
        if (
          currentPageTags.includes(tag) &&
          guide.title !== currentPage.title
        ) {
          filteredGuides.push(guide);
        }
      });
    });
  }

  // Check if filteredGuides is less than four items, if so, match by category
  if (filteredGuides.length < 4) {
    allItems.forEach((guide) => {
      if (guide.category) {
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
      }
    });
  }

  filteredGuides = removeDuplicateResults(filteredGuides);

  for (let i = recommendedGuides.length; i < 4; i++) {
    let randomNumber = Math.floor(Math.random() * filteredGuides.length);
    recommendedGuides.push(filteredGuides.splice(randomNumber, 1)[0]);
  }

  return recommendedGuides;
}

localsGuideContent();
