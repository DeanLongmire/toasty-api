import fs from 'fs';
import { MongoClient, ServerApiVersion  } from "mongodb";
import { json } from 'stream/consumers';

let MONGODB_URI = process.env.MONGODB_URI;
let jsonData;

let readFile = function() {
  fs.readFile('import/{.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      jsonData = JSON.parse(data);

      if (typeof jsonData === 'object' && jsonData !== null) {
          Object.entries(jsonData).forEach(([key, player]) => {
            player.image = `https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`;
            player._id = key;
          });
        } else {
          console.error('Expected an object');
        }
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
    }
  });
}

let connectMongo = async function() {

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
  }

  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const collection = client.db("toasty-api").collection("players");

    const playersArray = Object.values(jsonData);
    await collection.insertMany(playersArray);
  } finally {
    await client.close();
  }
}

readFile();
connectMongo();


