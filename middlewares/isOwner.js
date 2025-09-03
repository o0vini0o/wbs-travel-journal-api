import { Post } from '../models/index.js';

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.user;
  const { author } = await Post.findById(id).lean();
  if (author === user._id) {
    next();
    return;
  }
  throw new Error('not authorized', { cause: 403 });
};
export default isOwner;
