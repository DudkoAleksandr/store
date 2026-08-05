const basketCards = document.querySelector(".basket__cards");

let products = JSON.parse(localStorage.getItem("productsBasket"));
console.log(products);

function render(products) {
  basketCards.innerHTML = "";
  for (let product of products) {
    const html = `
        <div class="card__basket">
        <img class="card__basket-img" src="${product.image}" alt="">
        <div class="card__basket-text">
        <p class="card__basket-title">${product.title}</p> 
        <div class="btn__count">
        <button id="${product.id}" class="btn__count-min">-</button><p class="card__basket-count">${product.count}</p><button id="${product.id}" class="btn__count-plus">+</button>
        </div>
        </div>
        <p>${product.price}</p>
        <button class="btn__basket-del">Удалить</button>
    </div>
    `;
    basketCards.insertAdjacentHTML("beforeend", html);
  }
  const btnsCountMin = document.querySelectorAll(".btn__count-min");
  btnsCountMin.forEach((btnCountMin, index) => {
      if (products[index].count <= 1) {
        btnCountMin.disabled = true
      }
  });
}
render(products);
