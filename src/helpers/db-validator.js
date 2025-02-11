import Role from '../role/role.model.js';
import User from '../users/user.model.js';
import Pet from '../pet/pet.model.js';
import Appointment from '../appointment/appointment.model.js';

export const esRoleValido = async (role = '') =>{
    const existeRol = await Role.findOne({ role });

    if(!existeRol){
        throw new Error(`El rol ${ role} no existe en la base de datos`);
    }

}

export const existenteEmail = async (email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existeMascotaById = async (id = '') => {
    const existeMascota = await Pet.findById(id);

    if(!existeMascota){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const existeCitaById = async (id = '') => {
    const existeCita = await Appointment.findById(id);
    console.log(existeCita);
    if(!existeCita){
        throw new Error(`El ID ${id} no existe`);
    }
}