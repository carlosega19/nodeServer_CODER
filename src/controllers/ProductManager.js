import { nanoid } from "nanoid";
import { FileManager } from "./FileManager.js";

export class ProductManager extends FileManager{
    constructor(filepath) {
        super(filepath);
    }

    
    // GETS
    async getProducts() {
        const data = JSON.parse(await this.read());
        return data;
    }

    async getProductById(id) {
        const data = JSON.parse(await this.read());
        return data.find((p) => p.id == id);
    }

    getProductByDesc() {
        return undefined;
    }
    //-------------------------------------
    
    // POSTS
    async addProduct(product) {
        if (!this.validProduct(product)) {
            throw new Error("Invalid data");
        }
        const data = JSON.parse(await this.read());
        
        const createdProd = 
        {
            id: this.getNextId(data),
            title: product.title,
            description: product.description,
            code: this.generateCode(),
            price: product.price,
            stock: product.stock,
            status: product.status ? product.status : true,
            category: product.category ? product.category : "",
            thumbnail: ""
        };

        data.push(createdProd);    
        await this.save(data);
        return createdProd;
    }
    //-------------------------------------

    // PUTS
    async modifyProduct(id, product) {
        const data = JSON.parse(await this.read());
        const pIndex = data.findIndex((p) => p.id == id);
        if (pIndex < 0) throw new Error("Product not founded.");

        const result = this.combineObjs(data[pIndex], product);
        data[pIndex] = result;
        this.save(data);
        return result;
    }
    //-------------------------------------

    // DELETES
    async deleteProductById(id) {
        let data = JSON.parse(await this.read());
        data = data.filter((p) => p.id != id);
        await this.save(data);
    }
    //-------------------------------------
    
    // Helpers
    validProduct(product) {
        return product.title && product.description && product.price && product.price > 0;
    }

    generateCode() {
        return nanoid(10);
    }
}