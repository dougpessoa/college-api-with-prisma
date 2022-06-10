import { Router } from 'express'
import { TaskOvertime } from '../services/TaskOvertime'

const taskOvertimeRouter = Router()

taskOvertimeRouter.post('/', async (request, response) => {
  const data = request.body 
  
  const student = new TaskOvertime()
  
  const result = await student.studentMakeTask(data)
  
  return response.status(result.statusCode || 200).json(result)
})


export {taskOvertimeRouter}