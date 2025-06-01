import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not authorised" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token's email or role matches admin
    if (decoded.email !== process.env.ADMIN_EMAIL /* or decoded.role !== 'admin' */) {
      return res.json({ success: false, message: "Not authorised" });
    }

    // Authorized, continue
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Not authorised" });
  }
};


export default adminAuth