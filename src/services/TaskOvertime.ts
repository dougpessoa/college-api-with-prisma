import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type TaskOvertimeType = {
  id?: string 
  name: string 
  duration: number  
  student_id: string 
  created_at?: Date
}

class TaskOvertime {
  async studentMakeTask(data: TaskOvertimeType): Promise<any> {
    await prisma.taskOvertime.create({
      data: {
        name: data.name,
        duration: data.duration,
        fk_id_student: data.student_id
      }
    });

    return {
      message: 'Task saved!'
    }
  }
}

export { TaskOvertime }