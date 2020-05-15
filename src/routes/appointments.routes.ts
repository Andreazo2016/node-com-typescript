import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';
const appointmentsRouter = Router()

//Rota: Receber uma requisição, chmamar outro arquivo, e devolver uma resposta

const appointmentRepository = new AppointmentRepository()

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all()
    return response.json(appointments)
})


appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body


        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService(appointmentRepository)

        const appointment = createAppointment.execute({ provider, date: parsedDate })

        return response.json(appointment)

    } catch (e) {
        return response
            .status(400)
            .json({ error: e.message })
    }
})

export default appointmentsRouter
