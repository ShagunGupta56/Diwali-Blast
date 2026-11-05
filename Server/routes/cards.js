
const express = require("express");
const { randomUUID } = require("crypto");
const db = require("../config/db");

const router = express.Router();

// Create a new greeting card
router.post("/", async (req, res) => {
  try {
    const { senderName, template } = req.body;

    if (
      typeof senderName !== "string" ||
      !senderName.trim() ||
      senderName.trim().length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid sender name is required (maximum 100 characters)"
      });
    }

    const allowedTemplates = [
      "royal",
      "traditional",
      "minimal",
      "vibrant"
    ];

    if (!allowedTemplates.includes(template)) {
      return res.status(400).json({
        success: false,
        message: "Invalid card template"
      });
    }

    const cardId = randomUUID();

    await db.query(
      `INSERT INTO cards (card_id, sender_name, template)
       VALUES (?, ?, ?)`,
      [cardId, senderName.trim(), template]
    );

    res.status(201).json({
      success: true,
      message: "Greeting card created successfully!",
      card: {
        cardId,
        senderName: senderName.trim(),
        template
      },
      shareUrl: `/?card=${cardId}`
    });

  } catch (error) {
    console.error("Card creation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create greeting card"
    });
  }
});

// Get a greeting card by ID
router.get("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;

    const [cards] = await db.query(
      "SELECT card_id, sender_name, template, created_at FROM cards WHERE card_id = ?",
      [cardId]
    );

    if (cards.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Greeting card not found"
      });
    }

    res.json({
      success: true,
      card: cards[0]
    });

  } catch (error) {
    console.error("Card fetch error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch greeting card"
    });
  }
});

module.exports = router;
