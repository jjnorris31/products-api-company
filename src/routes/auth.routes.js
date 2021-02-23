import {Router} from 'express';
const router = Router();
import * as authController from '../controllers/auth.controller';

router.post('/signup', authController.signUp);
router.get('/login', authController.logIn);

export default router;