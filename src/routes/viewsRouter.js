import express from "express";
import ProductManager from "../controllers/ProductManager.js";


const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
    res.render("home");
});

viewsRouter.get("/products", async  (req, res) => {
    try {
        const prodMng = new ProductManager();
        const {category, priceOrder, page} = req.query;
        const data = await prodMng.getProducts(category, priceOrder, page);
        res.render("products", data); 
    } catch (error) {
        res.status(500);
    }
});

export default viewsRouter;