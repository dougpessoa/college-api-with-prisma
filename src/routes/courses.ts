import { Router } from 'express'
import { Courses } from '../services/Courses'

const coursesRouter = Router()

coursesRouter.get('/', async (request, response) => {
  const courses = new Courses()

  const result = await courses.list()

  return response.json(result)
})

coursesRouter.post('/', async (request, response) => {
  const data = request.body 
  
  const course = new Courses()
  
  const result = await course.create(data)
  
  return response.status(result.statusCode || 200).json(result)
})

coursesRouter.put('/:id', async (request, response) => {
  const data = request.body 
  const {id} = request.params
  
  const course = new Courses()
  
  const result = await course.update({...data, id})
  
  return response.status(result.statusCode || 200).json(result)
})

coursesRouter.delete('/:id', async (request, response) => {
  const {id} = request.params
  
  const course = new Courses()
  
  const result = await course.delete(id)
  
  return response.status(result.statusCode || 200).json(result)
})

export {coursesRouter}