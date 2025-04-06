import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise;

// Ensure that the Mongo URI is available
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Check the environment (development or production)
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the MongoDB connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
