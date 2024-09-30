const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const adminAuthMiddleware = (async = (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      message: "Authorization required",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        ok: false,
        message: "You don't have access for this",
      });
    req.user = user;
    next();
  });
});

module.exports = adminAuthMiddleware;
