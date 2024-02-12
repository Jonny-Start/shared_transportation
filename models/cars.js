const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carsPaySchema = new Schema(
  {
    id_user: { type: String, required: true },
    plate: { type: String, required: true }, //placa
    color: { type: String, required: true },
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
const Cars = mongoose.model("Cars", carsPaySchema);

module.exports = Cars;
