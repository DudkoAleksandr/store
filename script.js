const card = document.querySelector(".cards");
const inputSearch = document.querySelector(".input__search");
const rangePrice = document.querySelector(".range__price");
const rangeMin = document.querySelector(".range__min");
const rangeMax = document.querySelector(".range__max");
const selectSort = document.querySelector(".select__sort");
const rangeResult = document.querySelector(".range__resualt");

const products = [
  {
    id: 1,
    title: "Ноутбук Lenovo IdeaPad",
    category: "Ноутбуки",
    brand: "Lenovo",
    price: 54990,
    rating: 4.7,
    stock: 8,
    color: "Серый",
    sale: true,
    image: "img/LenovoIdeaPad.webp",
  },
  {
    id: 2,
    title: "Смартфон Samsung Galaxy A56",
    category: "Смартфоны",
    brand: "Samsung",
    price: 31990,
    rating: 4.8,
    stock: 15,
    color: "Черный",
    sale: false,
    image: "img/SamsungGalaxyA56.webp",
  },
  {
    id: 3,
    title: "Наушники JBL Tune 720BT",
    category: "Наушники",
    brand: "JBL",
    price: 6990,
    rating: 4.5,
    stock: 22,
    color: "Синий",
    sale: true,
    image: "img/JBLTune720BT.webp",
  },
  {
    id: 4,
    title: "Монитор LG UltraWide",
    category: "Мониторы",
    brand: "LG",
    price: 24990,
    rating: 4.9,
    stock: 5,
    color: "Черный",
    sale: false,
    image: "img/LGUltraWide.webp",
  },
  {
    id: 5,
    title: "Клавиатура Logitech MX Keys",
    category: "Клавиатуры",
    brand: "Logitech",
    price: 9990,
    rating: 4.8,
    stock: 11,
    color: "Черный",
    sale: true,
    image: "img/LogitechMXKeys.webp",
  },
  {
    id: 6,
    title: "Мышь Logitech G304",
    category: "Мыши",
    brand: "Logitech",
    price: 4290,
    rating: 4.6,
    stock: 20,
    color: "Белый",
    sale: false,
    image: "img/LogitechG304.webp",
  },
  {
    id: 7,
    title: "Планшет Apple iPad Air",
    category: "Планшеты",
    brand: "Apple",
    price: 67990,
    rating: 4.9,
    stock: 4,
    color: "Синий",
    sale: false,
    image: "img/AppleiPadAir.webp",
  },
  {
    id: 8,
    title: "Умные часы Xiaomi Watch S3",
    category: "Часы",
    brand: "Xiaomi",
    price: 15990,
    rating: 4.4,
    stock: 17,
    color: "Черный",
    sale: true,
    image: "img/XiaomiWatchS3.webp",
  },
  {
    id: 9,
    title: "Колонка JBL Flip 6",
    category: "Колонки",
    brand: "JBL",
    price: 10990,
    rating: 4.8,
    stock: 9,
    color: "Красный",
    sale: false,
    image: "img/JBLFlip6.webp",
  },
];

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

rangePrice.addEventListener("change", () => {
  rangeResult.innerHTML = rangePrice.value;
  const priceCard = [];
  for (let productPrice of products) {
    if (rangePrice.value >= productPrice.price) {
      priceCard.push(productPrice);
    }
  }
  render(priceCard);
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
