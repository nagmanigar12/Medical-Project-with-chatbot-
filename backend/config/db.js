import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medisync";

    if (!process.env.MONGODB_URI) {
      console.warn(
        "MONGODB_URI is not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/medisync",
      );
      console.warn(
        "If you want to use a remote cluster, set MONGODB_URI in your .env file or environment variables.",
      );
    }

    mongoose.set("bufferCommands", false);

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Database connection error:", err);
    // If DB fails, the server can still start for development, but data will not persist.
  }
};


