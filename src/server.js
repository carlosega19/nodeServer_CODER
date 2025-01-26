import express from "express";
import productsRouter from "./routes/productsRouter.js";

const app = express();
// Config
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Endpoints
app.use("/api/products", productsRouter);


app.listen(8080, async() => {
    console.log('\n[SERVIDOR INICIADO]\n\x1b[32m==> http://localhost:8080\x1b[0m');
});