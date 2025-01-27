import { FileManager } from "./FileManager.js";
import { ProductManager } from "./ProductManager.js";

export class CartManager extends FileManager {
    constructor(filePath) {
        super(filePath);
    }

    async addCart() {
        const data = JSON.parse(await this.read());
        data.push(
            {
                id: this.getNextId(data),
                products:[]
            }
        );
        this.save(data);
        return data[data.length-1];
    }

    async getCartById(id) {
        const data = JSON.parse(await this.read());
        const cart = data.find((c) => c.id == id);
        return cart ? cart : undefined; 
    }

    async addProductToCart(cid, pid) {
        const data = JSON.parse(await this.read());
        const cart = data.find((c)=> c.id == cid);
        if (!cart) return;
        
        const prodManager = new ProductManager("./src/DB/products.json");
        const product = await prodManager.getProductById(pid);
        if (!product) return;
        
        for (const prod of cart.products) {
            
            if (prod.id == product.id) {
                prod.qty += 1;
                this.save(data);
                return cart;
            }
        }
        cart.products.push( {...product, qty: 1});
        this.save(data);
        return cart;
    }
}