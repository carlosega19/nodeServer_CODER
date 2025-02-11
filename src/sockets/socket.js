import { Server } from "socket.io";
import { ProductManager } from "../controllers/ProductManager.js";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        const productManager = new ProductManager("./src/DB/products.json");
        console.log("Cliente conectado");

        socket.on("add product", (prod) => {
            productManager.addProduct(prod);
            io.emit("product added");
        });

        socket.on("product deleted", (id) => {
            productManager.deleteProductById(id);
            io.emit("delete broadcast");
        });
    });
    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;