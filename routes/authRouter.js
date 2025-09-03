import { Router } from 'express';
import { login, signup, getMe } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import validateZod from '../middlewares/validateZod.js';
import { signInSchema, userSchema } from '../zod/schemas.js';

const authRouter = Router();
authRouter.route('/signup').post(validateZod(userSchema), signup);
authRouter.route('/signin').post(validateZod(signInSchema), login);
authRouter.route('/me').get(verifyToken, getMe);
export default authRouter;
