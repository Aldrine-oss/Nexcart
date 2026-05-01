const API = "https://your-backend.up.railway.app";

// LOAD PRODUCTS
fetch(API + "/api/products")
.then(res => res.json())
.then(data => {
  let html = "";
  data.forEach(p => {
    html += `
      <div>
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
      </div>
    `;
  });
  document.getElementById("products").innerHTML = html;
});

// ADD TO CART
function addToCart(product) {
  fetch(API + "/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
    body: JSON.stringify({ product })
  });
}