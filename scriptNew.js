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
const checkboxBrand = document.querySelectorAll(
  ".checkbox__search-brand input",
);

import { products } from "./data.js";

const basket = JSON.parse(localStorage.getItem("productsBasket")) || [];
console.log(basket)
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
    <div class="card__btn-basket hidden">
    <button class="card__btn-basket-plus">+</button><p>0</p><button class="card__btn-basket-min">-</button>
    </div>
    </div>
`;
    card.insertAdjacentHTML("beforeend", html);
  }
  const btnBasket = document.querySelectorAll(".card__btn");
  const btnBlock = document.querySelectorAll(".card__btn-basket");
  btnBasket.forEach((buttonAdd, index) => {
    buttonAdd.addEventListener("click", () => {
      console.log(index)
      btnBlock[index].classList.remove("hidden");
      buttonAdd.innerHTML = "Товар в корзине";

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
    });
  });
}
render(products);

inputSearch.addEventListener("input", () => {
  filterProducts();
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
  rangeResult.style.left = (rangePrice.value * 100) / rangePrice.max + "%";

  filterProducts();
});

selectSort.addEventListener("change", () => {
  filterProducts();
});

inputSale.addEventListener("change", () => {
  filterProducts();
});

btnFilter.addEventListener("click", () => {
  filterWrap.classList.toggle("filter__none");
  if (filterWrap.classList.contains("filter__none")) {
    btnFilter.innerHTML = "Фильтр";
  } else {
    btnFilter.innerHTML = "Закрыть фильтр";
  }
});

function filterProducts() {
  let newProducts = [...products];

  newProducts = newProducts.filter((product) => {
    return product.title
      .toLowerCase()
      .includes(inputSearch.value.toLowerCase());
  });

  const checkBrands = [];
  checkboxBrand.forEach((Brand) => {
    if (Brand.checked === true) {
      checkBrands.push(Brand.value);
    }
  });
  if (checkBrands.length != 0) {
    newProducts = newProducts.filter((product) => {
      return checkBrands.includes(product.brand);
    });
  }

  if (inputSale.checked === true) {
    newProducts = newProducts.filter((el) => {
      return el.sale === true;
    });
  }

  newProducts = newProducts.filter((product) => {
    return product.price <= Number(rangePrice.value);
  });

  if (selectSort.value === "price-up") {
    newProducts.sort((a, b) => a.price - b.price);
  } else if (selectSort.value === "price-down") {
    newProducts.sort((a, b) => b.price - a.price);
  } else if (selectSort.value === "rating") {
    newProducts.sort((a, b) => a.rating - b.rating);
  }

  render(newProducts);
}
// const checkBrands = [];

checkboxBrand.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    filterProducts();
    // if(checkbox.checked === true){
    //   checkBrands.push(checkbox.value)
    // }
    // console.log(checkBrands)
    // let newProducts = [...products]
    // newProducts = newProducts.filter((product) => {
    //   return product.brand === checkbox.value
    // })
    // console.log(newProducts)
    // console.log(checkbox.value)
  });
});
