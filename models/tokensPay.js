const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokensPaySchema = new Schema(
  {
    id_user: { type: String, required: true },
    method: { type: String, required: true },
    token: { type: String, required: true, unique: true },
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
const TokensPay = mongoose.model("TokensPay", tokensPaySchema);

module.exports = TokensPay;

// dateAdd: { type: Date, required: true, default: Date.now },
// dateUpdate: { type: Date, required: true, default: Date.now },
