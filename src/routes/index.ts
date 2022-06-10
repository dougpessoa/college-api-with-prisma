import { Router } from 'express'
import { coursesRouter } from './courses'
import { studentsRouter } from './students'
import { taskOvertimeRouter } from './taskOvertime'

const routes = Router()

routes.use('/students', studentsRouter)
routes.use('/courses', coursesRouter)
routes.use('/task-overtime', taskOvertimeRouter)

export {routes}