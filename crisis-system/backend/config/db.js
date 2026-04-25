const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log("MongoDB Connected (Local/Cloud)");
            return;
        } catch (err) {
            console.log("Local MongoDB not found. Falling back to Memory Server...");
        }

        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log("MongoDB Connected (In-Memory)");

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
