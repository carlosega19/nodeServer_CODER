import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                qty: { type: Number, default: 1 }
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.pre('find', function(next) {
    this.populate('products.product');
    next();
});
cartSchema.pre('findOne', function(next) {
    this.populate('products.product');
    next();
});
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;