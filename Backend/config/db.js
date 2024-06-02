import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://greatstack:186312@cluster0.ovanjzw.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}