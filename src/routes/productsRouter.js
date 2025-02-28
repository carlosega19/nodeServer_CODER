import express from "express";
import prodManager from "../controllers/ProductManager.js";

const productsRouter = express.Router();

// get all
productsRouter.get("/", async (req, res) => {
    try {
        res.status(200).send(await prodManager.getProducts());
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// get by id
productsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).send(await prodManager.getProductById(id));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// add product
productsRouter.post("/", async (req, res) => {
    try {
        const product = req.body;
        res.status(201).send(await prodManager.addProduct(product));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// update product by id
productsRouter.put("/:id", async (req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;
        res.status(201).send(await prodManager.updateProduct(id, product));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// delete product by id
productsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).send(await prodManager.deleteProduct(id));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

export default productsRouter;