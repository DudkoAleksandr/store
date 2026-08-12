const card = document.querySelector(".cards");
const inputSearch = document.querySelector(".input__search");
const rangePrice = document.querySelector(".range__price");
const rangeMin = document.querySelector(".range__min");
const rangeMax = document.querySelector(".range__max");
const selectSort = document.querySelector(".select__sort");
const rangeResult = document.querySelector(".range__resualt");
const inputSale = document.querySelector("#check");
const btnFilter = document.querySelector(".btn__filter");
const filterWrap = document.querySelector(".filter");

import { products } from "./data.js";

const basket = JSON.parse(localStorage.getItem("productsBasket")) || [];

function render(products) {
  card.innerHTML = "";
  for (let product of products) {
    const html = `
    <div class="card">
    <div class="card__img-wrapper">
    <img class="card__img" src="${product.image}" alt="">
    </div>
    <h1 class="card__title">${product.title}</h1>
    <p class="card__price">Цена: ${product.price}</p>
    <p class="card__rating">Рейтинг: ${product.rating}</p>
    <button id = "${product.id}" class="card__btn">Добавить в корзину</button>
    </div>
`;
    card.insertAdjacentHTML("beforeend", html);
  }
  const btnBasket = document.querySelectorAll(".card__btn");
  btnBasket.forEach((buttonAdd) => {
    buttonAdd.addEventListener("click", () => {
      let findProduct = products.find((product) => {
        return product.id === Number(buttonAdd.id);
      });
      const findIndex = basket.findIndex((element) => {
        return findProduct.id === element.id;
      });
      if (basket[findIndex]) {
        basket[findIndex].count++;
      } else {
        findProduct.count = 1;
        basket.push(findProduct);
      }
      localStorage.setItem("productsBasket", JSON.stringify(basket));
      console.log(basket);
    });
  });
}
render(products);

inputSearch.addEventListener("input", () => {
  const searchProducts = [];

  for (let product of products) {
    if (product.title.toLowerCase().includes(inputSearch.value.toLowerCase())) {
      searchProducts.push(product);
    }
  }

  render(searchProducts);
});

function price() {
  const prices = products.map((product) => {
    return product.price;
  });
  let priceMin = prices[0];
  let priceMax = prices[0];

  for (let price of prices) {
    if (price > priceMax) {
      priceMax = price;
    }
    if (price < priceMin) {
      priceMin = price;
    }
  }
  rangeMin.innerHTML = priceMin;
  rangeMax.innerHTML = priceMax;
  rangePrice.min = priceMin;
  rangePrice.max = priceMax;
  rangePrice.value = rangePrice.max;
  rangeResult.innerHTML = rangePrice.value;
}
price();

rangePrice.addEventListener("input", () => {
  rangeResult.innerHTML = rangePrice.value;
  const priceCard = [];
  for (let productPrice of products) {
    if (rangePrice.value >= productPrice.price) {
      priceCard.push(productPrice);
    }
  }
  render(priceCard);
  rangeResult.style.left = (rangePrice.value * 100) / rangePrice.max + "%";
});

selectSort.addEventListener("change", () => {
  if (selectSort.value === "price-up") {
    sortMin();
    render(sortProducts);
  } else if (selectSort.value === "price-down") {
    sortMax();
    render(sortProducts);
  } else if (selectSort.value === "rating") {
    sortRating();
    render(sortProducts);
  } else {
    render(products);
  }
});
const sortProducts = [...products];

function sortMin() {
  sortProducts.sort((a, b) => a.price - b.price);
}
function sortMax() {
  sortProducts.sort((a, b) => b.price - a.price);
}
function sortRating() {
  sortProducts.sort((a, b) => a.rating - b.rating);
}

inputSale.addEventListener("change", () => {
  const productsSale = products.filter((el) => {
    if (el.sale === true) {
      return el;
    }
  });
  if (inputSale.checked === true) {
    render(productsSale)
  } else {
    render(products)
  }
});

btnFilter.addEventListener('click', () => {
filterWrap.classList.toggle('filter__none')
if(filterWrap.classList.contains('filter__none')){
  btnFilter.innerHTML = 'Фильтр'
} else {
  btnFilter.innerHTML = 'Закрыть фильтр'
}
})