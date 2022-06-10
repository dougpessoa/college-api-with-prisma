import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs';
import appError, { AppError } from '../error/appError';

const prisma = new PrismaClient()

export type StudentsType = {
  id?: string 
  name: string 
  email: string 
  password?: string 
  created_at?: Date
  updated_at?: Date 
}

class Students {
  async list(): Promise<any> {
    const students = await prisma.students.findMany({
      select: {
        email: true,
        id: true, 
        created_at: false, 
        password: false,
        name: true,
        updated_at: false
      }
    });

    return students
  }

  async create(data: StudentsType): Promise<any> {
    const hasStudent = await prisma.students.findUnique({
      where: {
        email: data.email
      }
    })

    if (hasStudent) {
      return appError("Student already exists!");
    }

    const password = await hash(data.password || '', 8)

    const student = await prisma.students.create({
      data: {
        name: data.name,
        email: data.email,
        password,
      }
    })

    console.log({ student })
    return {
      message: 'User has been created'
    }
  }


  async update(data: StudentsType): Promise<any> {
    const hasStudent = await prisma.students.findUnique({
      where: {
        id: data.id
      }
    })

    if (!hasStudent) {
      return appError("Does not exists this id!")
    }

    const {name, email} = data

    await prisma.students.update({
      data: {
        name,
        email
      },
      where: {
        id: data.id
      }
    })

    return {
      message: 'Student has been updated!'
    }
  }

  async delete(id: string): Promise<any> {
    const hasStudent = await prisma.students.findUnique({
      where: {
        id
      }
    })

    if (!hasStudent) {
      return appError("Does not exists this id!")
    }

    await prisma.students.delete({
      where: {
        id 
      }
    })

    return {
      message: 'Student has been deleted!'
    }
  }

  async showAllDetails(id: string): Promise<any> {
    const student = await prisma.students.findUnique({
      where: {
        id 
      },
      select: {
        password: false,
        name: true, 
        id: true,
        email: true,
        TaskOvertime: {
          select: {
            duration: true
          }
        }
      }
    })

    const result = {
      ...student, 
      time_overtime: student?.TaskOvertime.reduce(
        (prev, current) => prev + current.duration, 0
      )
    }

    delete result.TaskOvertime

    return result
  }
}

export { Students }