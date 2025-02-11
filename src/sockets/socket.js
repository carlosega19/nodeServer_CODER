import { Server } from "socket.io";
import { ProductManager } from "../controllers/ProductManager.js";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        const productManager = new ProductManager("./src/DB/products.json");
        console.log("Cliente conectado");

        socket.on("add product", async (prod) => {
            await productManager.addProduct(prod);
            io.emit("product added", await productManager.getProducts());
        });

        socket.on("product deleted", async (id) => {
            await productManager.deleteProductById(id);
            io.emit("delete broadcast", await productManager.getProducts());
        });
    });
    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;