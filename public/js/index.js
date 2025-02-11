const socket = io();

// Sockets config
socket.on("product added", () => {
    updateView();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added",
        showConfirmButton: false,
        timer: 1500
    });
});
socket.on("delete broadcast", () => {
    updateView();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product deleted",
        showConfirmButton: false,
        timer: 1500
    });
});

/* REAL TIME FORM */
const prodForm = document.getElementById("prod-form");
prodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("titleInput");
    const descInput = document.getElementById("descInput");
    const priceInput = document.getElementById("priceInput");
    const stockInput = document.getElementById("stockInput");
    const categoryInput = document.getElementById("categoryInput");
    const statusInput = document.getElementById("statusInput");
    
    socket.emit("add product", {
        title: titleInput.value,
        description: descInput.value,
        price: parseFloat(priceInput.value),
        stock: parseInt(stockInput.value),
        status: statusInput.checked,
        category: categoryInput.value
    });
    titleInput.value = "";
    descInput.value = "";
    priceInput.value = 0;
    stockInput.value = 0;
    categoryInput.value = "";
    statusInput.checked = false;
});

function initProductsBehavior() {
    const products = document.querySelectorAll(".product-card");
    products.forEach(prodDiv => {
        prodDiv.addEventListener('click', () => {
            Swal.fire({
                title: "Do you want to delete this product?",
                showCancelButton: true,
                confirmButtonText: "Delete"
            })
            .then((res) => {
                if (res.isConfirmed) {
                    socket.emit("product deleted", parseInt(prodDiv.dataset.id));
                }
            })
        })
    });
}
async function getProducts() {
    const response = await fetch("http://localhost:8080/api/products", {
        method: "GET"
    });
    const products = await response.json();
    return products;
}

async function updateView() {
    const data = await getProducts();
    
    const container = document.querySelector('.products-container');
    container.innerHTML = "";
    for (const prod of data) {
        container.innerHTML += `
            <div class="product-card ${prod.stock ? "available" : "soldout"}" data-id="${prod.id}">
                <img src="./imgs/products/clothe2.webp" alt="">
                <h3>${prod.code} - ${prod.title}</h3>
                    <b>${prod.description}</b>
                <p>${prod.price} $</p>
            </div>
        `;
    }

    initProductsBehavior();
}

initProductsBehavior();