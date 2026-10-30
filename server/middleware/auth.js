import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "raktconnect-dev-secret";

// Accepts the token from the Authorization header or the request body (token / authToken)
const requireAuth = (userType) => (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ")
    ? header.split(" ")[1]
    : req.body?.token || req.body?.authToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (userType && decoded.userType !== userType) {
      return res.status(403).json({ message: "User type mismatch" });
    }
    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default requireAuth;
