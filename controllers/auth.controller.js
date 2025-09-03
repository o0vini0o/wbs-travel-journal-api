import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import createToken from '../utils/createToken.js';

const secure = process.env.NODE_ENV !== 'development';
const signup = async (req, res) => {
  const { email, password } = req.sanitizedbody;

  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new Error('Email already in use', { cause: 409 });

  const salt = await bcrypt.genSalt(13);
  const hashPW = await bcrypt.hash(password, salt);

  const user = (await User.create({ ...req.sanitizedbody, password: hashPW })).toObject();

  delete user.password;
  createToken(user, res, secure);
  res.status(201).json(user);
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password').lean();
  if (!user) throw new Error('Invalid credentials', { cause: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials', { cause: 401 });

  delete user.password;
  createToken(user, res, secure);
  res.json({ msg: 'login successfully', data: user });
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure,
    sameSite: 'lax'
  });
  res.json({ msg: 'logout successfully' });
};

const getMe = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) throw new Error('Your data not found', { cause: 404 });
  res.json(user);
};
export { signup, login, logout, getMe };
