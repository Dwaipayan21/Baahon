require("dotenv").config();

const mongoose = require("mongoose");
const Pandal = require("./models/pandal.model.js");
const pandals = require("./data/pandals.json");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Optional: remove old pandal data before inserting
    await Pandal.deleteMany({});

    // Insert JSON data
    await Pandal.insertMany(pandals);

    console.log(`${pandals.length} pandals inserted successfully`);

    await mongoose.connection.close();
    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();