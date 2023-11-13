"use strict";

const apiKey = '__Your_API_KEY__';
const url = "https://newsapi.org/v2/everything?q=";

// Call the function to load window
window.addEventListener("load", () => fetchNews("India"));

//////////////////////
// Responsive navbar
const hamIcon = document.querySelector(".ham-icon");
const mobileNav = document.querySelector(".mobile-navbar");

hamIcon.addEventListener("click", () => {
  const icon = document.querySelector(".ham-icon i");
  icon.classList.toggle("ri-menu-3-fill");
  icon.classList.toggle("ri-close-circle-fill");

  document.querySelector(".mobile-navbar").style.display = "flex";

  if (icon.classList == "ri-menu-3-fill") {
    document.querySelector(".mobile-navbar").style.display = "none";
  }
});

//////////////////////
// Reload function
const reload = () => {
  window.location.reload();
};

/////////////////////////////////
// Async function to fetch news
const fetchNews = async (query) => {
  try {
    const result = await fetch(`${url}${query}&apikey=${apiKey}`);
    const data = await result.json();
    // console.log(data);
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

//////////////////////
// Bind Data function
const bindData = (articles) => {
  const cardsContainer = document.getElementById("cards-container");
  const newscardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newscardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
};

// Fill Data in card
const fillDataInCard = (cardClone, article) => {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  // Getting date
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  // Onclick sent to the article.url
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
};

//////////////////////
// Active nav links
let activeSelectedNav = null;

const onNavItemClick = (id) => {
  fetchNews(id);
  const navItem = document.getElementById(id);
  activeSelectedNav?.classList.remove("active");
  activeSelectedNav = navItem;
  activeSelectedNav.classList.add("active");
};

//////////////////////
// Search Btn feature
const searchBtn = document.getElementById("search-btn");
const searchText = document.getElementById("search-text");
const mobileSearchBtn = document.getElementById("mobile-search-btn");
const mobileSearchText = document.getElementById("mobile-search-text");

searchBtn.addEventListener("click", () => {
  const query = searchText.value;

  if (!query) return;

  fetchNews(query);
});

mobileSearchBtn.addEventListener("click", () => {
  const query = mobileSearchText.value;

  if (!query) return;

  fetchNews(query);
});
