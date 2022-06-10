-- CreateTable
CREATE TABLE "task_overtime" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_student" TEXT NOT NULL,

    CONSTRAINT "task_overtime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_overtime" ADD CONSTRAINT "task_overtime_fk_id_student_fkey" FOREIGN KEY ("fk_id_student") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
