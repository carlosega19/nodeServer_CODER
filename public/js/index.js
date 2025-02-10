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
        price: priceInput.value,
        stock: stockInput.value,
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

function updateView() {

}

socket.on("product added", () => {
    
});
