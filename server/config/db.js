import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Established connection with MongoDB ${conn.connection.host} ✅`);
    } catch (error) {
        console.log('Error connecting ❌',error);
        process.exit(1);
    }
}