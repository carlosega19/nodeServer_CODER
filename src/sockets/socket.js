import { Server } from "socket.io";
import cartManager from "../controllers/CartManager.js";
import prodManager from "../controllers/ProductManager.js";


const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log("Cliente conectado");

        socket.on('create cart', async () => {
            const cart = await cartManager.createCart();
            console.log(cart);
            socket.emit('cart created', cart._id);
        });

        socket.on("add to cart", async (data) => {
            const cart = await cartManager.addProductToCart(data.cartId, data.productId);
            socket.emit("cart updated", {cartId: cart._id, message: "Product added to cart"});
        });
        

        socket.on("remove from cart", async (data) => {
            const cart = await cartManager.deleteProductOfCart(data.cartId, data.productId);
            socket.emit("cart updated", {cartId: cart._id, message: "Product removed from cart"});
        });
    });
    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;