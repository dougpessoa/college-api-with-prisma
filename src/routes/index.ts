import { Router } from 'express'
import { coursesRouter } from './courses'
import { studentsRouter } from './students'

const routes = Router()

routes.use('/students', studentsRouter)
routes.use('/courses', coursesRouter)

export {routes}