const { Schema, model } = require('mongoose');

const JobofferSchema = new Schema({
    position: {
        type: String,
        required: [true, 'Debe ingrear nombre de la posición'],
        minlength: [3, 'Debe tener por lo menos 3 caracteres'],
    },
    company: {
        type: String,
        required: [true, 'Debe ingresar nombre de empresa'],
    },
    image: {
        type: String,
        required: [true, 'Debe tener una imagen'],
    },
    description: {
        type: String,
        required: [true, 'Debe tener una descripción'],
        minlength: [3, 'Debe tener por lo menos 3 caracteres']
    },
    visits: {
        type: Number,
        default: 0
    },
    experience:{
        type: String,
        required: [true, 'Debe tener experiencia']
    },
});

const Joboffer = model('Joboffer', JobofferSchema);

module.exports = Joboffer;