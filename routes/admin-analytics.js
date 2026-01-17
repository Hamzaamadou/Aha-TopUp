const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// 📊 Analytics admin
router.get("/analytics", auth, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const revenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.json({
      users,
      orders,
      revenue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur analytics" });
  }
});

module.exports = router;