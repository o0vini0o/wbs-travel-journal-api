import { Router } from 'express';
import { validateZod, verifyToken, isOwner } from '../middlewares/index.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import { postSchema } from '../zod/schemas.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, validateZod(postSchema), createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(verifyToken, isOwner, validateZod(postSchema), updatePost)
  .delete(verifyToken, isOwner, deletePost);

export default postsRouter;
