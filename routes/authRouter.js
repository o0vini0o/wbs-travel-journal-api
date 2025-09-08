import { Router } from 'express';
import { login, signup, logout, me } from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';
import validateZod from '../middlewares/validateZod.js';
import { signInSchema, userSchema } from '../zod/schemas.js';

const authRouter = Router();
authRouter.route('/signup').post(validateZod(userSchema), signup);
authRouter.route('/signin').post(validateZod(signInSchema), login);
authRouter.route('/signout').delete(logout);

authRouter.route('/me').get(verifyToken, me);
export default authRouter;
