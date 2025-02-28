import express from "express";
import prodMng from "../controllers/ProductManager.js";
import cartMng from "../controllers/CartManager.js";


const viewsRouter = express.Router();
viewsRouter.get("/", (req, res) => {
    res.render("home");
});

viewsRouter.get("/products", async  (req, res) => {
    try {
        const {category, priceOrder, page} = req.query;
        const data = await prodMng.getProducts(category, priceOrder, page);
        res.render("products", data);
    } catch (error) {
        res.status(500);
    }
});

viewsRouter.get("/product/:id", async (req, res) => {
    try {
        const data = await prodMng.getProductById(req.params.id);
        res.render("product", data);
    } catch (error) {
        res.status(500);
    }
});

viewsRouter.get("/cart/:id", async(req, res) => {
    try {
        const cart = await cartMng.findCartById(req.params.id);
        res.render("cart", {products: cart.products});
    } catch (error) {
        res.status(500);
    }
});

export default viewsRouter;