import { Server } from "socket.io";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log("Cliente conectado");

        socket.on("add product", async (prod) => {
            io.emit("product added");
        });

        socket.on("product deleted", async (id) => {
            io.emit("delete broadcast");
        });
    });
    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;