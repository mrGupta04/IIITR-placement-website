import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DATABASE_NAME;

if (!uri) {
  throw new Error("Please add your MongoDB URI to the .env file.");
}
if (!dbName) {
  throw new Error("Please add your DATABASE_NAME to the .env file.");
}

console.log("MONGO_URI:", uri); // Log the connection string
console.log("DATABASE_NAME:", dbName); // Log the database name

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

// In development mode, use a global variable to cache the connection
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a function to connect to the database
export const connectDB = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(dbName); // Use the database name from .env
    console.log(`Successfully connected to database: ${dbName}`);
    return { db, client };
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
    throw new Error("Database connection failed. Please check your credentials and network settings.");
  }
};