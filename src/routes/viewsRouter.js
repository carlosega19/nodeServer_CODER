import express from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
    res.render("home");
});

viewsRouter.get("/realtimeproducts", async  (req, res) => {
    const pdManager = new ProductManager("./src/DB/products.json");
    const data = await pdManager.getProducts();
    res.render("realTimeProducts", {products: data});
});

export default viewsRouter;