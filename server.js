// backend/server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const connectDB = require("./db");
const websocket = require("./websocket");

const authRoutes = require("./routes/auth");
const ordersRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const adminAnalyticsRoutes = require("./routes/admin-analytics");
const webhookRoutes = require("./routes/webhook");
const plansRoutes = require("./routes/plans");
const creditRoutes = require("./routes/credit");
const walletRoutes = require("./routes/wallet");

const app = express();
const server = http.createServer(app);

// MONGODB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas connecté ✅");
  })
  .catch((err) => {
    console.error("Erreur MongoDB ❌", err.message);
  });

// 🔌 WebSocket
websocket(server);

// 🔐 Middlewares
app.use(cors({
  origin: ["https://ahatopup.netlify.app"],
  credentials: true
}));
app.use(express.json());

// 🚏 Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/credit", creditRoutes);
app.use("/api/wallet", walletRoutes);

// 🧪 Test
app.get("/", (req, res) => {
  res.send("Aha TopUp API 🚀");
});

// =======================
// SERVER LISTEN (RAILWAY SAFE)
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});