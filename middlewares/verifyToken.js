import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Error('Not authenticated', { cause: 401 });
  try {
    const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id, role };
  } catch (error) {
    throw new Error('Not authenticated', { cause: 401 });
  }

  next();
};
export default verifyToken;
