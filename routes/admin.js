// ================================
// BACKEND: routes/admin.js
// ================================
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");

// Statistiques globales
router.get("/stats", auth, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({ users, orders, revenue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 100 dernières commandes
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;