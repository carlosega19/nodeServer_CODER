const socket = io();

// Sockets config
socket.on("product added", (products) => {
    updateView(products);
    showNotification("Product added");
});

socket.on("delete broadcast", (products) => {
    updateView(products);
    showNotification("Product deleted");
});

/* REAL TIME FORM
const prodForm = document.getElementById("prod-form");
prodForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const productData = getProductFormData();
    socket.emit("add product", productData);
    resetProductForm();
}

function getProductFormData() {
    return {
        title: document.getElementById("titleInput").value,
        description: document.getElementById("descInput").value,
        price: parseFloat(document.getElementById("priceInput").value),
        stock: parseInt(document.getElementById("stockInput").value),
        status: document.getElementById("statusInput").checked,
        category: document.getElementById("categoryInput").value
    };
}

function resetProductForm() {
    document.getElementById("titleInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("priceInput").value = 0;
    document.getElementById("stockInput").value = 0;
    document.getElementById("categoryInput").value = "";
    document.getElementById("statusInput").checked = false;
}*/

function showNotification(message) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

function initProductsBehavior() {
    const container = document.querySelector('.products-container');
    container.addEventListener('click', (e) => {
        if (e.target.closest('.product-card')) {
            const prodDiv = e.target.closest('.product-card');
            handleProductClick(prodDiv);
        }
    });
}

function handleProductClick(prodDiv) {
    Swal.fire({
        title: "Do you want to delete this product?",
        showCancelButton: true,
        confirmButtonText: "Delete"
    })
    .then((res) => {
        if (res.isConfirmed) {
            socket.emit("product deleted", parseInt(prodDiv.dataset.id));
        }
    });
}

async function updateView(data) {
    const container = document.querySelector('.products-container');
    container.innerHTML = "";

    data.forEach(prod => {
        container.innerHTML += `
            <div class="product-card ${prod.stock ? "available" : "soldout"}" data-id="${prod.id}">
                <img src="./imgs/products/clothe2.webp" alt="">
                <h3>${prod.code} - ${prod.title}</h3>
                <b>${prod.description}</b>
                <p>${prod.price} $</p>
            </div>
        `;
    });

    initProductsBehavior();
}

initProductsBehavior();