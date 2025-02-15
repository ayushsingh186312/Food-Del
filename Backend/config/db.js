import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mon=del').then(()=>console.log("DB Connected"));
}
