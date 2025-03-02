const socket = io();
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
/* SOCKET */
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
socket.on("cart created", (cartId) => {
    localStorage.setItem("cartId", cartId);
    window.location.href = `/cart/${cartId}`;
});
socket.on("cart updated", ({cartId, message}) => {
    showNotification(message);
    setTimeout(() => {
        window.location.href = `/cart/${cartId}`;
    }, 2000);
});

const cartBtn = document.querySelector(".fa-bag-shopping");
const menuBtn = document.querySelector(".fa-bars");

cartBtn.addEventListener("click", () => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) window.location.href = `/cart/${cartId}`;
    else socket.emit("create cart");
});
menuBtn.addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("hidden");
});

//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------
/* FUNCTIONS */
//-----------------------------------------------------------
//-----------------------------------------------------------
//-----------------------------------------------------------

function showNotification(message) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

function applyFilters() {
    const filters = document.querySelectorAll('.filters-container button.active');
    const newUrl = new URL(window.location.href);
    newUrl.search = "";
    filters.forEach(filter => {
        newUrl.searchParams.append(filter.id.split("=")[0], filter.id.split("=")[1]);
    });
    window.location.href = newUrl;
}

function initButtonsBehavior() {
    const filtersButton = document.querySelectorAll('.filters-container button');
    const params = getParams();
    if (!filtersButton) return;
    filtersButton.forEach(btn => {
        const [paramName, paramValue] = btn.id.split("=");
        if (params.has(paramName) && params.get(paramName) === paramValue) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');

            filtersButton.forEach(otherBtn => {
                if (otherBtn.id.split("=")[0] === paramName && otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                }
            });
            applyFilters();
        });
    });
}


function initProductsBehavior() {
    const products = document.querySelectorAll('.product');
    if (!products) return;
    products.forEach(prod => {
        prod.addEventListener('click', () => {
            window.location.href = `/product/${prod.dataset.id}`;
        });
        prod.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(prod.dataset.id);
        });
    });
}

async function initCartBehavior() {
    const delProductBtns = document.querySelectorAll('.product-cart-btns');
    if (!delProductBtns) return;
    delProductBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cartId = localStorage.getItem("cartId");
            const productId = btn.dataset.id;
            socket.emit("remove from cart", { cartId, productId });
        });
    });
}

function getParams() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params;
}

function addToCart(productId) {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
        socket.emit("create cart");
        showNotification("Try again !");
        return;
    }
    socket.emit("add to cart", { cartId, productId });
}

document.addEventListener("DOMContentLoaded", () => {
    initButtonsBehavior();
    initProductsBehavior();
    initCartBehavior();
});

