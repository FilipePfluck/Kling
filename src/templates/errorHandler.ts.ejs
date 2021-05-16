import { Request, Response, NextFunction } from 'express'
import AppError from './AppError'

const errorHandler = (err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){
        console.log(err.message)

        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.error(err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}

export default errorHandler