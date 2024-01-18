const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URL)
        console.log(`\nMongoDB Connection Success !!! DataBase Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB Connection Error.", error);
        process.exit(1);
    }
}

module.exports = connectDB;
