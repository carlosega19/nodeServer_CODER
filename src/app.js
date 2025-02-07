import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import { engine } from "express-handlebars";
import http from "http";
import setUpSocketServer from "./sockets/socket.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const server = http.createServer(app);
const PORT = 8080;
setUpSocketServer(server);


// Config
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//-------------------------------------------

// Endpoints
app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

server.listen(PORT, () => {
    console.log('\n[SERVIDOR INICIADO]\n\x1b[32m==> http://localhost:8080\x1b[0m');
});