const { verifyToken } = require("./../helpers/generateAndValidateToken");
const Users = require("../../models/users");
const Cars = require("../../models/cars");
const Travels = require("./../../models/travels");

const minutesTotal = (startDate, finishDate) => {
  let diferenciaEnMilisegundos = finishDate - startDate;
  // Convertir la diferencia de milisegundos a minutos
  let diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));
  return diferenciaEnMinutos;
};

/**
 * Handles the travel request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves with the response data.
 */
const travel_request = async (req, res) => {
  try {
    const method = req.params.method;
    const latitud = req.params.latitud;
    const longitud = req.params.longitud;
    const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
    const id_user = token._id;

    console.log("Solicitud de viaje");
    if (method == "" || method == undefined) {
      return res.status(500).json({
        method: method,
        latitud: latitud,
        longitud: longitud,
        message: "Error: El metodo de pago no puede ser vacio / " + error,
      });
    }
    if (latitud == "" || latitud == undefined) {
      return res.status(500).json({
        method: method,
        latitud: latitud,
        longitud: longitud,
        message: "Error: La latitud no puede estar vacia / " + error,
      });
    }
    if (longitud == "" || longitud == undefined) {
      return res.status(500).json({
        method: method,
        latitud: latitud,
        longitud: longitud,
        message: "Error: La longitud no puede estar vacia / " + error,
      });
    }

    // selecciona un conductor
    const dataAllDrivers = await Users.find({ role: 1 });
    const driver =
      dataAllDrivers[Math.floor(Math.random() * dataAllDrivers.length)];
    const carDriver = await Cars.findOne({ id_user: driver.id });

    const dataCreateTravel = {
      id_user_driver: driver.id,
      id_user_passenger: id_user,
      method_pay: method,
    };

    // crear un travel
    const registerTravels = await Travels.create(dataCreateTravel)
      .then((dataTravel) => {
        let dataRespond = {
          id_user_driver: driver.id,
          id_travel: dataTravel.id,
          driver_name: driver.fullName,
          car_plate: carDriver.plate,
          car_color: carDriver.color,
        };
        return res.status(200).json(dataRespond);
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          message: "Error: " + error,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

/**
 * Inicia un viaje actualizando la fecha de inicio en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Promesa que indica la finalización de la función.
 */
const init_travel = async (req, res) => {
  const id_travel = req.params.id_travel;
  if (id_travel == "" || id_travel == undefined) {
    return res.status(500).json({
      id_travel: id_travel,
      message: "Error: El ID del viaje es requerido / " + error,
    });
  }
  try {
    const date = new Date();
    await Travels.findByIdAndUpdate(id_travel, { date_init: date })
      .then(() => {
        return res.status(201).json({
          message: "Succes: Viaje iniciado",
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          message: "Error: " + error,
        });
      });
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

const finish_travel = async (req, res) => {
  const id_travel = req.params.id_travel;
  const kilometres = req.params.kilometres;

  if (id_travel == "" || id_travel == undefined) {
    return res.status(500).json({
      id_travel: id_travel,
      kilometres: kilometres,
      message: "Error: El ID del viaje es requerido / " + error,
    });
  }
  if (kilometres == "" || kilometres == undefined) {
    return res.status(500).json({
      id_travel: id_travel,
      kilometres: kilometres,
      message: "Error: Los kilometros recorridos son requeridos / " + error,
    });
  }
  try {
    const end_date = new Date();
    const travel = await Travels.findById(id_travel);

    let priceBase = 3500;
    let pricePerKilometer = 1000 * kilometres;
    let minutes = minutesTotal(travel.date_init, end_date);
    let pricePerMinutes = minutes * 200;
    const cost_total = priceBase + pricePerKilometer + pricePerMinutes;

    // finish travel
    await Travels.findByIdAndUpdate(id_travel, {
      date_end: end_date,
      cost_total: cost_total,
    });

    return res.status(200).json({
      message: "Succes: Viaje finalizado",
      Total_price: cost_total,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
};

module.exports = { travel_request, init_travel, finish_travel };
