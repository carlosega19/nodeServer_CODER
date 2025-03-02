import Product from "../models/productModel.js";

class ProductManager {

    constructor() {
        this.db = Product;
    }
    
    async addProduct(productData) {
        try {
            const { title, description, price, status, stock, category } = productData;
            const product = new this.db({ title, description, price, status, stock, category });
            await product.save();
            return product;
        } catch (error) {
            throw new Error('Error adding product: ' + error.message);
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.db.findById(productId);
            return product || { message: "Not founded." };
        } catch (error) {
            throw new Error('Error getting product: ' + error.message);
        }
    }

    async updateProduct(productId, productData) {
        try {
            const { title, description, price, status, stock, category } = productData;
            const product = await this.db.findByIdAndUpdate(productId, { title, description, price, status, stock, category }, { new: true });
            return product;
        } catch (error) {
            throw new Error('Error updating product: ' + error.message);
        }
    }

    async deleteProduct(productId) {
        try {
            await this.db.findByIdAndDelete(productId);
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }

    async getProducts(params, page = 1, limit = 10) {
        try {
            const query = {};
            if (params.topSeller) {
                query.stock = { $lt: 100 };
            }
            if (params.text) {
                query.title = { $regex: new RegExp(params.text, 'i') };
            }
            const options = {
                page,
                limit,
                sort: {},
                lean: true
            };
            if (params.priceOrder) {
                options.sort.price = params.priceOrder == 'asc' ? 1 : -1;
            }
            const products = await this.db.paginate(query, options);
            return products;
        } catch (error) {
            throw new Error('Error getting products: ' + error.message);
        }
    }
}
export default new ProductManager();