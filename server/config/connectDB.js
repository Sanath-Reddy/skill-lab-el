import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const serverDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Uses MONGO_URI when provided, otherwise starts a local MongoDB stored inside the project folder
const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  if (!uri) {
    process.env.MONGOMS_DOWNLOAD_DIR ||= path.join(serverDir, ".mongo-bin");
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const dbPath = path.join(serverDir, ".mongo-data");
    fs.mkdirSync(dbPath, { recursive: true });

    console.log("MONGO_URI not set, starting local MongoDB (first run downloads it)...");
    const mongod = await MongoMemoryServer.create({
      instance: { dbPath, storageEngine: "wiredTiger", port: 27018 },
    });
    uri = mongod.getUri("RaktConnect");

    const stop = async () => {
      await mongoose.disconnect();
      await mongod.stop({ doCleanup: false });
      process.exit(0);
    };
    process.on("SIGINT", stop);
    process.on("SIGTERM", stop);
  }

  await mongoose.connect(uri);
};

export default connectDB;
