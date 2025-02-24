import express from "express";


const cartRouter = express.Router();

// get cart by id
cartRouter.get("/:id", async (req, res) => {
});

// add cart
cartRouter.post("/", async (req, res) => {
    const cart = await cartManager.addCart();
    return res.status(201).send(cart);
});

// add product to a cart
cartRouter.post("/:cid/product/:pid", async (req, res) => {
});


export default cartRouter;