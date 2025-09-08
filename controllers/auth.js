import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import createToken from '../utils/createToken.js';

const isProduction = process.env.NODE_ENV !== 'production';
const signup = async (req, res) => {
  const { email, password } = req.sanitizedBody;

  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new Error('User already exists', { cause: 409 });

  const salt = await bcrypt.genSalt(13);
  const hashPW = await bcrypt.hash(password, salt);

  const user = await User.create({ ...req.sanitizedBody, password: hashPW });
  const newUser = user.toObject();
  delete newUser.password;
  // createToken(user, res, secure);
  res.status(201).json(newUser);
};
const login = async (req, res) => {
  const { email, password } = req.sanitizedBody;

  let user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials', { cause: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials', { cause: 400 });

  user.toObject();
  delete user.password;
  createToken(user, res, isProduction);

  res.json({ msg: 'login successfully', data: user });
};

const logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  };
  res.clearCookie('token', cookieOptions);
  res.json({ msg: 'logout successfully' });
};

const me = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) throw new Error('Your data not found', { cause: 404 });
  res.json(user);
};
export { signup, login, logout, me };
