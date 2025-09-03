import jwt from 'jsonwebtoken';

const createToken = (user, res, secure) => {
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN_DAYS + 'd'
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    expires: new Date(Date.now() + process.env.JWT_EXPIRE_IN_DAYS * 24 * 60 * 60 * 1000)
  });
};
export default createToken;
