import './db/index.js';
import express from 'express';
import cors from 'cors';
import { postsRouter, authRouter } from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParse from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' }));
app.use(express.json(), cookieParse());

app.use('/posts', postsRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('*splat', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
