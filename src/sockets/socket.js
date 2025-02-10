import { Server } from "socket.io";
import { ProductManager } from "../controllers/ProductManager.js";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log("Cliente conectado");

        socket.on("add product", (prod) => {
            const productManager = new ProductManager("./src/DB/products.json");
            productManager.addProduct(prod);
            socket.emit("product added");
        });


    });
    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;