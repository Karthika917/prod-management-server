const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next()
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = jwtMiddleware