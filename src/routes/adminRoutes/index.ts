import express from 'express'
import genreRoutes from './genreRoutes'
import theatersRoutes from './theaterRoutes'
import movieRoutes from './movieRoutes'

const adminRoutes=express.Router()

adminRoutes.use(genreRoutes)
adminRoutes.use(theatersRoutes)
adminRoutes.use(movieRoutes)

export default adminRoutes;