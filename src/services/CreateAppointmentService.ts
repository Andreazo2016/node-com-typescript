import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/**
 * Service é responsvel por uma unica coisa, e só
 * Service vai ter somente um único método
 */

interface Request {
    provider: string;
    date: Date;
}


class CreateAppointmentService {

    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository
    }

    /**Só fica no service o que é regra de négocio da aplicação */
    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = this.appointmentRepository.create({ provider, date: appointmentDate })

        return appointment
    }
}

export default CreateAppointmentService;
