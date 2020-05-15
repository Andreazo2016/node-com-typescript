import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreatedAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentRepository {

    private appointments: Array<Appointment>;

    constructor() {
        this.appointments = []
    }

    public all(): Array<Appointment> {
        return this.appointments
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentInSameDate = this.appointments.find(appointment => isEqual(date, appointment.date))
        return findAppointmentInSameDate || null;
    }

    public create({ provider, date }: CreatedAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date })
        this.appointments.push(appointment)
        return appointment;
    }

}

export default AppointmentRepository;
