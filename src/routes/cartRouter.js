import express from "express";
import CartManager from "../controllers/CartManager.js";


const cartRouter = express.Router();
const cartManager = new CartManager();

cartRouter.get("/", async (req, res) => {
    try {
        await cartManager.getAll();
        res.status(200).send(await cartManager.getAll());
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// get cart by id
cartRouter.get("/:id", async (req, res) => {
    try {
        res.status(200).send(await cartManager.findCartById(req.params.id));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// add cart
cartRouter.post("/", async (req, res) => {
    try {
        const { products } = req.body;
        res.status(201).send(await cartManager.createCart(products));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// add product to a cart
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        res.status(200).send(await cartManager.addProductToCart(req.params.cid, req.params.pid));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});


// update cart
cartRouter.put("/:cid", async (req, res) => {
    try {
        const { products } = req.body;
        if (!products) throw new Error("Products are required");
        res.status(200).send(await cartManager.updateCart(req.params.cid, products));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message})
    }
});

// change qty of product in cart
cartRouter.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { qty } = req.body;
        const { cid, pid } = req.params;
        if (!qty) throw new Error("Qty is required");
        res.status(200).send(await cartManager.updateProductOfCart(cid, pid, qty));
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// delete product of cart
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    try {
        console.log("Borrando");
        
        res.status(200).send(await cartManager.deleteProductOfCart(req.params.cid, req.params.pid));
    } catch (error) {
        res.status(400).send({status: "failed", error: error.message});
    }
});

// empty cart
cartRouter.delete("/:cid", async (req, res) => {    
    try {
        console.log("Vaciando");
        
        res.status(200).send(await cartManager.emptyCart(req.params.cid));
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
export default cartRouter;