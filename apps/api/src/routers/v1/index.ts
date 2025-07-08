import { Router } from 'express';
import authRouter from '../../controllers/auth/v1/authRouter';
import webRouter from '../../controllers/websites/v1/webRouters';
import authMiddleware from '../../middleware/authMiddleware';

const apiV1Router = Router();

apiV1Router.use('/auth', authRouter);

apiV1Router.use('/websites', authMiddleware, webRouter);

export default apiV1Router;
