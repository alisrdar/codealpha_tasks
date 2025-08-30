// Schema
import mongoose from "mongoose";
import { Schema } from "mongoose";

const urlSchema = new Schema({
    shortCode: {
        type: String,
        unique: true
    },
    originalUrl: String,
});

export default mongoose.model("Url", urlSchema);