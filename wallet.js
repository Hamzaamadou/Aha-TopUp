const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// 💰 Obtenir le solde du wallet
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("balance");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ balance: user.balance || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➕ Ajouter de l'argent (admin / système)
router.post("/add", auth, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Montant invalide" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { balance: amount } },
      { new: true }
    );

    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
