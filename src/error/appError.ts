export type AppError = {
  error: boolean 
  message: string 
  statusCode?: number
}

export default function appError(message: string, statusCode?: number): AppError {
  return {
    error: true, 
    message,
    statusCode: statusCode || 400
  }
}