import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true , index: "text" },
    description: { type: String, required: true },
    code: { type: String, default: () => nanoid(10) },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: "" }
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);
export default Product;