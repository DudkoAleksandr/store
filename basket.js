const basketCards = document.querySelector(".basket__cards");
const basketPrice = document.querySelector(".basket__price");

let products = JSON.parse(localStorage.getItem("productsBasket")) || [];
console.log(products);

function render(products) {
  basketCards.innerHTML = "";
  for (let product of products) {
    let price = product.count * product.price;
    const html = `
        <div class="card__basket">
        <img class="card__basket-img" src="${product.image}" alt="">
        <div class="card__basket-text">
        <p class="card__basket-title">${product.title}</p> 
        <div class="btn__count">
        <button id="${product.id}" class="btn__count-min">-</button><p class="card__basket-count">${product.count}</p><button id="${product.id}" class="btn__count-plus">+</button>
        </div>
        </div>
        <p>${price}</p>
        <button id="${product.id}" class="btn__basket-del">Удалить</button>
    </div>
    `;
    basketCards.insertAdjacentHTML("beforeend", html);
  }
  // const btnsCountMin = document.querySelectorAll(".btn__count-min");
  // // btnsCountMin.forEach((btnCountMin, index) => {
  // //   if (products[index].count <= 1) {
  // //     btnCountMin.disabled = true;
  // //   }
  // // });

  // btnsCountMin.forEach((btnCountMin) => {
  //   for (let product of products) {
  //     if (product.id === Number(btnCountMin.id)) {
  //       if (product.count <= 1) {
  //         btnCountMin.disabled = true;
  //       }
  //     }
  //   }
  // });
}
render(products);

basketCards.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn__basket-del")) {
    let newProducts = products.filter(
      (product) => product.id !== Number(event.target.id),
    );
    products = [...newProducts];
    render(products);
    localStorage.setItem("productsBasket", JSON.stringify(products));
    console.log(newProducts, event.target);
  } else if (event.target.classList.contains("btn__count-plus")) {
    const productPlus = products.find(
      (product) => product.id === Number(event.target.id),
    );
    productPlus.count++;
    render(products);
  } else if (event.target.classList.contains("btn__count-min")) {
    const productMin = products.find(
      (product) => product.id === Number(event.target.id),
    );
    productMin.count--;
    render(products);
  }
  finishPrice();
});

function finishPrice() {
  let priceFinis = 0;
  for (let product of products) {
    priceFinis = priceFinis + product.price * product.count;
  }
  if (priceFinis > 0) {
    basketPrice.innerHTML = `Сумма: ${priceFinis}`;
  } else if (priceFinis <= 0) {
    basketPrice.innerHTML = "Корзина пустая";
  }
}
finishPrice();
