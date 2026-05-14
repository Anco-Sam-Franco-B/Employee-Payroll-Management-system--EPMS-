import express from 'express'
import { login, signup, updateProfile, changePassword, updateAvatar } from '../../controllers/Auth.Controller.js'
import { verifyToken } from '../../middleware/Auth.Middleware.js'
import upload from '../../middleware/upload.js'

const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/signup', signup)
authRoutes.put('/profile', verifyToken, updateProfile)
authRoutes.put('/change-password', verifyToken, changePassword)
authRoutes.post('/avatar', verifyToken, upload.single('avatar'), updateAvatar)

export default authRoutes
