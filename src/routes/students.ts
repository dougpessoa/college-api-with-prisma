import { Router } from 'express'
import { Students } from '../services/Students'

const studentsRouter = Router()

studentsRouter.get('/', async (request, response) => {
  const student = new Students()

  const result = await student.list()

  return response.json(result)
})

studentsRouter.get('/details/:id', async (request, response) => {
  const {id} = request.params
  const student = new Students()

  const result = await student.showAllDetails(id)

  return response.json(result)
})

studentsRouter.post('/', async (request, response) => {
  const data = request.body 
  
  const student = new Students()
  
  const result = await student.create(data)
  
  return response.status(result.statusCode || 200).json(result)
})

studentsRouter.put('/:id', async (request, response) => {
  const data = request.body 
  const {id} = request.params
  
  const student = new Students()
  
  const result = await student.update({...data, id})
  
  return response.status(result.statusCode || 200).json(result)
})

studentsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params
  
  const student = new Students()
  
  const result = await student.delete(id)
  
  return response.status(result.statusCode || 200).json(result)
})

export {studentsRouter}