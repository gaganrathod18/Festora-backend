import express from 'express'
import { register, login, me } from "../controllers/authController";
import protectAuth from '../middlewares/authMiddleware';

const router = express.Router()

router, post('/register', register)
router.post('/login', login)
router.get('./me', protectAuth, me)

export default router