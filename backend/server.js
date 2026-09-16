require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Pandal = require("./models/pandal.model.js");

const app = express();

app.use(cors());
app.use(express.json());

//db setup 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Get all pandals
app.get("/api/pandals", async (req, res) => {
  try {
    const pandals = await Pandal.find();
    res.status(200).json(pandals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pandals",
      error: error.message,
    });
  }
});

// Get one pandal
app.get("/api/pandals/:id", async (req, res) => {
  try {
    const pandal = await Pandal.findById(req.params.id);

    if (!pandal) {
      return res.status(404).json({
        message: "Pandal not found",
      });
    }

    res.status(200).json(pandal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pandal",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});