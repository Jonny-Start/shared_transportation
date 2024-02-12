const express = require("express");
const router = express.Router();

// Controller
const {
  travel_request,
  init_travel,
} = require("./../controllers/travel_request.js");

// Middleware
const { checkRoleAuth } = require("../middleware/checkRoleAuth");

//Solicitud de viaje, retorna un conductor
router.post(
  "/api/v1/travel_request/:latitud/:longitud/:method",
  checkRoleAuth([2]),
  travel_request
);

// Iniciar un viaje
router.post("/api/v1/initTravel/:id_travel", checkRoleAuth([2]), init_travel);

module.exports = router;
