import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs';
import appError from '../error/appError';

const prisma = new PrismaClient()

export type CoursesType = {
  id?: string 
  name: string 
  duration: number 
  description: string 
  created_at?: Date
  updated_at?: Date 
}

class Courses {
  async list(): Promise<any> {
    const courses = await prisma.courses.findMany()

    return courses
  }

  async create(data: CoursesType): Promise<any> {
    await prisma.courses.create({
      data
    })

    return {
      message: 'Course has been created'
    }
  }


  async update(data: CoursesType): Promise<any> {
    const hasCourse = await prisma.courses.findUnique({
      where: {
        id: data.id
      }
    })

    if (!hasCourse) {
      return appError("Does not exists this id!")
    }

    const {name, description, duration} = data

    await prisma.courses.update({
      data: {
        name,
        description,
        duration
      },
      where: {
        id: data.id
      }
    })

    return {
      message: 'Course has been updated!'
    }
  }

  async delete(id: string): Promise<any> {
    const hasCourse = await prisma.courses.findUnique({
      where: {
        id
      }
    })

    if (!hasCourse) {
      return appError("Does not exists this id!")
    }

    await prisma.courses.delete({
      where: {
        id 
      }
    })

    return {
      message: 'Course has been deleted!'
    }
  }
}

export { Courses }