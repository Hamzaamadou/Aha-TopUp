module.exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Rôle non autorisé" });
    }

    next();
  };
};
