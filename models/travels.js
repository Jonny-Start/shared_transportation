const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelsPaySchema = new Schema(
  {
    date_init: { type: Date, required: false }, // Fecha inicio viaje
    id_user_driver: { type: String, required: true }, // ID del conductor
    id_user_passenger: { type: String, required: true }, // ID del Pasajero
    method_pay: { type: String, required: true }, // Metodo de pago
    paid: { type: Boolean, required: true, default: false }, // Carrera pagada o no
    cost_total: { type: Number, required: false }, // Costo total de la carrera
    date_end: { type: Date, required: false }, // Fecha de finalizacion de la carrera
  },
  {
    //El timestamps crea fecha de actualización y fecha de creación automáticamente
    timestamps: true,
    //MongoDB crea un registro de versión de los datos por cada registro, con este comando se desactivan
    versionKey: false,
  }
);

/**
 * Creamos modelo
 */
const Travels = mongoose.model("Travels", travelsPaySchema);

module.exports = Travels;
