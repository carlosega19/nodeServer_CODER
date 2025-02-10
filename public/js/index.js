const socket = io();




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

async function updateView() {
    const data = await fetch("http://localhost:8080/api/products", {
        method:"GET"
    }).then(res => res.json())
    .then(products => products)
    .catch(e => {});
    if(!data) return;
    
    const container = document.querySelector('.products-container');
    container.innerHTML = "";
    for (const prod of data) {
        container.innerHTML += `
            <div class="product-card ${prod.stock ? "available" : "soldout"}">
                <img src="./imgs/products/clothe2.webp" alt="">
                <h3>${prod.code} - ${prod.title}</h3>
                    <b>${prod.description}</b>
                <p>${prod.price} $</p>
            </div>
        `;
    }
}

socket.on("product added", () => {
    console.log("PRODUCTO ANADIDO");
    updateView();
});
