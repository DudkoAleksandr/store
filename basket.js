const basketCards = document.querySelector(".basket__cards");

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
    products = [...newProducts]
    render(products);
    localStorage.setItem("productsBasket", JSON.stringify(products));
    console.log(newProducts, event.target)
  } else if (event.target.classList.contains("btn__count-plus")) {
    console.log("+");
  } else if (event.target.classList.contains("btn__count-min")) {
    console.log("-");
  }
});
