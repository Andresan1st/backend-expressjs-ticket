import express from 'express'
import genreRoutes from './genreRoutes'
import theatersRoutes from './theaterRoutes'

const adminRoutes=express.Router()

adminRoutes.use(genreRoutes)
adminRoutes.use(theatersRoutes)

export default adminRoutes;