import express from "express";
import { ProductManager } from "../controllers/ProductManager.js";


const productsRouter = express.Router();
const productMg = new ProductManager("./src/DB/products.json");

// get all
productsRouter.get("/", async (req, res) => {
    const data = await productMg.getProducts();
    res.status(200).send(data);
});

// get by id
productsRouter.get("/:id", async (req, res) => {    
    const { id } = req.params;
    const data = await productMg.getProductById(id);
    if (!data) return res.status(404).send({message:"Product not founded."});
    return res.status(200).send(data);
});

// add product
productsRouter.post("/", async (req, res) => {
    const product = req.body;
    try {
        const data = await productMg.addProduct(product);
        return res.status(201).send(data);
    } catch (err) {
        return res.status(400).send({ message: err});
    }
});

// update product by id
productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const data = await productMg.modifyProduct(id, product);
        return res.status(201).send(data);
    } catch (err) {
        return res.status(400).send({ message: "=> " + err});
    }
});

// delete product by id
productsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    productMg.deleteProductById(id);
    return res.status(200).send({message: "Ok"});
});

export default productsRouter;