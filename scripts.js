// Datos de productos
const products = [
  { id: 1, name: "Disco Rock A", category: "rock", price: 15, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Disco Pop B", category: "pop", price: 25, img: "https://via.placeholder.com/150" },
  { id: 3, name: "Disco Jazz C", category: "jazz", price: 18, img: "https://via.placeholder.com/150" },
  { id: 4, name: "Disco Clásica D", category: "classica", price: 12, img: "https://via.placeholder.com/150" },
  { id: 5, name: "Disco Rock E", category: "rock", price: 30, img: "https://via.placeholder.com/150" },
];

// Carrito de compras
let cart = [];

// Función para mostrar productos en la tienda
function showProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  
  products.forEach(product => {
    const productCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    `;
    productList.innerHTML += productCard;
  });
}

// Función para agregar producto al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Función para actualizar el carrito y mostrar los productos
function updateCart() {
  const cartItemsList = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');
  
  cartItemsList.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    
    const cartItem = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
        <div>
          <button class="btn btn-sm btn-success" onclick="increaseQuantity(${item.id})">+</button>
          <button class="btn btn-sm btn-warning" onclick="decreaseQuantity(${item.id})">-</button>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">X</button>
        </div>
      </li>
    `;
    cartItemsList.innerHTML += cartItem;
  });
  
  totalPrice.innerText = `$${total.toFixed(2)}`;
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
    updateCart();
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else {
    removeFromCart(productId);
  }
  updateCart();
}

// Función para eliminar completamente un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Inicializar la tienda mostrando los productos
tshowProducts();
