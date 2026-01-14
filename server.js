// backend/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./db");
const websocket = require("./websocket");

// Routes
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

// =======================
// Connexion MongoDB
// =======================
connectDB();

// =======================
// WebSocket
// =======================
websocket(server);

// =======================
// Middlewares
// =======================
app.use(cors({
  origin: ["https://ahatopup.netlify.app"],
  credentials: true
}));

app.use(express.json());

// =======================
// Routes API
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/credit", creditRoutes);
app.use("/api/wallet", walletRoutes);

// =======================
// Route test
// =======================
app.get("/", (req, res) => {
  res.send("Aha TopUp API 🚀");
});

// =======================
// Lancement serveur
// =======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
