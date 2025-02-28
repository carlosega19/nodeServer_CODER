import mongoose from 'mongoose';
import Cart from '../models/cartModel.js';


class CartManager {
    constructor() {
        this.db = Cart;
    } 

    async getAll() {
        try {
            return await this.db.find({});
        } catch (error) {
            throw new Error('Error getting carts: ' + error.message);
        }
    }

    async createCart(products = []) {
        try {
            const cart = new this.db({products});
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error creating cart: ' + error.message);
        }
    }

    async findCartById(cartId) {
        try {
            return await this.db.findById(cartId);
        } catch (error) {
            throw new Error('Error finding cart: ' + error.message);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.findCartById(cartId);
            const prod = cart.products.find(item => item.product._id.toString() === productId);
            if (prod) prod.qty = prod.qty+1;
            else cart.products.push({ product: productId });
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error adding product to cart: ' + error.message);
        }
    }

    async deleteProductOfCart(cartId, productId) {
        try {
            const cart = await this.findCartById(cartId);
            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error deleting product of cart: ' + error.message);
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await this.findCartById(cartId);
            cart.products = products;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error updating cart: ' + error.message);
        }
    }

    async updateProductOfCart(cartId, productId, newQty) {
        try {
            const cart = await this.db.findOneAndUpdate(
                {
                    _id: cartId, "products.product": productId
                },
                {
                    $set: { "products.$.qty": newQty }
                },
                {new: true}
            );
            return cart;
        } catch (error) {
            throw new Error('Error updating product of cart: ' + error.message);
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await this.findCartById(cartId);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error emptying cart: ' + error.message);
        }
    }
}
export default new CartManager();