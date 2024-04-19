import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Mail = mongoose.model('Mail', mailSchema);
