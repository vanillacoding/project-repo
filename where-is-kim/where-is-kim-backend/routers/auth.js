import express from 'express';
import { upload } from '../middlewares';
import { login, signup } from '../controllers/auth';

const router = express.Router();

router.post('/login', login);
router.post('/signup', upload.single('profile'), signup);

export default router;
