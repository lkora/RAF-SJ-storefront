import { Router } from 'express'
import { itemRouter } from './item'
import { orderRouter } from './order'
import { categoryRouter } from './category'
import { manufacturerRouter } from './manufacturer'

export const router = Router()

router.use('/item', itemRouter)
router.use('/order', orderRouter)
router.use('/category', categoryRouter)
router.use('/manufacturer', manufacturerRouter)
