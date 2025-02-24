import mongoose from "mongoose";
import config from "../../config.js";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.URI);
        console.log("-- CONNECTED TO MONGODB SUCCESS --");
    } catch (e) {
        console.log("ERROR CONNECTING TO MONGODB: ", e.message);
    }
};
export default connectMongoDB;