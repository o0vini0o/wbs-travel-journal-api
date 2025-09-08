import jwt from 'jsonwebtoken';

const createToken = (user, res, isProduction) => {
  const payload = { _id: user._id, role: user.role };
  const jwtSecret = process.env.JWT_SECRET;
  const jwtOption = {
    expiresIn: process.env.JWT_EXPIRE_IN_DAYS + 'd'
  };
  const token = jwt.sign(payload, jwtSecret, jwtOption);
  cookieOptios = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
    // expires: new Date(Date.now() + process.env.JWT_EXPIRE_IN_DAYS * 24 * 60 * 60 * 1000)
  };
  res.cookie('token', token, cookieOptions);
};
export default createToken;
