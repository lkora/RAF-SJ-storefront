import { Router } from 'express'
import { loginRouter } from './login'
import { registerRouter } from './register'

export const router = Router()

router.use('/login', loginRouter)
router.use('/register', registerRouter)
