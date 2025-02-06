import { Server } from "socket.io";

const setUpSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log("Cliente conectado");
    });


    console.log("--SOCKET CREADO--");
}


export default setUpSocketServer;