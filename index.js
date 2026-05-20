const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("studynookdb");
    const roomsCollection = db.collection("rooms");

    app.get("/rooms", async (req, res) => {
      const cursor = await roomsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const result = await roomsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/featured-rooms", async (req, res) => {
      const cursor = await roomsCollection.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/rooms", async (req, res) => {
      const newRoom = req.body;
      const result = await roomsCollection.insertOne(newRoom);
      console.log(result);
      res.send(result);
    });

    app.patch("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await roomsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );
      res.send(result);
    });

    app.delete("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const result = await roomsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running! Welcome to Study Nook.");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
