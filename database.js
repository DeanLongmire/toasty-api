import { MongoClient, ServerApiVersion } from "mongodb";

let MONGODB_URI = process.env.MONGODB_URI;
const dbname = "toasty-api";

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let connect = async () => {
  if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env");
  }
  
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (error) {
    console.error(error);
  }
}

let close = async () => {
  await client.close();
}

export { client, connect, close, dbname };