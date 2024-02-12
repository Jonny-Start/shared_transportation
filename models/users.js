const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    fullName: { type: String, required: true },
    id_TokenPay: { type: String, required: false },
    nickname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    prefixNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, required: true, default: 2 }, //1: conductor, 2: pasajero
    active: { type: Boolean, required: true, default: true },
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
const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

// dateAdd: { type: Date, required: true, default: Date.now },
// dateUpdate: { type: Date, required: true, default: Date.now },
