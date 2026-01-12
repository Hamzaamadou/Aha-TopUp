// backend/utils/roles.js

module.exports.isAdmin = (req, res, next) => {
  // Si tu utilises un middleware JWT avant,
  // req.user sera déjà rempli
  if (!req.user) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusé (admin seulement)" });
  }

  next();
};

const { requireRole } = require("../utils/roles");

router.get("/admin/orders", requireRole("admin","superadmin"), ... );

router.post("/agent/validate", requireRole("agent","admin","superadmin"), ...);


