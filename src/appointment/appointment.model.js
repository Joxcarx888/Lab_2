import { Schema, model } from "mongoose";

const AppointmentSchema = Schema({
    vet: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    veterinary: {
        type: String,
        required: true
    },
    petRegistered: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Appointment', AppointmentSchema);