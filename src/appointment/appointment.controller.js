import Pet from "../pet/pet.model.js";
import Appointment from "./appointment.model.js";


export const SaveAppointment = async (req, res) => {
    try {
        
        const data = req.body;
        const pet = await Pet.findOne({ _id: data.id });

        if(!pet){
            res.status(404).json({
                success: false,
                message: 'Mascota no encontrada',
                error
            })  
        }
        
        const appointment = new Appointment({
            ...data,
            petRegistered: pet._id
        });

        await appointment.save();

        res.status(200).json({
            success: true,
            appointment
        })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar cita',
            error: error.message 
        });
    }
}

export const getAppointments = async (req, res) =>{

    const { limite = 10, desde = 0} = req.query;
    const query = { status: true};

    try {
        const appointments = await Appointment.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const appointmentOwners = await Promise.all(appointments.map(async (appointment) =>{
            const owner = await Pet.findById(appointment.petRegistered);

            return {
                ...appointment.toObject(),
                petRegistered: owner ? owner.nombre : "Cita no encontrada"
            }
        }));

        const total = await Appointment.countDocuments(query);
        res.status(200).json({
            success: true,
            total,
            appointments: appointmentOwners
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener cita',
            error
        })
    }
}

export const searchAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        
        const appointment = await Appointment.findById(id);

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            })
        }

        const owner = await Pet.findById(appointment.petRegistered);

        res.status(200).json({
            success: true,
            appointment: {
                ...appointment.toObject(),
                petRegistered: owner ? owner.nombre : "Mascota no encontrado"
            }
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar cita',
            error
        })
    }
}

export const deleteAppointment = async (req, res) => {

    const { id } = req.params;

    try {
        
        await Appointment.findByIdAndUpdate(id, { status: false});

        res.status(200).json({
            success: true,
            message: 'Cita eliminada exitosamente'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar cita',
            error
        })
    }
}

export const updateAppointment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { ...data } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Cita Actualizada',
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la mascota',
            error
        });
    }
};

