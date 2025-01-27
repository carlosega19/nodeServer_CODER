import express from "express";
import { CartManager } from "../controllers/CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("./src/DB/carts.json");

// get cart by id
cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const cart = await cartManager.getCartById(id);
    if (!cart) return res.status(404).send({message:"Cart not founded."});
    res.status(200).send(cart);
});

// add cart
cartRouter.post("/", async (req, res) => {
    const cart = await cartManager.addCart();
    return res.status(201).send(cart);
});

// add product to a cart
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartManager.addProductToCart(cid, pid);
    if (!result) res.status(404).send({message: "Cant find the entity."});
    return res.status(200).send(result);
});


export default cartRouter;