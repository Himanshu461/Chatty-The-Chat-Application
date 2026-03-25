import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connenction = await mongoose.connect(process.env.MONGODB_URI); 
        console.log(`MongoDB connected: ${connenction.connection.host}`);

        }catch(error){
            console.log("Mongodb connection error: ",error.message)

        }
    };