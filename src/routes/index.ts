import { Router, Request, Response } from 'express';
import AppointmentsRouter from './appointments.routes';

const routes = Router()

routes.use('/appointments', AppointmentsRouter)


routes.get('/', (request: Request, response: Response) => {

    return response.json({ message: 'Hello world !!!' })
})


export default routes
