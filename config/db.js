const mongoose = require("mongoose");
require("dotenv").config();

//Conexión a base de datos
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "shared_transportation";

// const DB_URI = `mongodb://localhost:3306/Shared_Transportation`;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@shared-transportation-d.atonmbq.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;

module.exports = () => {
  const connect = () => {
    try {
      // mongoose.set("useCreateIndex", true); // Esto me ayuda para que me sirvan las validaciones, ejemplo la de dato único
      mongoose.set("strictQuery", false); // Si existe un campo no especificado en mi modelo que también lo almacene en la colección
      mongoose
        .connect(DB_URI, {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => console.log("**** Base de datos conectada ****"))
        .catch((error) => {
          console.error("Error en la conexión a la base de datos -> " + error);
          return false;
        });
    } catch (error) {
      console.error("Error en los parametros de la base de datos -> " + error);
      return false;
    }
  };
  connect();
};
