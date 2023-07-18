fetch("/data/locals-guide.json")
  .then((response) => response.json())
  .then((data) => buildPage(data))
  .catch((error) => console.log(error));

function buildPage(data) {
  const mainImg = document.querySelector("#main-img");
  const donationContainer = document.querySelector(".donation-container");

  let path = window.location.pathname;
  let pageData;
  data.forEach((item) => {
    if (path.includes(item.url)) {
      pageData = item;
    }
  });

  //Add Header Image for article
  const headerImage = document.createElement("img");
  headerImage.src = `/assets/locals-guide/${pageData.mainImg}`;
  headerImage.alt = pageData.mainAlt;
  mainImg.appendChild(headerImage);

  if (pageData.rating) {
    const rating = document.querySelector(".rating");

    //Update scoring for article
    const score = document.createElement("p");
    score.textContent = pageData.rating;
    rating.append(score);
  }

  //Donation copy
  const donationHeader = document.createElement("h3");
  donationHeader.textContent = "Want to say thanks for the helpful content?";
  donationContainer.appendChild(donationHeader);

  const donationBody = document.createElement("p");
  donationBody.textContent = `Contrary to popular belief, Lorem Ipsum is not simply random text.
  It has roots in a piece of classical Latin literature from 45 BC,
  making it over 2000 years old.`;
  donationContainer.appendChild(donationBody);

  const donationCTA = document.createElement("button");
  donationCTA.classList.add("color-primary-btn");
  donationCTA.textContent = "Buy me a coffee";
  donationContainer.appendChild(donationCTA);

  donationCTA.addEventListener("click", () => {
    window.open(
      "https://www.paypal.com/donate/?hosted_button_id=24KTEDXSK6HWE",
      "_blank"
    );
  });

  if (pageData.address && pageData.address.length > 0) {
    const locations = document.querySelector(".location-information-section");

    pageData.address.forEach((location) => {
      buildLocation(location);
    });

    if (pageData.address.length > 1) {
      multiLocation();
      locations.classList.add("multi-active");
    } else {
      locations.classList.add("multi-inactive");
    }
  }
}

function buildLocation(data) {
  let daysOfWeek = ["M", "T", "W", "Th", "F", "Sat", "Sun"];
  const locations = document.querySelector(".location-information-section");

  const location = document.createElement("div");
  location.classList.add("container", "location-details");
  locations.appendChild(location);

  const locationFigure = document.createElement("figure");
  location.appendChild(locationFigure);

  const locationImage = document.createElement("img");
  locationImage.src = `/assets/locals-guide/${data.image}`;
  locationImage.alt = data.alt;
  locationFigure.appendChild(locationImage);

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  location.appendChild(detailsContainer);

  const locationHeader = document.createElement("h2");
  locationHeader.textContent = data.name;
  detailsContainer.appendChild(locationHeader);

  const locationAddress = document.createElement("address");
  locationAddress.innerHTML = `${data.street}<br />${data.city}, ${data.state} ${data.zip}`;
  detailsContainer.appendChild(locationAddress);

  const locationHours = document.createElement("ul");
  detailsContainer.appendChild(locationHours);

  //Data.hours[0] = Mondays hours
  data.hours.forEach((day, index) => {
    const locationHour = document.createElement("li");
    const dayEmphasis = document.createElement("span");
    dayEmphasis.classList.add("day-of-week");
    dayEmphasis.textContent = `${daysOfWeek[index]}: `;
    locationHour.appendChild(dayEmphasis);
    locationHour.append(day);
    locationHours.appendChild(locationHour);
  });

  if (data.website) {
    const websiteBtn = document.createElement("button");
    websiteBtn.classList.add("black-primary-btn");
    websiteBtn.textContent = "View website";
    detailsContainer.append(websiteBtn);

    websiteBtn.addEventListener("click", () => {
      window.open(data.website);
    });
  }

  if (data.phone) {
    const phoneBtn = document.createElement("button");
    phoneBtn.classList.add("black-secondary-btn");
    phoneBtn.textContent = data.phone;
    detailsContainer.append(phoneBtn);

    phoneBtn.addEventListener("click", () => {
      window.location.href = `tel:${data.phone}`;
    });
  }
}

function multiLocation() {
  const allLocations = document.querySelectorAll(".location-details");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  counter = 0;

  allLocations[counter].style.display = "flex";

  prevBtn.addEventListener("click", () => {
    allLocations[counter].style.display = "none";
    if (counter === 0) {
      counter = allLocations.length - 1;
    } else {
      counter--;
    }
    allLocations[counter].style.display = "flex";
  });

  nextBtn.addEventListener("click", () => {
    allLocations[counter].style.display = "none";
    if (counter === allLocations.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
    allLocations[counter].style.display = "flex";
  });
}