
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

const cardRoutes = require("./routes/cards");

app.use(cors());
app.use(express.json());
app.use("/api/cards", cardRoutes);
app.get("/", (req, res) => {
  res.send("Diwali Blast Backend is Running! 🪔");
});

// Test MySQL connection
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      success: true,
      message: "MySQL connected successfully!",
      data: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
