let ArrProducts = [
  {
    Id: 1,
    name: "HTML",
    image: "HTML.png",
    price: "500",
    rating: 5,
  },
  {
    Id: 2,
    name: "CSS",
    image: "CSS.png",
    price: "800",
    rating: 5,
  },
  {
    Id: 3,
    name: "JavaScript",
    image: "JS.png",
    price: "2000",
    rating: 5,
  },
  {
    Id: 4,
    name: "React",
    image: "React.png",
    price: "3000",
    rating: 5,
  },
  {
    Id: 5,
    name: "Angular",
    image: "Angular.png",
    price: "3000",
    rating: 5,
  },
  {
    Id: 6,
    name: "Node",
    image: "Node.png",
    price: "4000",
    rating: 5,
  },
];
const body = document.querySelector("body"),
  products = document.querySelector(".products"),
  shoppingBasket = document.querySelector(".shopping_basket"),
  closeCart = document.querySelector(".close"),
  productList = document.querySelector(".productList"),
  quantity = document.querySelector(".quantity"),
  total = document.querySelector(".total");

  shoppingBasket.onclick = () => {
  console.log("cart added");
  body.classList.add("active");
};

  closeCart.onclick = () => {
  body.classList.remove("active");
};

let checkOutList = [];

function OnInIt() {
  ArrProducts.forEach((item, key) => {
    let div = document.createElement("div");
    div.classList.add("item");

    let star = "";
    for (i = 0; i < item.rating; i++) {
        star +=`<i class="fa fa-star"></i>`;
    }

    div.innerHTML = `<img src="images/${item.image}" />
    <div class="name">${item.name}</div>
    <div>${star}</div>
    <div class="price">Rs. ${item.price}</div>
    <button onClick="addToCart(${key})"><i class="fa fa-cart-plus"></i>Add to Cart</button>
    `;

    products.appendChild(div);
  });
}
OnInIt();

function addToCart(Id) {
  if (checkOutList[Id] == null) {
    checkOutList[Id] = ArrProducts[Id];
    checkOutList[Id].quantity = 1;
  }else{
    checkOutList[Id].quantity += 1;
  }
  reloadCart();
}

function reloadCart() {
    productList.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    checkOutList.forEach((item, key) => {
        totalPrice += parseInt(item.price * item.quantity);
        count += item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `
        <img src="images/${item.image}">
        <div>${item.name}</div>
        <div>${item.price}</div>
        <div>
        <button onClick="changeQuantity(${key},${item.quantity-1})">-</button>
        <div class="count">${item.quantity}</div>
        <button onClick="changeQuantity(${key},${item.quantity+1})">+</button>
        </div>
        `;
        productList.appendChild(li);
    });

    total.innerHTML = `<small>Subtotal (${count}  items) Rs.</small>`+totalPrice;
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity) {
    if(quantity == 0) {
        delete checkOutList[key];
    }
    else{
        checkOutList[key].quantity = quantity;
    }
    reloadCart();
}