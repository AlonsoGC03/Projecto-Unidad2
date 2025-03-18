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
  
  // Función para mostrar productos
  function showProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    products.forEach(product => {
      const productCard = 
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
      ;
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
  
  // Función para actualizar el carrito
  function updateCart() {
    const cartItemsList = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const cartItem = 
        <li class="list-group-item d-flex justify-content-between">
          ${item.name} x ${item.quantity} - $${item.price * item.quantity}
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
        </li>
      ;
      cartItemsList.innerHTML += cartItem;
      total += item.price * item.quantity;
    });
    
    totalPrice.innerText = $${total.toFixed(2)};
  }
  
  // Función para eliminar producto del carrito
  function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      updateCart();
    }
  }
  
  // Filtros
  document.getElementById('categoriaFilter').addEventListener('change', applyFilters);
  document.getElementById('precioFilter').addEventListener('change', applyFilters);
  
  function applyFilters() {
    const category = document.getElementById('categoriaFilter').value;
    const priceRange = document.getElementById('precioFilter').value.split('-');
    
    const filteredProducts = products.filter(product => {
      const isCategoryMatch = category ? product.category === category : true;
      const isPriceMatch = priceRange.length === 1 || (product.price >= priceRange[0] && product.price <= priceRange[1]);
      return isCategoryMatch && isPriceMatch;
    });
    
    showFilteredProducts(filteredProducts);
  }
  
  // Función para mostrar los productos filtrados
  function showFilteredProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    filteredProducts.forEach(product => {
      const productCard = 
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
      ;
      productList.innerHTML += productCard;
    });
  }
  
  // Inicializar
  showProducts();
}

// Inicializar la tienda mostrando los productos
tshowProducts();
