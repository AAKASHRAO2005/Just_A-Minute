/* =====================
   PRODUCTS
===================== */
const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "image/tshirt.jpg" },
  { id: 2, name: "Shoes", price: 1999, image: "image/shoes.jpg" },
  { id: 3, name: "Watch", price: 1499, image: "image/watch.jpg" }
];

/* =====================
   LOAD PRODUCTS
===================== */
const productList = document.getElementById("product-list");

if (productList) {
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

/* =====================
   CART STATE
===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

/* =====================
   CART BADGE
===================== */
function updateCartBadge() {
  if (!cartCount) return;

  let totalItems = 0;
  cart.forEach(item => totalItems += item.quantity);

  cartCount.innerText = totalItems;
}

/* =====================
   ADD TO CART
===================== */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();

  alert("Added to cart ✅");
}

/* =====================
   DISPLAY CART
===================== */
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

function displayCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <div class="qty-controls">
            <button onclick="changeQty(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${item.id})">✕</button>
      </div>
    `;
  });

  if (total) total.innerText = "Total: ₹" + sum;
}

displayCart();

/* =====================
   QUANTITY & REMOVE
===================== */
function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
}

/* =====================
   CHECKOUT
===================== */
const form = document.getElementById("checkoutForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

    const overlay = document.getElementById("paymentOverlay");
    overlay.style.display = "flex";

    setTimeout(() => {
      localStorage.removeItem("cart");
      window.location.href = "success.html";
    }, 4000);
  });
}

/* =====================
   CHECKOUT SUMMARY
===================== */
const summaryItems = document.getElementById("summary-items");
const summaryTotal = document.getElementById("summary-total");

if (summaryItems && summaryTotal) {
  let sum = 0;
  summaryItems.innerHTML = "";

  cart.forEach(item => {
    sum += item.price * item.quantity;
    summaryItems.innerHTML += `
      <p>
        <span>${item.name} × ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </p>
    `;
  });

  summaryTotal.innerText = "Total: ₹" + sum;
}

/* =====================
   LOGO LANGUAGE ROTATION
===================== */
const brandText = document.getElementById("brandText");

if (brandText) {
  const words = [
    "Minute", // English
    "Minuto", // Spanish
    "Minute", // French
     "मिनट", // Hindi
    "Minut",  // German
    "Минутa", // Russian
    "دقيقة",  // Arabic
     "Minuto", // Italian
     "Minute", // Dutch
    "Minut",  // Polish
    "Minuta", // Portuguese
    "Minut",  // Swedish
    "Minut",  // Danish
    "分钟",   // Chinese
    "Minut",  // Norwegian
    "Минутa", // Bulgarian
    "Minut",  // Czech
    "Minut",  // Romanian
    "دقيقة" // Urdu"
  ];

  let index = 0;

  setInterval(() => {
    brandText.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % words.length;
      brandText.textContent = words[index];
      brandText.classList.remove("fade-out");
    }, 200);

  }, 500); // ✅ SAFE SPEED
}

/* =====================
   INIT
===================== */
updateCartBadge();
/* =====================
   TEXT FAVICON (CANVAS)
===================== */
(function createFavicon() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#28a745";
  ctx.fillRect(0, 0, 64, 64);

  // Text
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("J", 32, 36);

  // Create favicon
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = canvas.toDataURL("image/png");

  document.head.appendChild(link);
})();
