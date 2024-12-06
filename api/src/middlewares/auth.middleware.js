const jwt = require("jsonwebtoken");
const { CLIENT_JWT_SECRET } = require("../../config");

const authMiddleware = (async = (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: "Authorization required",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, CLIENT_JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        ok: false,
        message: "You don't have access for this",
        error,
      });
    }
    req.user = user;
    next();
  });
});

module.exports = authMiddleware;
