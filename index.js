const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const JWKS = createRemoteJWKSet(
      new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
    );
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const db = client.db("studynookdb");
    const roomsCollection = db.collection("rooms");
    const bookingCollection = db.collection("bookings");
    const usersCollection = db.collection("user");

    app.get("/rooms", async (req, res) => {
      const { search, amenities } = req.query;

      const query = {};

      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      if (amenities) {
        const amenitiesArray = amenities.split(",");
        query.amenities = { $in: amenitiesArray };
      }

      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const result = await roomsCollection.findOne({
        _id: new ObjectId(id),
      });

      const bookingCount = await bookingCollection.countDocuments({
        roomId: id,
        status: "confirmed",
      });

      res.send({ ...result, bookingCount });
    });

    app.get("/featured-rooms", async (req, res) => {
      const cursor = await roomsCollection.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/rooms", verifyToken, async (req, res) => {
      const newRoom = req.body;
      const result = await roomsCollection.insertOne(newRoom);
      res.send(result);
    });

   app.patch("/rooms/:id", verifyToken, async (req, res) => {
     const { id } = req.params;
     const updatedData = req.body;

     const room = await roomsCollection.findOne({ _id: new ObjectId(id) });
     if (room.owner.id !== req.user.sub) {
       return res.status(403).json({ message: "Forbidden" });
     }

     const result = await roomsCollection.updateOne(
       { _id: new ObjectId(id) },
       { $set: updatedData },
     );
     res.send(result);
   });

   app.delete("/rooms/:id", verifyToken, async (req, res) => {
     const { id } = req.params;

     const room = await roomsCollection.findOne({ _id: new ObjectId(id) });
     if (room.owner.id !== req.user.sub) {
       return res.status(403).json({ message: "Forbidden" });
     }

     const result = await roomsCollection.deleteOne({ _id: new ObjectId(id) });
     res.send(result);
   });

    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;

      const conflict = await bookingCollection.findOne({
        roomId: bookingData.roomId,
        date: bookingData.date,
        status: "confirmed",
        $or: [
          {
            startTime: { $lt: bookingData.endTime },
            endTime: { $gt: bookingData.startTime },
          },
        ],
      });
      if (conflict) {
        return res.status(409).json({
          message: "This time slot is already booked for the selected room.",
        });
      }
      const result = await bookingCollection.insertOne({
        ...bookingData,
        status: "confirmed",
      });
      await usersCollection.updateOne(
        { _id: new ObjectId(bookingData.userId) },
        { $push: { bookings: result.insertedId.toString() } },
      );

      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const { userId } = req.query;
      const query = userId ? { userId } : {};
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/booking/:id/cancel", verifyToken, async (req, res) => {
      const { id } = req.params;
      const { userId } = req.body;

      const booking = await bookingCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const result = await bookingCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "cancelled" } },
      );
      await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { bookings: id } },
      );
      res.send(result);
    });

    app.get("/my-listings", verifyToken, async (req, res) => {
      const { userId } = req.query;
      const result = await roomsCollection
        .find({ "owner.id": userId })
        .toArray();
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
